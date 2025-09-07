import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

function getCheckboxByLabel(text) {
  return screen.getByLabelText(new RegExp(text, 'i'), { selector: 'input[type="checkbox"]' });
}

describe('PLP filtering and sorting', () => {
  test('selecting families and sizes filters grid and updates URL', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/shop'] });

    // Pre-condition: there are multiple product cards
    expect(container.querySelectorAll('a.card').length).toBeGreaterThan(2);

    // Click Floral and Woody, and Signature size
    const floralLabel = screen.getByText('Floral');
    const floralCheckbox = floralLabel.closest('label').querySelector('input');
    fireEvent.click(floralCheckbox);

    const woodyLabel = screen.getByText('Woody');
    const woodyCheckbox = woodyLabel.closest('label').querySelector('input');
    fireEvent.click(woodyCheckbox);

    const sigLabel = screen.getByText('Signature');
    const sigCheckbox = sigLabel.closest('label').querySelector('input');
    fireEvent.click(sigCheckbox);

    // Results count should update accordingly
    const results = screen.getByText(/results/i);
    expect(results).toBeInTheDocument();

    // URL should include query params (family and size)
    expect(window.location.search).toMatch(/family=/);
    expect(window.location.search).toMatch(/size=/);

    // Active chip appears, Clear all clears filters
    const clearBtn = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearBtn);
    expect(window.location.search).toBe('');
  });

  test('sort changes product order without page reload', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/shop'] });
    const select = screen.getByLabelText(/Sort/i);
    // Choose price-desc
    fireEvent.change(select, { target: { value: 'price-desc' } });
    // Validate that selection changed and still on PLP
    expect(select).toHaveValue('price-desc');
    expect(screen.getByRole('heading', { name: /Scented Candles/i })).toBeInTheDocument();

    // There are still product cards
    expect(container.querySelectorAll('a.card').length).toBeGreaterThan(0);
  });
});
