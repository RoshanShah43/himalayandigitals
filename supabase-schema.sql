create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  email text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);
create unique index if not exists profiles_username_lower_idx on public.profiles (lower(username));

create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text not null,
  image text not null default '',
  description text not null default '',
  parent_id text references public.categories(id) on delete restrict,
  status text not null default 'active' check (status in ('active', 'inactive')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null default '',
  price numeric(12,2) not null default 0 check (price >= 0),
  discount_price numeric(12,2) check (discount_price is null or discount_price >= 0),
  brand text not null default '',
  stock integer not null default 0 check (stock >= 0),
  sku text not null default '',
  image text not null default '',
  category_id text not null references public.categories(id) on delete restrict,
  subcategory_id text not null default '',
  status text not null default 'active' check (status in ('active', 'inactive')),
  featured boolean not null default false,
  delivery text not null default '1-5 min',
  account_type text not null default 'email' check (account_type in ('uid', 'email')),
  needs_server boolean not null default false,
  packages jsonb not null default '[]'::jsonb check (jsonb_typeof(packages) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null references public.products(id) on delete restrict,
  package_id text not null,
  game_title text not null,
  pack_label text not null,
  uid text not null default '',
  server_id text not null default '',
  quantity integer not null default 1 check (quantity > 0),
  price numeric(12,2) not null check (price >= 0),
  total numeric(12,2) not null check (total >= 0),
  payment_method text not null check (payment_method in ('esewa', 'khalti', 'bank')),
  payment_code text not null,
  status text not null default 'Pending' check (status in ('Pending', 'Completed', 'Cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products(category_id, subcategory_id);
create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);

create or replace function public.validate_order_item()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  product public.products%rowtype;
  package_price numeric;
  selected_package jsonb;
begin
  select * into product
  from public.products
  where id = new.product_id and status = 'active'
  for update;

  if not found then
    raise exception 'Product is unavailable';
  end if;
  if product.stock < new.quantity then
    raise exception 'Insufficient product stock';
  end if;

  if jsonb_array_length(product.packages) = 0 and new.package_id = 'default' then
    package_price := coalesce(product.discount_price, product.price);
    new.pack_label := '1 item';
  else
    select item into selected_package
    from jsonb_array_elements(product.packages) as packages(item)
    where item ->> 'id' = new.package_id
    limit 1;
    if selected_package is not null then
      package_price := (selected_package ->> 'value')::numeric;
      new.pack_label := selected_package ->> 'label';
    end if;
  end if;

  if package_price is null or round(new.price, 2) <> round(package_price, 2) then
    raise exception 'Selected package or price is invalid';
  end if;

  new.game_title := product.name;
  new.total := round(package_price * new.quantity, 2);
  update public.products set stock = stock - new.quantity where id = product.id;
  return new;
end;
$$;

drop trigger if exists validate_order_item_before_insert on public.orders;
create trigger validate_order_item_before_insert
  before insert on public.orders
  for each row execute procedure public.validate_order_item();

create or replace function public.release_cancelled_order_stock()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status <> 'Cancelled' and new.status = 'Cancelled' then
    update public.products set stock = stock + old.quantity where id = old.product_id;
  elsif old.status = 'Cancelled' and new.status <> 'Cancelled' then
    update public.products
    set stock = stock - old.quantity
    where id = old.product_id and stock >= old.quantity;
    if not found then
      raise exception 'Insufficient product stock to reopen this order';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists release_cancelled_order_stock_before_update on public.orders;
create trigger release_cancelled_order_stock_before_update
  before update of status on public.orders
  for each row execute procedure public.release_cancelled_order_stock();

create or replace function public.release_deleted_order_stock()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status <> 'Cancelled' then
    update public.products set stock = stock + old.quantity where id = old.product_id;
  end if;
  return old;
end;
$$;

drop trigger if exists release_deleted_order_stock_before_delete on public.orders;
create trigger release_deleted_order_stock_before_delete
  before delete on public.orders
  for each row execute procedure public.release_deleted_order_stock();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, email)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'username', ''), split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.current_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles for select
  using (id = auth.uid() or public.current_user_is_admin());
drop policy if exists "Admins update profiles" on public.profiles;
create policy "Admins update profiles" on public.profiles for update
  using (public.current_user_is_admin()) with check (public.current_user_is_admin());

drop policy if exists "Public read active categories" on public.categories;
create policy "Public read active categories" on public.categories for select
  using (status = 'active' or public.current_user_is_admin());
drop policy if exists "Admins insert categories" on public.categories;
create policy "Admins insert categories" on public.categories for insert
  with check (public.current_user_is_admin());
drop policy if exists "Admins update categories" on public.categories;
create policy "Admins update categories" on public.categories for update
  using (public.current_user_is_admin()) with check (public.current_user_is_admin());
drop policy if exists "Admins delete categories" on public.categories;
create policy "Admins delete categories" on public.categories for delete
  using (public.current_user_is_admin());

drop policy if exists "Public read active products" on public.products;
create policy "Public read active products" on public.products for select
  using (status = 'active' or public.current_user_is_admin());
drop policy if exists "Admins insert products" on public.products;
create policy "Admins insert products" on public.products for insert
  with check (public.current_user_is_admin());
drop policy if exists "Admins update products" on public.products;
create policy "Admins update products" on public.products for update
  using (public.current_user_is_admin()) with check (public.current_user_is_admin());
drop policy if exists "Admins delete products" on public.products;
create policy "Admins delete products" on public.products for delete
  using (public.current_user_is_admin());

drop policy if exists "Customers read own orders" on public.orders;
create policy "Customers read own orders" on public.orders for select
  using (user_id = auth.uid() or public.current_user_is_admin());
drop policy if exists "Customers create own pending orders" on public.orders;
create policy "Customers create own pending orders" on public.orders for insert
  with check (user_id = auth.uid() and status = 'Pending');
drop policy if exists "Admins update orders" on public.orders;
create policy "Admins update orders" on public.orders for update
  using (public.current_user_is_admin()) with check (public.current_user_is_admin());
drop policy if exists "Admins delete orders" on public.orders;
create policy "Admins delete orders" on public.orders for delete
  using (public.current_user_is_admin());

grant select on public.categories, public.products to anon, authenticated;
grant insert, update, delete on public.categories, public.products to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.orders to authenticated;
