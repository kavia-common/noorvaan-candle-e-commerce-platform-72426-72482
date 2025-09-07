import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, within } from '@testing-library/react';
import { CartProvider } from '../providers/CartContext';
import { ContentProvider } from '../providers/ContentContext';
import { Elements } from '@stripe/react-stripe-js';

// Mock stripe elements provider wrappers for tests that import index.js indirectly
jest.mock('@stripe/react-stripe-js', () => {
  // Intentionally do not spread actual; we want a fully mocked module for tests.
  return {
    Elements: ({ children }) => <>{children}</>,
    CardElement: (props) => <input data-testid="mock-card-element" {...props} />,
    useStripe: () => ({ confirmCardPayment: jest.fn() }),
    useElements: () => ({ getElement: jest.fn() }),
  };
});

// PUBLIC_INTERFACE
export function renderWithProviders(ui, { route = '/', initialEntries = [route] } = {}) {
  /** Render a UI wrapped with ContentProvider, CartProvider, MemoryRouter, and mocked Stripe Elements.
   * Returns RTL render result. Prefer using within(result.container) in tests to scope queries.
   */
  const Wrapper = ({ children }) => (
    <Elements>
      <ContentProvider>
        <CartProvider>
          <MemoryRouter initialEntries={initialEntries}>
            {children}
          </MemoryRouter>
        </CartProvider>
      </ContentProvider>
    </Elements>
  );
  const result = render(ui, { wrapper: Wrapper });
  return result;
}

// PUBLIC_INTERFACE
export function withinContainer(container) {
  /** Convenience helper to get a scoped query API for a specific container element. */
  return within(container);
}
