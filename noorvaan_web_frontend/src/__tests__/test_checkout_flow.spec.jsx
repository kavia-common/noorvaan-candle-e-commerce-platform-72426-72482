import React from 'react';
import { screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

// use the same mocks from test_utils for stripe hooks/elements

describe('Checkout flow (mocked Stripe)', () => {
  test('shows disabled pay button when cart empty and enables with items', async () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/checkout'] });
    const main = within(container.querySelector('main') || container);
    const btn = main.getByRole('button', { name: /^Pay/i });
    expect(btn).toBeDisabled();
  });

  test('successful mock payment clears cart and navigates home', async () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/product/indian-daisy-evening-charm'] });
    const main = within(container.querySelector('main') || container);
    // Add to cart
    fireEvent.click(main.getByRole('button', { name: /Add to cart/i }));
    // Proceed to checkout via drawer CTA
    const drawer = within(container.getElementsByTagName('aside')[0]);
    fireEvent.click(drawer.getByRole('link', { name: /^Checkout$/i }));

    // Email input
    const checkoutMain = within(container.querySelector('main') || container);
    const email = checkoutMain.getByLabelText(/^Email$/i);
    fireEvent.change(email, { target: { value: 'test@example.com' } });

    // Card element is mocked input
    const card = checkoutMain.getByTestId('mock-card-element');
    fireEvent.change(card, { target: { value: '4242 4242 4242 4242' } });

    const payBtn = checkoutMain.getByRole('button', { name: /Pay \$\d+\.\d{2}/i });
    expect(payBtn).not.toBeDisabled();

    fireEvent.click(payBtn);

    // Wait for navigation back to home and alert called
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
      const home = within(container.querySelector('main') || container);
      expect(home.getByRole('heading', { name: /Noorvaan — Carrier of Light/i })).toBeInTheDocument();
    });
  });
});
