import React from 'react';
import { render, screen } from '@testing-library/react';
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
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Test Candle/i)).toBeInTheDocument();
    expect(screen.getByText(/Signature/i)).toBeInTheDocument();
    expect(screen.getByText(/\$50\.00/)).toBeInTheDocument();
    expect(screen.getByText(/New/i)).toBeInTheDocument();
  });
});
