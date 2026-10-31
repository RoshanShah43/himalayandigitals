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
  account_type text not null default 'email' check (account_type in ('uid', 'email', 'url')),
  needs_server boolean not null default false,
  pricing_mode text not null default 'fixed',
  min_quantity integer not null default 1,
  max_quantity integer not null default 2147483647,
  packages jsonb not null default '[]'::jsonb check (jsonb_typeof(packages) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products
  add column if not exists pricing_mode text not null default 'fixed',
  add column if not exists min_quantity integer not null default 1,
  add column if not exists max_quantity integer not null default 2147483647;
alter table public.products drop constraint if exists products_pricing_mode_check;
alter table public.products add constraint products_pricing_mode_check
  check (pricing_mode in ('fixed', 'per_1000'));
alter table public.products drop constraint if exists products_account_type_check;
alter table public.products add constraint products_account_type_check
  check (account_type in ('uid', 'email', 'url'));
alter table public.products drop constraint if exists products_quantity_range_check;
alter table public.products add constraint products_quantity_range_check
  check (min_quantity > 0 and max_quantity >= min_quantity);
update public.products
set min_quantity = greatest(min_quantity, 1000),
    max_quantity = greatest(max_quantity, 1000)
where pricing_mode = 'per_1000'
  and (min_quantity < 1000 or max_quantity < 1000);
alter table public.products drop constraint if exists products_per_1000_minimum_check;
alter table public.products add constraint products_per_1000_minimum_check
  check (pricing_mode <> 'per_1000' or min_quantity >= 1000);
update public.products set account_type = 'url' where pricing_mode = 'per_1000' and account_type <> 'url';

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

alter table public.orders
  add column if not exists coupon_code text not null default '',
  add column if not exists discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  add column if not exists checkout_id uuid,
  add column if not exists target_url text not null default '';

create table if not exists public.coupons (
  id text primary key,
  code text not null unique check (code = upper(btrim(code))),
  percent_off numeric(5,2) not null check (percent_off > 0 and percent_off <= 100),
  starts_at timestamptz not null,
  expires_at timestamptz not null,
  max_uses integer not null check (max_uses > 0),
  usage_count integer not null default 0 check (usage_count >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (expires_at > starts_at)
);

create table if not exists public.site_settings (
  id text primary key check (id = 'storefront'),
  settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object'),
  updated_at timestamptz not null default now()
);

create table if not exists public.coupon_redemptions (
  coupon_id text not null references public.coupons(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  checkout_id uuid not null,
  transaction_id bigint not null,
  created_at timestamptz not null default now(),
  primary key (coupon_id, user_id)
);

alter table public.coupon_redemptions
  add column if not exists transaction_id bigint;
update public.coupon_redemptions set transaction_id = 0 where transaction_id is null;
alter table public.coupon_redemptions alter column transaction_id set not null;

create or replace function public.protect_coupon_usage_count()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_user in ('anon', 'authenticated') then
    if tg_op = 'INSERT' and new.usage_count <> 0 then
      raise exception 'Coupon usage count is managed by the database';
    end if;
    if tg_op = 'UPDATE' and new.usage_count <> old.usage_count then
      raise exception 'Coupon usage count is managed by the database';
    end if;
  end if;

  if tg_op = 'UPDATE' and new.max_uses < old.usage_count then
    raise exception 'Maximum uses cannot be lower than the current usage count';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_coupon_usage_count_before_write on public.coupons;
create trigger protect_coupon_usage_count_before_write
  before insert or update on public.coupons
  for each row execute procedure public.protect_coupon_usage_count();

create index if not exists products_category_idx on public.products(category_id, subcategory_id);
create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);
create index if not exists orders_coupon_checkout_idx on public.orders(coupon_code, checkout_id);
create unique index if not exists coupon_redemptions_checkout_user_idx
  on public.coupon_redemptions(user_id, checkout_id);

create or replace function public.validate_order_item()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  product public.products%rowtype;
  coupon public.coupons%rowtype;
  redemption public.coupon_redemptions%rowtype;
  package_price numeric;
  expected_discount numeric;
  order_subtotal numeric;
  selected_package jsonb;
begin
  select * into product
  from public.products
  where id = new.product_id and status = 'active'
  for update;

  if not found then
    raise exception 'Product is unavailable';
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

  if product.account_type = 'url' then
    new.target_url := btrim(coalesce(new.target_url, ''));
    if new.target_url !~* '^https?://[^/[:space:]]+([/?#].*)?$' then
      raise exception 'A valid target link starting with http:// or https:// is required';
    end if;
  end if;

  if product.pricing_mode = 'per_1000' then
    if new.quantity < greatest(product.min_quantity, 1000) or new.quantity > product.max_quantity then
      raise exception 'Quantity must be between % and %', greatest(product.min_quantity, 1000), product.max_quantity;
    end if;
    order_subtotal := round(package_price * new.quantity / 1000, 2);
  else
    if product.stock < new.quantity then
      raise exception 'Insufficient product stock';
    end if;
    order_subtotal := round(package_price * new.quantity, 2);
  end if;

  new.coupon_code := upper(btrim(coalesce(new.coupon_code, '')));
  if new.coupon_code <> '' then
    if new.checkout_id is null then
      raise exception 'A checkout ID is required when using a coupon';
    end if;

    select * into coupon
    from public.coupons
    where code = new.coupon_code
    for update;

    if not found or not coupon.is_active
      or now() < coupon.starts_at or now() >= coupon.expires_at then
      raise exception 'This coupon is not currently valid';
    end if;

    select * into redemption
    from public.coupon_redemptions
    where coupon_id = coupon.id and user_id = new.user_id
    for update;

    if found then
      if redemption.checkout_id <> new.checkout_id or redemption.transaction_id <> txid_current() then
        raise exception 'This coupon has already been used by your account';
      end if;
    else
      if coupon.usage_count >= coupon.max_uses then
        raise exception 'This coupon has reached its redemption limit';
      end if;
      if exists (
        select 1 from public.coupon_redemptions
        where user_id = new.user_id and checkout_id = new.checkout_id
      ) then
        raise exception 'Only one coupon can be applied per checkout';
      end if;
      insert into public.coupon_redemptions (coupon_id, user_id, checkout_id, transaction_id)
      values (coupon.id, new.user_id, new.checkout_id, txid_current());
      update public.coupons set usage_count = usage_count + 1 where id = coupon.id;
    end if;

    expected_discount := round(order_subtotal * coupon.percent_off / 100, 2);
    if round(coalesce(new.discount_amount, 0), 2) <> expected_discount then
      raise exception 'Coupon discount changed; apply the coupon again';
    end if;
    new.discount_amount := expected_discount;
  else
    if round(coalesce(new.discount_amount, 0), 2) <> 0 then
      raise exception 'A discount requires a valid coupon';
    end if;
    new.discount_amount := 0;
  end if;

  new.game_title := product.name;
  new.total := round(order_subtotal - new.discount_amount, 2);
  if product.pricing_mode <> 'per_1000' then
    update public.products set stock = stock - new.quantity where id = product.id;
  end if;
  return new;
end;
$$;

create or replace function public.check_coupon(p_code text)
returns numeric
language plpgsql
security definer
set search_path = public
as $$
declare
  coupon public.coupons%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Sign in to use a coupon';
  end if;

  select * into coupon
  from public.coupons
  where code = upper(btrim(coalesce(p_code, '')))
    and is_active
  limit 1;

  if not found or now() < coupon.starts_at or now() >= coupon.expires_at then
    raise exception 'This coupon is not currently valid';
  end if;
  if coupon.usage_count >= coupon.max_uses then
    raise exception 'This coupon has reached its redemption limit';
  end if;
  if exists (
    select 1 from public.coupon_redemptions
    where coupon_id = coupon.id and user_id = auth.uid()
  ) then
    raise exception 'This coupon has already been used by your account';
  end if;

  return coupon.percent_off;
end;
$$;

revoke all on function public.check_coupon(text) from public, anon;
grant execute on function public.check_coupon(text) to authenticated;

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
  if not exists (
    select 1 from public.products where id = old.product_id and pricing_mode <> 'per_1000'
  ) then
    return new;
  end if;

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
  if old.status <> 'Cancelled' and exists (
    select 1 from public.products where id = old.product_id and pricing_mode <> 'per_1000'
  ) then
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
alter table public.coupons enable row level security;
alter table public.coupon_redemptions enable row level security;
alter table public.site_settings enable row level security;

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

drop policy if exists "Customers read available coupons" on public.coupons;
create policy "Customers read available coupons" on public.coupons for select
  using (
    (is_active and starts_at <= now() and expires_at > now() and usage_count < max_uses)
    or public.current_user_is_admin()
  );
drop policy if exists "Admins insert coupons" on public.coupons;
create policy "Admins insert coupons" on public.coupons for insert
  with check (public.current_user_is_admin());
drop policy if exists "Admins update coupons" on public.coupons;
create policy "Admins update coupons" on public.coupons for update
  using (public.current_user_is_admin()) with check (public.current_user_is_admin());
drop policy if exists "Admins delete coupons" on public.coupons;
create policy "Admins delete coupons" on public.coupons for delete
  using (public.current_user_is_admin());

drop policy if exists "Public read storefront settings" on public.site_settings;
create policy "Public read storefront settings" on public.site_settings for select
  using (true);
drop policy if exists "Admins insert storefront settings" on public.site_settings;
create policy "Admins insert storefront settings" on public.site_settings for insert
  with check (public.current_user_is_admin());
drop policy if exists "Admins update storefront settings" on public.site_settings;
create policy "Admins update storefront settings" on public.site_settings for update
  using (public.current_user_is_admin()) with check (public.current_user_is_admin());

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
grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;
grant select on public.coupons to authenticated;
grant insert, update, delete on public.coupons to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.orders to authenticated;
