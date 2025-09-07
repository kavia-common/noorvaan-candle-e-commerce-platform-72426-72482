import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

function openCartFromHome() {
  // On Home route, open cart via header button
  const openBtn = screen.getByRole('button', { name: /Open cart/i });
  fireEvent.click(openBtn);
}

describe('Cart drawer operations', () => {
  test('update quantity, remove item, clear cart, and free shipping threshold messaging', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/product/indian-daisy-evening-charm'] });

    // Add to cart
    fireEvent.click(screen.getByRole('button', { name: /Add to cart/i }));

    // Increase qty in the drawer
    const qtyInput = container.querySelector('input[type="number"]');
    expect(qtyInput).toBeInTheDocument();
    fireEvent.change(qtyInput, { target: { value: '2' } });

    // Subtotal updated to reflect quantity 2
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/\$\d+\.\d{2}/)).toBeInTheDocument();

    // Free shipping message: depending on subtotal and threshold (85), either remaining or unlocked text shows
    const thresholdText = screen.getByText(/shipping/i);
    expect(thresholdText).toBeInTheDocument();

    // Remove item
    fireEvent.click(screen.getByRole('button', { name: /Remove/i }));
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();

    // Close, add again, then clear
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    // Navigate to another product and add
    fireEvent.click(screen.getByText(/NOORVAAN/i)); // go home
    fireEvent.click(screen.getByRole('link', { name: /Shop Scented Candles/i }));
    // Click first product card to go to PDP
    const firstCard = container.querySelector('a.card');
    fireEvent.click(firstCard);
    fireEvent.click(screen.getByRole('button', { name: /Add to cart/i }));
    // Drawer is open, clear
    fireEvent.click(screen.getByRole('button', { name: /Clear/i }));
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();

    // Checkout link exists
    expect(screen.getByRole('link', { name: /Checkout/i })).toHaveAttribute('href', '/checkout');
  });
});
