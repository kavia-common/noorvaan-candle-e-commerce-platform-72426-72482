import React from 'react';
import { screen, within, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('App navigation, header, and promo bar', () => {
  test('renders promo bar when enabled and header links', async () => {
    renderWithProviders(<App />, { route: '/' });

    // Promo bar text comes from site.json
    expect(screen.getByText(/Free shipping over \$85/i)).toBeInTheDocument();

    // Header has key links
    expect(screen.getByRole('link', { name: /NOORVAAN/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Checkout/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Open cart/i })).toBeInTheDocument();

    // Nav may render desktop nav hidden by CSS; verify presence of critical link by text
    expect(screen.getAllByRole('link', { name: /Candles Shop/i })[0]).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /FAQ & Care/i })).toBeInTheDocument();
  });

  test('mobile drawer toggles via menu button', () => {
    renderWithProviders(<App />, { route: '/' });
    const menuBtn = screen.getByRole('button', { name: /Open menu/i });
    fireEvent.click(menuBtn);
    // Now mobile links appear in drawer
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Candles Shop/i })).toBeInTheDocument();
  });

  test('navigates to PLP and displays sort control and results count', () => {
    renderWithProviders(<App />, { route: '/shop' });
    expect(screen.getByRole('heading', { name: /Scented Candles/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort/i)).toBeInTheDocument();
    expect(screen.getByText(/results/i)).toBeInTheDocument();
  });
});
