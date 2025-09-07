import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('PDP interactions and details', () => {
  test('renders burn-time table with at least 5 rows and notes tab', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/product/indian-daisy-evening-charm'] });
    const main = within(container.querySelector('main') || container);

    // Burn time table rows (header + body rows)
    const table = main.getByRole('table', { name: /Burn time by size/i });
    const allRows = within(table).getAllByRole('row');
    const bodyRows = allRows.slice(1); // exclude header
    expect(bodyRows.length).toBeGreaterThanOrEqual(5);

    // Default active tab Notes content shows fragrance pyramid and room story
    expect(main.getByText(/Fragrance Pyramid/i)).toBeInTheDocument();
    expect(main.getByText(/Room Story/i)).toBeInTheDocument();

    // Switch to Care & Safety tab
    fireEvent.click(main.getByRole('button', { name: 'Care & Safety' }));
    expect(main.getByText(/Trim wick to 1\/4"/i)).toBeInTheDocument();
  });

  test('add to cart adds item and opens cart drawer with subtotal', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/product/agarwood-magnolia-nilgiri-velvet'] });
    const main = within(container.querySelector('main') || container);
    const addBtn = main.getByRole('button', { name: /Add to cart/i });
    fireEvent.click(addBtn);

    // Cart drawer should show "Your Cart" and subtotal > 0
    const drawer = within(container.getElementsByTagName('aside')[0]);
    expect(drawer.getByText(/Your Cart/i)).toBeInTheDocument();
    expect(drawer.getByText(/Subtotal/i)).toBeInTheDocument();
    // subtotal shows a dollar amount
    expect(drawer.getByText(/\$\d+\.\d{2}/)).toBeInTheDocument();
  });
});
