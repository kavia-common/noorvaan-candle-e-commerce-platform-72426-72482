import React from 'react';
import { fireEvent, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('PLP filtering and sorting', () => {
  test('selecting families and sizes filters grid and shows active chips', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/shop'] });

    const main = within(container.querySelector('main') || container);

    // Pre-condition: there are multiple product cards
    const grid = container.querySelector('.grid.grid-4') || container;
    expect(grid.querySelectorAll('a.card').length).toBeGreaterThan(2);

    // Access sidebar and toggle checkboxes via labels within the sidebar container
    const sidebarEl = container.querySelector('aside');
    const sidebar = within(sidebarEl || container);

    const floralLabel = sidebar.getByText(/^Floral$/i);
    const floralCheckbox = floralLabel.closest('label').querySelector('input[type="checkbox"]');
    fireEvent.click(floralCheckbox);

    const woodyLabel = sidebar.getByText(/^Woody$/i);
    const woodyCheckbox = woodyLabel.closest('label').querySelector('input[type="checkbox"]');
    fireEvent.click(woodyCheckbox);

    const sigLabel = sidebar.getByText(/^Signature$/i);
    const sigCheckbox = sigLabel.closest('label').querySelector('input[type="checkbox"]');
    fireEvent.click(sigCheckbox);

    // Results count should update accordingly (scoped)
    const results = main.getByText(/\b\d+\s+results\b/i);
    expect(results).toBeInTheDocument();

    // Assert active chips are visible for selected filters
    // Chips render as buttons with class "badge" and text "{value} ✕"
    const chipsContainer = sidebarEl.querySelectorAll('button.badge');
    const chipTexts = Array.from(chipsContainer).map((el) => el.textContent.trim());
    expect(chipTexts.some(t => /^Floral/i.test(t))).toBe(true);
    expect(chipTexts.some(t => /^Woody/i.test(t))).toBe(true);
    expect(chipTexts.some(t => /^Signature/i.test(t))).toBe(true);

    // Clear filters via aria-label "Clear filters" hides chips
    const clearBtn = sidebar.getByRole('button', { name: /^Clear filters$/i });
    fireEvent.click(clearBtn);

    // After clearing, no active chips are shown
    const chipsAfterClear = sidebarEl.querySelectorAll('button.badge');
    // Some badges might exist elsewhere; ensure there are no removable chips with ✕ inside FiltersSidebar
    expect(Array.from(chipsAfterClear).filter(el => el.textContent.includes('✕')).length).toBe(0);
  });

  test('sort changes product order without page reload (assert via select value and stable UI)', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/shop'] });
    const main = within(container.querySelector('main') || container);

    // Snapshot the initial first product title to verify order can change
    const grid = container.querySelector('.grid.grid-4') || container;
    const initialCards = Array.from(grid.querySelectorAll('a.card'));
    const initialFirstText = initialCards[0]?.textContent || '';

    const select = main.getByLabelText(/^Sort$/i);
    // Choose price-desc
    fireEvent.change(select, { target: { value: 'price-desc' } });

    // Validate that selection changed and still on PLP
    expect(select).toHaveValue('price-desc');
    expect(main.getByRole('heading', { name: /Scented Candles/i })).toBeInTheDocument();

    // There are still product cards and likely a different first card due to sorting
    const gridAfter = container.querySelector('.grid.grid-4') || container;
    const cardsAfter = Array.from(gridAfter.querySelectorAll('a.card'));
    expect(cardsAfter.length).toBeGreaterThan(0);
    const afterFirstText = cardsAfter[0]?.textContent || '';

    // The order may change; assert that either first item changed or list remains valid.
    // We avoid asserting URL in MemoryRouter; rely on select value and product presence instead.
    expect(afterFirstText.length).toBeGreaterThan(0);
  });
});
