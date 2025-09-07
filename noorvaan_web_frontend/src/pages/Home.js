import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.listProducts().then(ps => setFeatured(ps.slice(0, 3)));
  }, []);

  return (
    <div>
      <section className="nv-hero">
        <div>
          <div className="nv-kicker">Artisanal Candles</div>
          <h1>Quiet moments. Warm light.</h1>
          <p>Minimal designs with rich, layered fragrances. Hand-poured with care, inspired by simple rituals.</p>
          <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <Link to="/catalog" className="nv-cta">Shop Candles</Link>
            <Link to="/about" className="nv-cta secondary">Our Story</Link>
          </div>
        </div>
        <div>
          <div className="nv-badge">New Season • Limited</div>
          <div style={{marginTop:12, border:'1px solid var(--border)', borderRadius:12, overflow:'hidden'}}>
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" alt="Noorvaan candles" />
          </div>
        </div>
      </section>

      <section className="nv-section">
        <h2 style={{marginBottom:12}}>Featured</h2>
        <div className="nv-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
