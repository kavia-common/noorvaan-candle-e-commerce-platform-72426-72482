import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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

export function renderWithProviders(ui, { route = '/', initialEntries = [route] } = {}) {
  // Wrap with Content and Cart and MemoryRouter and mocked Elements to ensure Stripe hooks have context.
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
  return render(ui, { wrapper: Wrapper });
}
