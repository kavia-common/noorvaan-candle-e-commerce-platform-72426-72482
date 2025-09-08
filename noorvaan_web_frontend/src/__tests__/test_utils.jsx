import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import { CartProvider } from '../providers/CartContext';
import { ContentProvider } from '../providers/ContentContext';
import { Elements } from '@stripe/react-stripe-js';

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

// Minimal passing test to ensure this helper file contributes a green spec
test('renderWithProviders mounts children inside providers', () => {
  const { container } = renderWithProviders(<div data-testid="inside">ok</div>);
  const scoped = within(container);
  expect(scoped.getByTestId('inside')).toHaveTextContent('ok');
});
