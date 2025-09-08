import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import FiltersSidebar from '../components/FiltersSidebar';

const facets = {
  sizes: ['Classic','Signature'],
  families: ['Floral','Woody'],
  collections: ['House & Home'],
  colors: ['Pink'],
  price_ranges: ['<$40'],
  badges: ['New']
};

const selected = { sizes: ['Signature'], families: ['Floral'], collections: [], colors: [], price_ranges: [], badges: [] };
const counts = {
  sizes: { Classic: 1, Signature: 2 },
  families: { Floral: 2, Woody: 1 },
  collections: { 'House & Home': 3 },
  colors: { Pink: 1 },
  price_ranges: { '<$40': 0 },
  badges: { New: 1 }
};

describe('FiltersSidebar', () => {
  test('renders groups and counts, can clear and toggle chips', () => {
    const onToggle = jest.fn();
    const onClear = jest.fn();
    const { container } = render(
      <FiltersSidebar facets={facets} selected={selected} counts={counts} onToggle={onToggle} onClear={onClear} />
    );
    const aside = within(container.querySelector('aside') || container);
    // Renders group headings
    expect(aside.getByText(/Product Sizes/i)).toBeInTheDocument();
    expect(aside.getByText(/Fragrance Family/i)).toBeInTheDocument();
    // Count badges render with aria-label count (scoped)
    const countBadges = aside.getAllByLabelText('count');
    expect(countBadges.length).toBeGreaterThan(0);

    // Chip present and removable via aria-label "remove Signature"
    const chip = aside.getByRole('button', { name: /remove signature/i });
    fireEvent.click(chip);
    expect(onToggle).toHaveBeenCalled();

    // Clear all via aria-label "Clear filters"
    const clear = aside.getByRole('button', { name: /Clear filters/i });
    fireEvent.click(clear);
    expect(onClear).toHaveBeenCalled();
  });
});
