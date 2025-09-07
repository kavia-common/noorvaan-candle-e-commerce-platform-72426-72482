import { parseMulti, applyFilters, sortProducts, countByFacet } from '../utils/filtering';

const products = [
  { slug: 'a', family: 'Floral', collection: 'House & Home', size_display: 'Signature', vessel_color_name: 'Pink', badge: 'New', price: 68, is_new: true, is_best_seller: false },
  { slug: 'b', family: 'Woody', collection: 'Absolute', size_display: 'Classic', vessel_color_name: 'Black', badge: 'Best Seller', price: 140, is_new: false, is_best_seller: true },
  { slug: 'c', family: 'Floral', collection: 'House & Home', size_display: 'Signature', vessel_color_name: 'Green', badge: 'Limited', price: 48, is_new: false, is_best_seller: false },
];

const facets = {
  families: ['Fresh','Floral','Woody'],
  sizes: ['Classic','Signature','3-wick','4-wick'],
  collections: ['House & Home','Absolute'],
  colors: ['Pink','Black','Green'],
  price_ranges: ['<$40','$40–$80','$80–$150','$150+'],
  badges: ['Best Seller','Limited','New']
};

function qs(str) {
  return new URLSearchParams(str);
}

describe('filtering utils', () => {
  test('parseMulti reads both repeated and comma values', () => {
    expect(parseMulti(qs('family=Floral&family=Woody'), 'family')).toEqual(['Floral','Woody']);
    expect(parseMulti(qs('family=Floral,Woody'), 'family')).toEqual(['Floral','Woody']);
    expect(parseMulti(qs(''), 'family')).toEqual([]);
  });

  test('applyFilters filters by multiple facets', () => {
    const selected = {
      families: ['Floral'],
      sizes: ['Signature'],
      collections: ['House & Home'],
      colors: [],
      price_ranges: [],
      badges: []
    };
    const out = applyFilters(products, selected);
    expect(out.map(p => p.slug)).toEqual(['a','c']);
  });

  test('price range filter works', () => {
    const selected = { families: [], sizes: [], collections: [], colors: [], badges: [], price_ranges: ['$80–$150'] };
    const out = applyFilters(products, selected);
    expect(out.map(p => p.slug)).toEqual(['b']);
  });

  test('sortProducts respects various keys', () => {
    expect(sortProducts(products, 'price-asc').map(p => p.slug)).toEqual(['c','a','b']);
    expect(sortProducts(products, 'price-desc').map(p => p.slug)).toEqual(['b','a','c']);
    expect(sortProducts(products, 'new')[0].slug).toBe('a');
    expect(sortProducts(products, 'best')[0].slug).toBe('b');
  });

  test('countByFacet tallies expected counts', () => {
    const counts = countByFacet(products, facets);
    expect(counts.families.Floral).toBe(2);
    expect(counts.sizes.Signature).toBe(2);
    expect(counts.collections['House & Home']).toBe(2);
    expect(counts.colors.Pink).toBe(1);
    expect(counts.badges['Best Seller']).toBe(1);
    expect(counts.price_ranges['$80–$150']).toBe(1);
  });
});
