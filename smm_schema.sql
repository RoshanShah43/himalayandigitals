create extension if not exists pgcrypto;

create table if not exists public.smm_services (
    id uuid primary key default gen_random_uuid(),
    platform text not null,
    subcategory text not null,
    name text not null,
    description text not null default '',
    image text not null default '',
    delivery text not null default 'Varies',
    min_quantity integer not null check (min_quantity > 0),
    max_quantity integer not null check (max_quantity >= min_quantity),
    packages jsonb not null check (jsonb_typeof(packages) = 'array' and jsonb_array_length(packages) > 0),
    status text not null default 'inactive' check (status in ('active', 'inactive')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.smm_orders (
    id uuid primary key default gen_random_uuid(),
    user_id text not null,
    username text not null,
    service_id uuid not null references public.smm_services(id),
    service_name text not null,
    platform text not null,
    subcategory text not null,
    package_id text not null,
    package_label text not null,
    package_description text not null default '',
    refill_days integer not null default 0 check (refill_days >= 0),
    provider_service_id text not null,
    target_url text not null,
    quantity integer not null check (quantity > 0),
    price_per_1000 numeric(12, 2) not null check (price_per_1000 > 0),
    total numeric(12, 2) not null check (total >= 0),
    payment_code text not null default '',
    status text not null default 'Pending payment',
    provider_order_id text,
    provider_refill_id text,
    start_count text,
    remains text,
    refill_status text,
    refill_requested_at timestamptz,
    completed_at timestamptz,
    last_checked_at timestamptz,
    created_at timestamptz not null default now()
);

create index if not exists smm_orders_user_created_idx
    on public.smm_orders (user_id, created_at desc);
create index if not exists smm_orders_status_idx
    on public.smm_orders (status, created_at desc);

alter table public.smm_services enable row level security;
alter table public.smm_orders enable row level security;

revoke all on public.smm_services from anon, authenticated;
revoke all on public.smm_orders from anon, authenticated;
grant all on public.smm_services to service_role;
grant all on public.smm_orders to service_role;
