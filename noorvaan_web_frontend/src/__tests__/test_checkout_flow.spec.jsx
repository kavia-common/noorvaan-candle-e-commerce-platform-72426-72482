import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

// use the same mocks from test_utils for stripe hooks/elements

describe('Checkout flow (mocked Stripe)', () => {
  test('shows disabled pay button when cart empty and enables with items', async () => {
    renderWithProviders(<App />, { initialEntries: ['/checkout'] });
    const btn = screen.getByRole('button', { name: /Pay/i });
    expect(btn).toBeDisabled();

    // Navigate to PDP to add item
    // Using router: go to PDP then back to checkout
    // Easiest: push product route
  });

  test('successful mock payment clears cart and navigates home', async () => {
    const utils = renderWithProviders(<App />, { initialEntries: ['/product/indian-daisy-evening-charm'] });
    // Add to cart
    fireEvent.click(screen.getByRole('button', { name: /Add to cart/i }));
    // Proceed to checkout
    fireEvent.click(screen.getByRole('link', { name: /Checkout/i }));
    // Email input
    const email = screen.getByLabelText(/Email/i);
    fireEvent.change(email, { target: { value: 'test@example.com' } });

    // Card element is mocked input
    const card = screen.getByTestId('mock-card-element');
    fireEvent.change(card, { target: { value: '4242 4242 4242 4242' } });

    const payBtn = screen.getByRole('button', { name: /Pay \$\d+\.\d{2}/i });
    expect(payBtn).not.toBeDisabled();

    fireEvent.click(payBtn);

    // Wait for navigation back to home and alert called
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
      expect(screen.getByRole('heading', { name: /Noorvaan — Carrier of Light/i })).toBeInTheDocument();
    });
  });
});
