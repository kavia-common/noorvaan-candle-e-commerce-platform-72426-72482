import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    render(<FiltersSidebar facets={facets} selected={selected} counts={counts} onToggle={onToggle} onClear={onClear} />);
    // Renders group headings
    expect(screen.getByText(/Product Sizes/i)).toBeInTheDocument();
    expect(screen.getByText(/Fragrance Family/i)).toBeInTheDocument();
    // Count badges render with aria-label count
    expect(screen.getAllByLabelText('count').length).toBeGreaterThan(0);
    // Chip present and removable
    const chip = screen.getByRole('button', { name: /Signature ✕/i });
    fireEvent.click(chip);
    expect(onToggle).toHaveBeenCalled();
    // Clear all
    fireEvent.click(screen.getByRole('button', { name: /Clear all/i }));
    expect(onClear).toHaveBeenCalled();
  });
});
