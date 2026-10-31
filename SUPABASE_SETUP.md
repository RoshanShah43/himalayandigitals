# Supabase setup

The site uses Supabase Auth and the browser client. The URL below is the base project URL; do not include `/rest/v1`.

## 1. Add the publishable key

Open `supabase-config.js` and replace `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with the project's **publishable** key (or legacy `anon` key) from Supabase Settings → API Keys.

That key is intended for browser use. Never put a `service_role` key, database password, or other secret in this file.

## 2. Create the tables and security policies

Open the Supabase SQL Editor and run [`supabase-schema.sql`](./supabase-schema.sql). It creates the profile, category, product, order, coupon, and storefront-settings tables, the signup profile trigger, and row-level security policies. If the project already has the earlier schema, run the updated file again to add coupon support, per-1,000 pricing, the 1,000-unit minimum, target-link products, and the order target URL field. Do not disable RLS.

## 3. Configure Auth

In Authentication → URL Configuration, set the site URL to your deployed site and add the local development URL to the redirect allow list if needed. Enable email/password sign-in.

To let email/password customers log in without confirming by email, open Authentication → Providers → Email and turn off **Confirm email**. This is a Supabase project setting; the website code cannot change it. Disabling it allows accounts to sign in without proving control of the email address. Google sign-in uses Google's authenticated account and does not require this email-confirmation step.

To enable the **Continue with Google** button, configure the Google provider under Authentication → Providers → Google with your Google OAuth client ID and secret. In Google Cloud, add the Supabase project's callback URL shown in the provider settings as an authorized redirect URI. Keep the website URL in Supabase's redirect allow list; the button returns users to `login.html`, then sends admins to `admin.html` and other users to `index.html`.

## 4. Create the first admin

Sign up from `login.html` with the account that should manage the site. If email confirmation is enabled, confirm the email first. Then run this statement in the SQL Editor, replacing the address with that account's email:

```sql
update public.profiles
set is_admin = true
where lower(email) = lower('you@example.com');
```

Only an existing admin can grant or remove admin roles through the admin page. The admin page checks the profile role from Supabase; it does not trust browser storage.

## 5. Add catalog data

Sign in as the admin and open `admin.html`. Add parent categories (for example Games, Subscriptions, and Level Up), optional subcategories, and products. Product purchase options are added in the product form as a customer-facing label and numeric price (for example, `25 Diamonds` at Rs 35). The one-click import of the current storefront catalog starts products with a high placeholder stock value; review and set accurate stock levels in the Products tab before taking orders. A successful order reserves stock, and cancelling an order restores it. Public pages show active products and categories only.

In the product form, choose whether checkout should collect an email address, a game UID, or a target link. Enable the server-ID option for products that need one. Product options have a label and price. For SMM-style services, choose **Price per 1,000 units**; the admin form defaults to a target link and a minimum quantity of 1,000. Enter each option's rate (for example, Rs 50 per 1,000) and maximum quantity. The storefront accepts a video, profile, or page URL, then calculates `rate per 1,000 × quantity ÷ 1,000` and previews the total before adding the service to the cart. Orders and the customer's profile keep the target link. Existing products remain fixed-price unless you change their pricing type.

In the Coupons tab, create a percentage-off code, set when it starts and expires, and choose the maximum number of customers who can redeem it. Each customer can use a coupon once, and only one coupon can be applied per checkout. Customers apply the code at checkout; the database validates the date, usage limit, one-use rule, and discount when the order is submitted. Coupon uses are counted when an order is placed, including orders that are later cancelled.

In **Admin Panel → Settings**, save the website status, operating hours, and contact details. These settings are stored in Supabase and displayed on the homepage for all visitors.

Customer orders require a Supabase account. RLS restricts customers to their own orders, and the database checks the selected product/package price, stock or per-thousand quantity range, and coupon discount when an order is submitted. Checkout currently records the selected manual payment method and reference code; it does not process a payment.

## Local development

Serve this folder over HTTP (for example, `python app.py`) and open `http://127.0.0.1:5000`. Supabase Auth redirects must allow the local origin. `file://` URLs are not supported.
