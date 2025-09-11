import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductCard from '../components/ProductCard';
import { useContent } from '../providers/ContentContext';
import { applyFilters, sortProducts, parseMulti, countByFacet } from '../utils/filtering';

// PUBLIC_INTERFACE
export default function PLPPage() {
  const { fragrances, facets } = useContent();
  const location = useLocation();
  const navigate = useNavigate();

  const qs = useMemo(()=>new URLSearchParams(location.search), [location.search]);

  const selected = {
    families: parseMulti(qs, 'family'),
    sizes: parseMulti(qs, 'size'),
    collections: parseMulti(qs, 'collection'),
    colors: parseMulti(qs, 'color'),
    price_ranges: parseMulti(qs, 'price'),
    badges: parseMulti(qs, 'badge')
  };
  const sortKey = qs.get('sort') || 'featured';

  const filtered = useMemo(() => applyFilters(fragrances, selected), [fragrances, selected]);
  const sorted = useMemo(() => sortProducts(filtered, sortKey), [filtered, sortKey]);
  const counts = useMemo(() => countByFacet(fragrances, facets), [fragrances, facets]);

  const toggle = (key, value) => {
    const next = new URLSearchParams(location.search);
    const vals = parseMulti(next, mapParam(key));
    const idx = vals.indexOf(value);
    if (idx >= 0) vals.splice(idx,1);
    else vals.push(value);
    next.delete(mapParam(key));
    if (vals.length) next.set(mapParam(key), vals.join(','));
    navigate({ search: next.toString() }, { replace: false });
  };

  const onClear = () => {
    navigate({ search: '' });
  };

  const onSort = (e) => {
    const next = new URLSearchParams(location.search);
    next.set('sort', e.target.value);
    navigate({ search: next.toString() }, { replace: false });
  };

  return (
    <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:20}}>
      <FiltersSidebar facets={facets} selected={selected} counts={counts} onToggle={toggle} onClear={onClear} />
      <section>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
          <div>
            <h1 style={{margin:'0 0 6px'}}>Scented Candles</h1>
            <div id="results-count" style={{color:'var(--muted)'}}>{sorted.length} results</div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <label htmlFor="sort">Sort</label>
            <select id="sort" aria-describedby="results-count" value={sortKey} onChange={onSort}>
              <option value="featured">Featured</option>
              <option value="best">Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="new">New</option>
            </select>
          </div>
        </div>
        <div className="grid grid-4">
          {sorted.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </div>
  );
}

function mapParam(key) {
  switch (key) {
    case 'families': return 'family';
    case 'sizes': return 'size';
    case 'collections': return 'collection';
    case 'colors': return 'color';
    case 'price_ranges': return 'price';
    case 'badges': return 'badge';
    default: return key;
  }
}
