# Noorvaan Web Frontend — Integration Notes

This React application is structured to be easily connected to a backend providing product data and Stripe PaymentIntent creation.

## Where to connect your backend

- Product listing and detail:
  - src/services/api.js
    - api.listProducts()  -> Replace with GET /api/products
    - api.getProduct(id)  -> Replace with GET /api/products/:id

- Stripe PaymentIntent:
  - src/services/api.js
    - api.createPaymentIntent({ amount, currency })
      Replace with POST /api/checkout/create-payment-intent
      Returns: { clientSecret }

- Stripe publishable key:
  - src/services/stripe.js uses REACT_APP_STRIPE_PUBLISHABLE_KEY.
  - Add this key to your .env for deployment.

## Environment

Create a .env file (do not commit secrets) with:

REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

## State and UI

- Cart state:
  - src/context/CartContext.js
  - Persists to localStorage under "nv_cart"

- Theme:
  - src/context/ThemeContext.js
  - Modes: auto | light | dark (auto uses prefers-color-scheme)

## Routes

- /            Home
- /catalog     Product grid
- /product/:id Product detail
- /cart        Cart
- /checkout    Checkout (Stripe Elements)
- /about       Storytelling
- /contact     Contact & newsletter

## Design

- Minimalist and responsive
- Brand colors:
  - Primary:  #FFFFFF
  - Secondary:#2C2C2C
  - Accent:   #FACD8A

Main styles in src/App.css using CSS variables for theming.
