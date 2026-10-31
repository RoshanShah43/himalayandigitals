# SMM services setup

> SMM storefront and provider integrations are currently disabled. These steps require restoring a backend and are not active in the static-only deployment.

For simple SMM-style listings in the current storefront catalog, use **Admin Panel → Products → Pricing type → Price per 1,000 units**. This calculates customer pricing only; it does not submit orders to an SMM provider.

## Database

Run [`smm_schema.sql`](./smm_schema.sql) in the Supabase SQL editor. The Flask server uses the `smm_services` and `smm_orders` tables; the service-role Supabase key must remain server-side.

## Server environment

Configure these variables on the Flask host:

- `SUPABASE_URL`
- `SUPABASE_KEY` — use the server-side service-role key, never the public/anon key
- `FLASK_SECRET_KEY` — a long, random signing key for the secure login session cookie
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and optionally `ADMIN_EMAIL` — used only to create the initial admin account when `init_db()` is run; if the admin already exists, rotate/update its password through your normal account-management process
- `SMM_PROVIDER_API_URL` — the provider API v2 endpoint (defaults to the configured provider endpoint)
- `SMM_PROVIDER_API_KEY` — the rotated provider key; never put it in HTML, JavaScript, or browser storage
- `SESSION_COOKIE_SECURE` — defaults to `true`; set to `false` only for local HTTP development

The existing `users` table must contain the account records and `is_admin` flag used by the login API. Run `init_db()` once with the initial-admin variables set, or grant administrator access to the intended account in Supabase. Admin API routes verify the signed server session and the database-backed admin flag; the browser's `isAdmin` value is not authorization.

## Running locally

Start the Flask application with `python app.py` and open the site from the Flask server. A static server such as `python -m http.server` can serve the HTML files but cannot process `/api/login` or `/api/register`; those requests require the Flask backend and configured Supabase credentials. On Vercel, deploy with the included `vercel.json` so requests are routed to the Python API.

## Adding a service

In **Admin Panel → SMM Services**, select a platform and category (such as TikTok → Followers), add a service description, and configure one or more package options. Every package needs its provider service ID, price per 1,000, terms, and refill policy. Set the service's minimum and maximum quantity.

The storefront total is `price per 1,000 × quantity ÷ 1,000`. Package-specific details appear when the customer selects that package.

## Payment, delivery, and tracking

SMM orders are saved on the server as **Pending payment**. After verifying payment, an admin confirms it and explicitly submits the order to the provider. This avoids spending provider balance for an unverified payment. The customer profile and homepage then show the provider-reported status, remaining quantity, and last-check time. The provider API does not return a completion ETA, so the site does not show a fabricated countdown.

For refill-enabled packages, customers can request a refill from an eligible completed order. Requests await admin review; only an admin approval sends the refill request to the provider.
