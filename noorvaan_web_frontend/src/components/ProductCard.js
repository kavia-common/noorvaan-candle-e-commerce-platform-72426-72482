import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function ProductCard({ product }) {
  const {
    slug, name, family, collection, vessel_color, badge, price, size_display, images
  } = product;

  return (
    <Link to={`/product/${slug}`} className="card" style={{overflow:'hidden', display:'block'}}>
      <div style={{aspectRatio:'1 / 1', background: '#f3f4f6', position:'relative'}}>
        <div style={{position:'absolute', inset:0, background: vessel_color || '#ddd', opacity:.2}} />
        <img
          src={images?.[0] || `https://placehold.co/600x600/png?text=${encodeURIComponent(name)}`}
          alt={name || 'Candle product image'}
          style={{width:'100%', height:'100%', objectFit:'cover', mixBlendMode:'multiply'}}
          loading="lazy"
        />
        {badge && (
          <div style={{position:'absolute', top:10, left:10}} className="badge">{badge}</div>
        )}
      </div>
      <div style={{padding:12, display:'grid', gap:4}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontWeight:600}}>{name}</div>
          {vessel_color && (
            <span title="Vessel color" style={{width:14, height:14, borderRadius:999, border:'1px solid var(--border)', background:vessel_color}} />
          )}
        </div>
        <div style={{fontSize:13, color:'var(--muted)'}}>{family} • {collection}</div>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          {size_display && <span className="badge">{size_display}</span>}
          {typeof price === 'number' && <div style={{marginLeft:'auto', fontWeight:600}}>${price.toFixed(2)}</div>}
        </div>
      </div>
    </Link>
  );
}
