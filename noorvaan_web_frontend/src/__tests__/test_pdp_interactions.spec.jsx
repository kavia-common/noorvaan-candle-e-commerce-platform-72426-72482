import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('PDP interactions and details', () => {
  test('renders burn-time table with at least 5 rows and notes tab', () => {
    // Use a known product from fixtures
    renderWithProviders(<App />, { initialEntries: ['/product/indian-daisy-evening-charm'] });

    // Burn time table rows (header + body rows)
    const table = screen.getByRole('table', { name: /Burn time by size/i });
    const bodyRows = within(table).getAllByRole('row').slice(1); // exclude header
    expect(bodyRows.length).toBeGreaterThanOrEqual(5);

    // Default active tab Notes content shows fragrance pyramid and room story
    expect(screen.getByText(/Fragrance Pyramid/i)).toBeInTheDocument();
    expect(screen.getByText(/Room Story/i)).toBeInTheDocument();

    // Switch to Care & Safety tab
    fireEvent.click(screen.getByRole('button', { name: 'Care & Safety' }));
    expect(screen.getByText(/Trim wick to 1\/4"/i)).toBeInTheDocument();
  });

  test('add to cart adds item and opens cart drawer with subtotal', () => {
    renderWithProviders(<App />, { initialEntries: ['/product/agarwood-magnolia-nilgiri-velvet'] });
    const addBtn = screen.getByRole('button', { name: /Add to cart/i });
    fireEvent.click(addBtn);

    // Cart drawer should show "Your Cart" and subtotal > 0
    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    // subtotal shows a dollar amount
    expect(screen.getByText(/\$\d+\.\d{2}/)).toBeInTheDocument();
  });
});
