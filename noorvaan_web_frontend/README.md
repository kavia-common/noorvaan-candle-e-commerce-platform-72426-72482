# Noorvaan Web Frontend

Modern, minimalist React storefront for Noorvaan candles:
- Sticky header, mega menu, mobile drawer, promo bar (JSON-configurable)
- PLP with multi-select facets, active chips, counts, sort, URL-sync
- PDP with premium storytelling, At‑a‑Glance icons, burn-time table, notes pyramid, room story, related
- Collections template with editorial blocks and products
- Cart drawer, order summary, and Stripe-powered checkout flow (Elements)
- Responsive, lightweight, no heavy UI framework

## Getting Started

1) Install dependencies
   npm install

2) Configure Stripe publishable key via env:
   cp .env.example .env
   # edit .env to set:
   # REACT_APP_REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...

3) Start
   npm start

Open http://localhost:3000

## Content Editing

- Announcement banner: src/data/site.json
- Facet configuration: src/data/facets.json
- Fragrances/products: src/data/fragrances.json
- Collections/editorial: src/data/collections.json
- FAQs/Care: src/data/faqs.json

Editing JSON updates the site without code changes.

## Notes

- Checkout demonstrates client-side Stripe Elements; integrate a backend to create PaymentIntents and pass clientSecret to confirm the payment in production.
