# SMM-style product setup

Provider automation is not enabled. Add SMM services as regular products for manual fulfillment.

## Add a service

1. In **Admin Panel → Products**, add a product and choose its category.
2. Set **Pricing type** to **Price per 1,000 units**. The target field switches to **Target link (SMM)**.
3. Add a package option and enter its rate per 1,000 units (for example, Rs 50).
4. Set the maximum quantity. The minimum order is 1,000 units.
5. Activate the product when it is ready to appear in the storefront.

Customers enter the target video, profile, or page URL and choose a quantity. The storefront previews and charges `rate per 1,000 × quantity ÷ 1,000`; for example, 1,500 units at Rs 50 per 1,000 costs Rs 75. The target URL is saved with the order and shown in the customer's profile and the admin order list.

## Database setup

Run [`supabase-schema.sql`](./supabase-schema.sql) in the Supabase SQL editor. It includes the product pricing mode, minimum quantity, target-link account type, and order target URL fields.

The separate [`smm_schema.sql`](./smm_schema.sql) and provider API configuration are only for a future provider-managed integration. They are not required for regular SMM-style products and do not enable automatic fulfillment.
