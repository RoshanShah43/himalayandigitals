# Supabase setup

The site uses Supabase Auth and the browser client. The URL below is the base project URL; do not include `/rest/v1`.

## 1. Add the publishable key

Open `supabase-config.js` and replace `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with the project's **publishable** key (or legacy `anon` key) from Supabase Settings → API Keys.

That key is intended for browser use. Never put a `service_role` key, database password, or other secret in this file.

## 2. Create the tables and security policies

Open the Supabase SQL Editor and run [`supabase-schema.sql`](./supabase-schema.sql). It creates the profile, category, product, order, and coupon tables, the signup profile trigger, and row-level security policies. If the project already has the earlier schema, run the updated file again to add coupon support and the order discount fields. Do not disable RLS.

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

Sign in as the admin and open `admin.html`. Add parent categories (for example Games, Subscriptions, and Level Up), optional subcategories, and products. Product purchase options are added in the product form as a customer-facing label and numeric price (for example, `25 Diamonds` at Rs 35). The one-click import of the current storefront catalog starts products with a high placeholder stock value; review and set accurate stock levels in the Products tab before taking orders. A successful order reserves stock, and cancelling an order restores it. Public pages show active products and categories only.

In the product form, choose whether checkout should collect an email address or a game UID. Enable the server-ID option for products that need one. Add purchase options with a label and price (for example, `1 Month` or `30 Diamonds`); the selected option is shown in checkout and saved with the order.

In the Coupons tab, create a percentage-off code, set when it starts and expires, and choose the maximum number of customers who can redeem it. Each customer can use a coupon once, and only one coupon can be applied per checkout. Customers apply the code at checkout; the database validates the date, usage limit, one-use rule, and discount when the order is submitted. Coupon uses are counted when an order is placed, including orders that are later cancelled.

Customer orders require a Supabase account. RLS restricts customers to their own orders, and the database checks the selected product/package price, stock, and coupon discount when an order is submitted. Checkout currently records the selected manual payment method and reference code; it does not process a payment.

## Local development

Serve this folder over HTTP (for example, `python app.py`) and open `http://127.0.0.1:5000`. Supabase Auth redirects must allow the local origin. `file://` URLs are not supported.
