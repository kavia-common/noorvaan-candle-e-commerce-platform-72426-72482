import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { CartProvider } from '../providers/CartContext';
import { ContentProvider } from '../providers/ContentContext';

// Mock stripe elements provider wrappers for tests that import index.js indirectly
jest.mock('@stripe/react-stripe-js', () => {
  const actual = jest.requireActual('@stripe/react-stripe-js');
  return {
    ...actual,
    Elements: ({ children }) => <>{children}</>,
    CardElement: (props) => <input data-testid="mock-card-element" {...props} />,
    useStripe: () => ({ confirmCardPayment: jest.fn() }),
    useElements: () => ({ getElement: jest.fn() }),
  };
});

export function renderWithProviders(ui, { route = '/', initialEntries = [route] } = {}) {
  // Wrap with Content and Cart and MemoryRouter
  const Wrapper = ({ children }) => (
    <ContentProvider>
      <CartProvider>
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      </CartProvider>
    </ContentProvider>
  );
  return render(ui, { wrapper: Wrapper });
}
