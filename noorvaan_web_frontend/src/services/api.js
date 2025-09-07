/**
 * Simulated API service. Replace implementations with real REST calls to backend
 * connected to 'products_database'. All functions return Promises for easy swap.
 *
 * Integration notes:
 * - GET /api/products
 * - GET /api/products/:id
 * - POST /api/checkout/create-payment-intent
 */
const MOCK_PRODUCTS = [
  {
    id: 'vanilla-amber',
    name: 'Vanilla Amber',
    price: 28,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    description: 'Warm vanilla blended with resinous amber. Cozy and sophisticated.',
    notes: ['Vanilla', 'Amber', 'Sandalwood'],
    size: '8 oz • ~40 hr burn',
  },
  {
    id: 'cedar-citrus',
    name: 'Cedar Citrus',
    price: 26,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    description: 'Crisp citrus layered over grounded cedarwood for balance.',
    notes: ['Cedar', 'Grapefruit', 'Bergamot'],
    size: '8 oz • ~40 hr burn',
  },
  {
    id: 'lavender-sage',
    name: 'Lavender Sage',
    price: 24,
    image: 'https://images.unsplash.com/photo-1485163819542-13adeb5e0067?q=80&w=1200&auto=format&fit=crop',
    description: 'Herbal calm: classic lavender with fresh clary sage.',
    notes: ['Lavender', 'Sage', 'Eucalyptus'],
    size: '8 oz • ~40 hr burn',
  },
];

export const api = {
  // PUBLIC_INTERFACE
  listProducts: async () => {
    /** Returns array of products. Replace with fetch('/api/products'). */
    await delay(200);
    return MOCK_PRODUCTS;
  },

  // PUBLIC_INTERFACE
  getProduct: async (id) => {
    /** Returns product by id. Replace with fetch(`/api/products/${id}`). */
    await delay(150);
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    if (!found) throw new Error('Product not found');
    return found;
  },

  // PUBLIC_INTERFACE
  createPaymentIntent: async ({ amount, currency = 'usd' }) => {
    /**
     * Simulated Stripe PaymentIntent creation.
     * Replace with POST /api/checkout/create-payment-intent
     * Return shape: { clientSecret: string }
     */
    await delay(250);
    // Simulated client secret token
    return { clientSecret: `simulated_secret_${Math.round(amount * 100)}_${currency}` };
  }
};

function delay(ms) { return new Promise(res => setTimeout(res, ms)); }
