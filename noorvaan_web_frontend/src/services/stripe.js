import { loadStripe } from '@stripe/stripe-js';

/**
 * Retrieves Stripe instance using publishable key from env.
 * ENV var (request from user to set): REACT_APP_STRIPE_PUBLISHABLE_KEY
 * For local demo, we still render the card UI but use simulated clientSecret.
 */
let stripePromise;
export function getStripe() {
  if (!stripePromise) {
    const key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
    stripePromise = loadStripe(key || 'pk_test_12345_placeholder'); // Placeholder for demo UI
  }
  return stripePromise;
}
