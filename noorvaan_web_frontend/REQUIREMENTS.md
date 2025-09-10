# Noorvaan Luxury E‑Commerce Website — Comprehensive Requirements & Design Specification

Version: 1.0  
Owner: NoorvaanWebFrontend  
Scope: Frontend (React) with JSON-driven content models and integrations (Stripe, Mailchimp).  
Audience: Engineers, Designers, QA, Content Editors, and PMs.

This document consolidates the refined product, UX, design, accessibility, performance, and technical requirements for Noorvaan’s luxury candle storefront. It supersedes ad-hoc notes and should be used as the single source of truth for future work.

---------------------------------------------------------------------

1) Brand & Visual Principles
- Brand Essence: “Noorvaan” — carrier of light. Tone is refined, serene, minimal, with emphasis on craft, heritage, and Indian scent stories.
- Visual Language:
  - Color: Light background with high-contrast type. Accent draws from warm gold/amber hues (e.g., #FACD8A). Dark brand tone for announcement bar (e.g., #2C2C2C).
  - Typography: High-contrast, modern sans (system stack acceptable). Large headings, ample white space, generous line-height.
  - Components: Clean cards, rounded radii, hairline borders, subtle shadows. Avoid heavy UI frameworks; keep footprint small.
  - Imagery: Premium product/lifestyle photography with consistent aspect ratios. Mix blend mode or tonal overlays are fine but ensure contrast and accessibility.
- Interaction: Minimalist motion (hover, focus states). Maintain elegance; don’t distract from product storytelling.
- Dark/Auto Mode: Respect prefers-color-scheme with accessible contrast.

2) Information Architecture / Sections
- Global Navigation:
  - Desktop: Sticky header with mega-navigation for Shop and Explore. Links: Home, Shop, About, Collections, FAQ & Care, plus discovery links: Best Sellers, Limited, New, Collaborations (future).
  - Mobile: Drawer menu with same IA. Accessible open/close controls. Keep it keyboard- and screen-reader friendly.
- Promo/Announcement Bars:
  - Site-wide announcement bar for free shipping threshold, codes, or trust signals. Content is JSON-configurable and optionally schedulable in the future.

3) Page Requirements
A. Home
- Hero: Brand statement, CTA to Shop, Explore Collections. Large image on the right for desktop, stacked on mobile.
- Featured Grid: Curated products (JSON-driven).
- Brand/Craft Blocks: Short editorial cards highlighting Craft, Values, Origin.
- Journal Highlights: 2–3 educational/editorial teasers with CTA to contact/FAQ.
- Newsletter: Prominent sign-up module (integrate Mailchimp in future; footer form at minimum).

B. Shop (PLP)
- Grid: Responsive product cards with image, fragrance name, family/collection line, size tag, price, and optional badge and swatch.
- Filtering: Multi-select facets (families, sizes, collections, colors, price, badges) with:
  - Active chips, removable.
  - Clear all.
  - Facet counts per value.
  - Accessible labels and keyboard navigation.
- Sorting: Featured, Best Sellers, Price: Low→High, Price: High→Low, New.
- URL State: All filters/sort reflected in URL; loading a URL restores state.
- Empty State: Helpful messaging when no products match filters.

C. PDP (Product Detail Page)
- Media: Large primary image (carousel/zoom planned). Lifestyle variants optional.
- Summary: Badges, family, name, short description, size/price, Add to Cart.
- At‑a‑Glance: 2–4 attributes (e.g., Long‑lasting, Reusable glass, Clean wax).
- Burn Time Table: At least 5 rows (e.g., 4oz, 8oz, 14oz, 30oz, 86oz).
- Tabs/Sections:
  - Notes (Fragrance Pyramid top/heart/base), Room/Occasion story.
  - Vessel & Materials (reusable glass, cotton wick, clean soy wax).
  - Care & Safety (wick trim to 1/4", first burn memory pool, 3–4h limit).
  - FAQs: Link or inline where applicable.
- Related/Pairs With: 3–4 related items.
- Accessibility: Alt text, keyboardable tabs, proper roles/labels.

D. Collections (Editorial)
- Intro Hero: Title + intro copy.
- Editorial Blocks: Image + text cards for craft/story elements.
- Featured Products: Curated grid.
- Journal Cross‑links: List of educational entries (link to contact/FAQ for now).
- SEO: Headings structure, editable intros, future meta fields.

E. About
- Brand Story: Origin, materials, mission. 2–3 cards. Emphasize heritage and craft.

F. Journal (Lightweight for now)
- Rendered within collections as “Learn & Journal” teasers. Future: dedicated journal list/detail.

G. Contact / FAQ / Care
- Care Guidance: Wick trimming, first burn, safety reminders.
- FAQs: Expandable cards from JSON entries.
- Contact Form: Accessible name/email/message with clear success/error states. Future: spam prevention, routing to CRM.
- Accessibility & SEO friendly.

H. Footer / Contact
- Footer Navigation: Explore links, newsletter form, brand statement.
- Newsletter: Integrate Mailchimp later; for now, client confirmation.

I. Cart & Checkout
- Cart Drawer: slide‑in drawer with items (image, name, size, qty controls), remove, clear, subtotal, free shipping threshold messaging, proceed to checkout.
- Checkout Page:
  - Order Summary section.
  - Payment form via Stripe Elements.
  - Collect email; future steps for shipping/billing details.
  - Disabled Pay button when empty or invalid; clear feedback on errors.
  - On success: clear cart, confirmation (future: dedicated confirmation page + email) and redirect home.

4) Accessibility Requirements (WCAG 2.1 AA)
- Keyboard Navigation: All interactive elements reachable via tab, focus styles visible.
- ARIA & Semantics: Proper roles for dialogs/drawers, tabs, accordions, forms, tables.
- Color Contrast: Meet minimum contrast ratios for text and UI elements in light and dark modes.
- Labels: Inputs require visible and programmatic labels; describe dynamic values with aria-labels where appropriate (e.g., subtotals).
- Reduced Motion: Respect prefers-reduced-motion.
- Alt Text: All images have meaningful alt text; decorative images marked appropriately.
- Testing: Integrate axe/Lighthouse in CI (future), manual screen-reader checks.

5) Responsive Behavior
- Grid:
  - 4-up on desktop, 3-up on medium, 2-up on tablet, 1-up on small.
- Layout:
  - Hero two-column on desktop, stacked on mobile.
  - Sticky header, collapsible mobile drawer.
- Controls: Touch-friendly sizes; avoid hover-only interactions on mobile; ensure click targets ≥ 44px.

6) Content Style Guide
- Voice: Minimal, evocative, sensory; maintain trust via careful claims (clean, vegan, reusable).
- Titles & Headings: One H1 per page; logical hierarchy H2/H3…
- Microcopy: Short labels and helper text; error messages are clear/actionable.
- Internationalization: English initially; structure content to support later localization.

7) JSON Content Models (Editable by non-technical users)
A) Fragrance/Product (frontend model already used in src/data/fragrances.json)
- Fields:
  - slug (string, required, unique)
  - name (string, required)
  - family (string, required, e.g., Floral, Woody)
  - collection (string)
  - vessel_color (hex string) and vessel_color_name (string)
  - notes: { top: string[], heart: string[], base: string[] }
  - room_story (string)
  - at_a_glance (string[])
  - burn_time_by_size (object: { "4oz": number, ... })
  - images (string[])
  - badge (string) — e.g., “Best Seller”, “Limited”, “New”
  - size_display (string) — e.g., “Classic”, “Signature”, “3‑wick”, “4‑wick”
  - is_new (boolean), is_best_seller (boolean)
  - price (number)
- Expectations:
  - Used in PLP, PDP, Collections, Related/Pairs.
  - Keep image URLs optimized; strive for consistent ratios.

B) Facets (src/data/facets.json)
- families (string[])
- sizes (string[])
- collections (string[])
- colors (string[])
- price_ranges (string[]; recommended tags: "<$40", "$40–$80", "$80–$150", "$150+")
- badges (string[]; e.g., "Best Seller","Limited","New")
- Expectations:
  - Drives filter groups in PLP.
  - Counts computed dynamically client-side for now.

C) FAQs (src/data/faqs.json)
- Array of { q: string, a: string, category?: string }
- Shown on Contact/FAQ page and optionally in PDP tabs.

D) Collections (src/data/collections.json)
- Fields:
  - slug (string)
  - title (string)
  - intro (string)
  - blocks: [{ title, text, image }]
  - products: [productSlug,...] — curated ordering
  - posts: [{ title, snippet, href }]
  - Future: SEO fields (meta_title, meta_description), hero image, structured data hints.

E) Site/Announcement (src/data/site.json)
- announcement: { enabled: boolean, threshold: number, code?: string, message?: string }
- Future: scheduling windows, targeting, dismissible state, analytics.

Document and Validation
- Provide examples in each JSON; keep schemas consistent.
- Future: JSON Schema and validation tooling in CI.
- Preview Mode: Future toggle to view changes before publish.

8) SEO & Content Discoverability
- Semantics: Correct heading structure; landmark elements (header, nav, main, footer).
- Metadata: Future integration to handle per-route meta title/description and Open Graph tags.
- Structured Data: Future schema.org for Products, Breadcrumbs, FAQs, Articles.
- URLs: Human-readable slugs; PLP filter state in querystring parameters.
- Performance: Optimize images (sizes/srcset/lazy); avoid blocking resources.

9) Performance Guidelines
- Bundle: Keep dependencies minimal; avoid large UI libraries.
- Code-splitting: Lazy-load routes (future).
- Images: Use optimized sources, leverage browser lazy-loading and dimensions to avoid layout shift.
- Caching: Browser caching for static assets; memoize computed lists (filters/sorts).
- Lighthouse Targets (aspirational):
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 90
  - SEO ≥ 90

10) Technical Specifications
- Stack: React 18 + react-router-dom 6 + react-scripts. Stripe Elements for payments. Jest + RTL for tests.
- State:
  - ContentContext provides JSON-driven data (fragrances, facets, faqs, collections, site).
  - CartContext persists to localStorage; subtotal and operations exposed via hook.
- URL State:
  - PLP filter/sort state syncs to URL via querystring (repeated and comma-separated forms).
  - Loading a URL rehydrates filters and sorting.
- Accessibility Patterns:
  - Buttons have aria-label when text is ambiguous.
  - Inputs have associated labels (e.g., Qty).
  - Drawer and tabs pattern follow keyboard navigation norms.
- Payments:
  - Client-only demonstration using Stripe Elements; production requires backend to create PaymentIntent and pass clientSecret.
  - ENV: REACT_APP_REACT_APP_STRIPE_PUBLISHABLE_KEY required.
- Newsletter:
  - Footer form exists; plan Mailchimp integration with double opt‑in and GDPR consent.
- Analytics:
  - Future: Track banner impressions/clicks, filter usage, PDP interactions, checkout conversion and drop-offs.
- Security & Compliance:
  - Never store card details in frontend; rely on Stripe.
  - Handle env vars securely; no secrets committed.
  - GDPR: respect consent and provide clear privacy copy (future).
- DevOps (future-focused, out of frontend scope but relevant for integration):
  - Containerization, CI/CD, secrets management, monitoring, and alerting.
  - Automated accessibility tests (axe), Lighthouse in CI.

11) Accessibility QA Checklist
- [ ] Keyboard-only navigation verifies all pages/features (menu, filters, tabs, cart drawer, checkout).
- [ ] Color contrast validated in light/dark.
- [ ] Forms have proper labels, error states announced.
- [ ] Images have alt; decorative images are ignored by AT.
- [ ] Focus management when opening/closing drawers and dialogs.
- [ ] Tables (burn time) have caption/aria-label and proper headers.
- [ ] Announcement/promo bar is perceivable and non-intrusive.

12) Testing Expectations
- Unit/Integration Tests:
  - Navigation/header: promo bar visibility, menu/drawer links.
  - PLP: filtering, sorting, counts, URL sync, chips, clear-all.
  - PDP: at-a-glance, burn time table (≥5 rows), notes/room story tabs, add-to-cart behavior.
  - Cart Drawer: qty update, remove/clear, subtotal and threshold messages, checkout link.
  - Checkout: Stripe Elements mocked, disabled/enabled Pay, success flow clears cart and navigates home.
- Tooling: React Testing Library with mocked Stripe.

13) Roadmap / Future Extensions
- Search with auto-suggestions and fuzzy matching.
- Journal system with categories, SEO fields, and structured data.
- Promo bar scheduling/targeting and analytics tracking.
- Per-route SEO meta manager and structured data components.
- Backend integration for products, cart persistence, orders, newsletters, contact routing.
- Theme switcher UI (dark/light/auto) persisted per user preference.
- Internationalization (content and currency).

---------------------------------------------------------------------

Appendix A — Querystring Conventions (PLP)
- families → family
- sizes → size
- collections → collection
- colors → color
- price_ranges → price
- badges → badge
- Multiple selection by repeated keys or comma-separated values is supported.

Appendix B — Size Taxonomy
- Classic, Signature, 3‑wick, 4‑wick. Display consistently on cards and PDP.

Appendix C — Trust Signals & Microcopy
- “Clean • Vegan • Low‑Soot”
- “Reusable glass”
- “Trim wick to 1/4" before every burn”
- “First burn: let wax reach glass edge to avoid tunneling”

Appendix D — Environment Variables (Frontend)
- REACT_APP_REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
  - Obtain from Stripe dashboard.
  - Do not commit real keys. Provide .env.example and local .env usage guidance.

---------------------------------------------------------------------

Change Log
- v1.0: Initial comprehensive specification aligned with current implementation and future integrations (Stripe, Mailchimp, SEO, accessibility, analytics).
