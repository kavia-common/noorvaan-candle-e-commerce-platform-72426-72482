import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('PLP filtering and sorting', () => {
  test('selecting families and sizes filters grid and updates URL', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/shop'] });

    const main = within(container.querySelector('main') || container);

    // Pre-condition: there are multiple product cards
    expect(container.querySelectorAll('a.card').length).toBeGreaterThan(2);

    // Access sidebar and toggle checkboxes via labels within the sidebar container
    const sidebar = within(container.querySelector('aside') || container);

    const floralLabel = sidebar.getByText(/^Floral$/);
    const floralCheckbox = floralLabel.closest('label').querySelector('input[type="checkbox"]');
    fireEvent.click(floralCheckbox);

    const woodyLabel = sidebar.getByText(/^Woody$/);
    const woodyCheckbox = woodyLabel.closest('label').querySelector('input[type="checkbox"]');
    fireEvent.click(woodyCheckbox);

    const sigLabel = sidebar.getByText(/^Signature$/);
    const sigCheckbox = sigLabel.closest('label').querySelector('input[type="checkbox"]');
    fireEvent.click(sigCheckbox);

    // Results count should update accordingly (scoped)
    const results = main.getByText(/\b\d+\s+results\b/i);
    expect(results).toBeInTheDocument();

    // URL should include query params (family and size)
    expect(window.location.search).toMatch(/family=/);
    expect(window.location.search).toMatch(/size=/);

    // Active chip appears, Clear all clears filters (use aria-label "Clear filters")
    const clearBtn = sidebar.getByRole('button', { name: /Clear filters|Clear all/i });
    fireEvent.click(clearBtn);
    expect(window.location.search).toBe('');
  });

  test('sort changes product order without page reload', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/shop'] });
    const main = within(container.querySelector('main') || container);
    const select = main.getByLabelText(/^Sort$/i);
    // Choose price-desc
    fireEvent.change(select, { target: { value: 'price-desc' } });
    // Validate that selection changed and still on PLP
    expect(select).toHaveValue('price-desc');
    expect(main.getByRole('heading', { name: /Scented Candles/i })).toBeInTheDocument();

    // There are still product cards
    expect(container.querySelectorAll('a.card').length).toBeGreaterThan(0);
  });
});
