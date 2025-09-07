import React from 'react';
import { screen, within, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('App navigation, header, and promo bar', () => {
  test('renders promo bar when enabled and header links', async () => {
    const { container } = renderWithProviders(<App />, { route: '/' });

    // Scope promo bar within announcement container
    const announcementBars = container.getElementsByClassName('announcement');
    expect(announcementBars.length).toBeGreaterThan(0);
    const promo = within(announcementBars[0]);
    expect(promo.getByText(/Free shipping over \$85/i)).toBeInTheDocument();

    // Scope header area
    const headers = container.getElementsByTagName('header');
    const header = within(headers[0]);

    // Header has key links and buttons
    expect(header.getByRole('link', { name: /^NOORVAAN$/i })).toHaveAttribute('href', '/');
    // Checkout link inside header action group
    expect(header.getAllByRole('link', { name: /Checkout/i })[0]).toBeInTheDocument();
    expect(header.getByRole('button', { name: /Open cart/i })).toBeInTheDocument();

    // Desktop nav might be hidden; still assert link presence using scoped queries
    const shopLinks = header.getAllByRole('link', { name: /Candles Shop/i });
    expect(shopLinks[0]).toBeInTheDocument();
    expect(header.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(header.getByRole('link', { name: /FAQ & Care/i })).toBeInTheDocument();
  });

  test('mobile drawer toggles via menu button', () => {
    const { container } = renderWithProviders(<App />, { route: '/' });
    const header = within(container.getElementsByTagName('header')[0]);
    const menuBtn = header.getByRole('button', { name: /Open menu/i });
    fireEvent.click(menuBtn);

    // Now mobile links appear in drawer (scoped to the first .card under header)
    const cards = container.querySelectorAll('header .card');
    const drawer = cards.length ? within(cards[0]) : header;
    expect(drawer.getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
    expect(drawer.getByRole('link', { name: /^Candles Shop$/i })).toBeInTheDocument();
  });

  test('navigates to PLP and displays sort control and results count', () => {
    const { container } = renderWithProviders(<App />, { route: '/shop' });
    const main = within(container.querySelector('main') || container);
    expect(main.getByRole('heading', { name: /Scented Candles/i })).toBeInTheDocument();
    expect(main.getByLabelText(/^Sort$/i)).toBeInTheDocument();
    expect(main.getByText(/\b\d+\s+results\b/i)).toBeInTheDocument();
  });
});
