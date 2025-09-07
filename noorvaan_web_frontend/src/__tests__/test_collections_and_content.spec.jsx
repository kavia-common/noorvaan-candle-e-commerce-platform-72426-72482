import React from 'react';
import { within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('Collections and content pages', () => {
  test('Collections page renders from JSON with blocks, products, and posts', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/collections/house-and-home'] });
    const main = within(container.querySelector('main') || container);
    expect(main.getByRole('heading', { name: /House & Home/i })).toBeInTheDocument();
    // Editorial blocks scoped to the first grid-3 section
    const grid3s = container.querySelectorAll('.grid.grid-3');
    expect(grid3s.length).toBeGreaterThan(0);
    expect(grid3s[0].querySelectorAll('.card img').length).toBeGreaterThan(0);
    // Featured products grid
    expect(container.querySelectorAll('.grid-4 a.card').length).toBeGreaterThan(0);
    // Journal posts heading
    expect(main.getByRole('heading', { name: /Learn & Journal/i })).toBeInTheDocument();
  });

  test('Contact/FAQ page renders FAQs and contact form', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/contact'] });
    const main = within(container.querySelector('main') || container);
    expect(main.getByRole('heading', { name: /Care & FAQ/i })).toBeInTheDocument();
    // FAQs render as details elements. Select summary content via text to avoid role ambiguity.
    expect(main.getByText(/How do I avoid tunneling\?/i)).toBeInTheDocument();
    expect(main.getByText(/Can I reuse the vessel\?/i)).toBeInTheDocument();
    // Contact form button
    expect(main.getByRole('button', { name: /^Send$/i })).toBeInTheDocument();
  });

  test('About page renders sections', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/about'] });
    const main = within(container.querySelector('main') || container);
    expect(main.getByRole('heading', { name: /About Noorvaan/i })).toBeInTheDocument();
    expect(main.getByText(/hand‑poured candle/i)).toBeInTheDocument();
  });
});
