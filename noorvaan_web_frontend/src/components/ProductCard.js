import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="nv-card" aria-label={`View ${product.name}`}>
      <img className="nv-card-img" src={product.image} alt={product.name} loading="lazy" />
      <div className="nv-card-body">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontWeight:600}}>{product.name}</div>
          <div className="nv-price">${product.price}</div>
        </div>
      </div>
    </Link>
  );
}
