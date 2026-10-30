# Supabase setup

The site uses Supabase Auth and the browser client. The URL below is the base project URL; do not include `/rest/v1`.

## 1. Add the publishable key

Open `supabase-config.js` and replace `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with the project's **publishable** key (or legacy `anon` key) from Supabase Settings → API Keys.

That key is intended for browser use. Never put a `service_role` key, database password, or other secret in this file.

## 2. Create the tables and security policies

Open the Supabase SQL Editor and run [`supabase-schema.sql`](./supabase-schema.sql). It creates the profile, category, product, and order tables, the signup profile trigger, and row-level security policies. Do not disable RLS.

## 3. Configure Auth

In Authentication → URL Configuration, set the site URL to your deployed site and add the local development URL to the redirect allow list if needed. Enable email/password sign-in. If email confirmation is on, customers must confirm before logging in.

## 4. Create the first admin

Sign up from `login.html` with the account that should manage the site. After confirming the email if required, run this statement in the SQL Editor, replacing the address with that account's email:

```sql
update public.profiles
set is_admin = true
where lower(email) = lower('you@example.com');
```

Only an existing admin can grant or remove admin roles through the admin page. The admin page checks the profile role from Supabase; it does not trust browser storage.

## 5. Add catalog data

Sign in as the admin and open `admin.html`. Add parent categories (for example Games, Subscriptions, and Level Up), optional subcategories, and products. Product packages are JSON arrays such as:

```json
[{"id":"ff25","label":"25 Diamonds","value":35},{"id":"ff50","label":"50 Diamonds","value":65}]
```

Each package needs a unique `id`, a customer-facing `label`, and a numeric `value`. The one-click import of the current storefront catalog starts products with a high placeholder stock value; review and set accurate stock levels in the Products tab before taking orders. A successful order reserves stock, and cancelling an order restores it. Public pages show active products and categories only.

In the product form, choose whether checkout should collect an email address or a game UID. Enable the server-ID option for products that need one. The entered account value and optional server ID are saved with the order and shown in customer/admin order history.

Customer orders require a Supabase account. RLS restricts customers to their own orders, and the database checks the selected product/package price and stock when an order is submitted. Checkout currently records the selected manual payment method and reference code; it does not process a payment.

## Local development

Serve this folder over HTTP (for example, `python app.py`) and open `http://127.0.0.1:5000`. Supabase Auth redirects must allow the local origin. `file://` URLs are not supported.
