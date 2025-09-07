import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('Collections and content pages', () => {
  test('Collections page renders from JSON with blocks, products, and posts', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/collections/house-and-home'] });
    expect(screen.getByRole('heading', { name: /House & Home/i })).toBeInTheDocument();
    // Editorial blocks
    expect(container.querySelectorAll('.card img').length).toBeGreaterThan(0);
    // Featured products grid
    expect(container.querySelectorAll('.grid-4 a.card').length).toBeGreaterThan(0);
    // Journal posts
    expect(screen.getByText(/Learn & Journal/i)).toBeInTheDocument();
  });

  test('Contact/FAQ page renders FAQs and contact form', () => {
    renderWithProviders(<App />, { initialEntries: ['/contact'] });
    expect(screen.getByRole('heading', { name: /Care & FAQ/i })).toBeInTheDocument();
    // FAQs render as details elements
    expect(screen.getAllByRole('button', { name: /How do I avoid tunneling\?/i }).length || screen.getAllByText(/How do I avoid tunneling/i).length).toBeGreaterThan(0);
    // Contact form fields
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
  });

  test('About page renders sections', () => {
    renderWithProviders(<App />, { initialEntries: ['/about'] });
    expect(screen.getByRole('heading', { name: /About Noorvaan/i })).toBeInTheDocument();
    expect(screen.getByText(/hand‑poured candle/i)).toBeInTheDocument();
  });
});
