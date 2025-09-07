import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.listProducts().then(setProducts);
  }, []);

  return (
    <div className="nv-section">
      <h1 style={{margin: '6px 0 18px'}}>All Candles</h1>
      <div className="nv-grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
