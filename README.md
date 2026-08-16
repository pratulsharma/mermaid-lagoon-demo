# Mermaidalay Website — Brand & Founder Update

This Next.js demo includes:

- Animated 3-second Mermaidalay splash screen with bubbles, light rays and a skip button
- New uploaded Mermaidalay wordmark in the navigation and footer
- New uploaded mermaid emblem in the splash screen and founder-vision section
- Pink and turquoise section-heading system
- Founder section featuring Josiane Cholette's supplied story and long-term water-park vision
- Ocean-themed responsive homepage
- Package estimator, demo reels, gallery and electronic waiver demo

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy publicly on Vercel

```bash
npm install -g vercel
vercel --prod
```

The electronic signature, booking request and pricing calculator are front-end demonstrations. Before accepting live bookings, connect them to secure authentication, database storage, payment processing, email delivery, timestamps and an audit log.

## Stripe test payments

To enable the booking modal's Stripe test-mode payment step, add these environment variables to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Use Stripe's test card `4242 4242 4242 4242` in the payment step.

## Stripe webhooks

Add a webhook endpoint in Stripe pointing to your app's `/api/stripe-webhook` route. For local testing, forward events with the Stripe CLI and use the webhook signing secret in `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_...
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

In the Stripe Dashboard, listen for `payment_intent.succeeded` and `payment_intent.payment_failed`. The webhook updates the matching Firebase booking when Stripe confirms the payment.
