import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const product = {
  slug: 'test-slug',
  name: 'Test Candle',
  family: 'Floral',
  collection: 'House & Home',
  vessel_color: '#FF00FF',
  badge: 'New',
  price: 50,
  size_display: 'Signature',
  images: []
};

describe('ProductCard', () => {
  test('renders essential product info', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    const cardEl = container.querySelector('a.card') || container.firstChild;
    const card = within(cardEl);
    expect(card.getByText(/Test Candle/i)).toBeInTheDocument();
    expect(card.getByText(/Signature/i)).toBeInTheDocument();
    expect(card.getByText(/\$50\.00/)).toBeInTheDocument();
    expect(card.getByText(/New/i)).toBeInTheDocument();
  });
});
