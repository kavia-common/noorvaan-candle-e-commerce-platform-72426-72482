import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../providers/ContentContext';
import ProductCard from '../components/ProductCard';

// PUBLIC_INTERFACE
export default function HomePage({ onOpenCart }) {
  const { fragrances } = useContent();
  const featured = fragrances.slice(0, 6);

  // Light SEO hints
  document.title = 'Noorvaan — Carrier of Light | Luxury Scented Candles';
  const metaDesc = 'Luxury soy candles inspired by Mughal gardens at twilight. Clean, vegan, low‑soot. Hand‑poured in NYC.';
  updateMeta('description', metaDesc);

  return (
    <div style={{display:'grid', gap:30}}>
      <section className="hero" aria-label="Hero introduction">
        <div className="surface">
          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:20}}>
            <div>
              <h1 style={{fontSize:42, margin:0, lineHeight:1.05}}>Noorvaan — Carrier of Light</h1>
              <p style={{color:'var(--muted)', fontSize:18}}>
                Hand‑poured in NYC with American organic soy wax. Each flame carries rare Indian scents—agarwood, mogra, jasmine, and teakwood—bringing the essence of India into the heart of the West.
              </p>
              <div style={{display:'flex', gap:10}}>
                <Link className="btn btn-primary" to="/shop">Shop Scented Candles</Link>
                <Link className="btn" to="/collections/house-and-home">Explore Collections</Link>
              </div>
              <div style={{marginTop:12, color:'var(--muted)'}}><span className="badge" aria-label="Trust statements">Clean • Vegan • Low‑Soot</span></div>
            </div>
            <div className="card" style={{padding:0, overflow:'hidden'}}>
              <img
                alt="Hero candle against soft twilight hues"
                src="https://images.unsplash.com/photo-1505575972945-270f40c7d532?q=80&w=1200&auto=format&fit=crop"
                style={{width:'100%', height:'100%', objectFit:'cover'}}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-heading">
        <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
          <h2 id="featured-heading" style={{margin:'6px 0'}}>Featured</h2>
          <Link to="/shop" aria-label="View all scented candles">View all →</Link>
        </div>
        <div className="grid grid-4">
          {featured.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section aria-label="Brand values" >
        <div className="card" style={{padding:24}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20}}>
            <div>
              <div style={{fontWeight:700}}>Craft</div>
              <p style={{color:'var(--muted)'}}>Small‑batch candles poured by hand with cotton wicks and premium perfume oils.</p>
            </div>
            <div>
              <div style={{fontWeight:700}}>Values</div>
              <p style={{color:'var(--muted)'}}>Clean, vegan soy wax in reusable glass. Designed for long, even burns.</p>
            </div>
            <div>
              <div style={{fontWeight:700}}>Origin</div>
              <p style={{color:'var(--muted)'}}>Scent stories inspired by the Indian subcontinent—temples, monsoon gardens, and moonlit jasmine.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="journal-heading">
        <h3 id="journal-heading" style={{margin:'6px 0'}}>From the Journal</h3>
        <div className="grid grid-3">
          {[1,2,3].map(i => (
            <article key={i} className="card" style={{overflow:'hidden'}}>
              <img
                alt="Journal article visual"
                src={`https://images.unsplash.com/photo-15${i}575972945-270f40c7d532?q=80&w=1200&auto=format&fit=crop`}
                style={{width:'100%', height:200, objectFit:'cover'}}
                loading="lazy"
              />
              <div style={{padding:12}}>
                <div className="badge">Education</div>
                <h4>Care & Safety • Wick Trim</h4>
                <p style={{color:'var(--muted)'}}>Keep your wick at 1/4 inch to prevent soot and tunneling. Let the first burn reach the glass edge.</p>
                <Link to="/contact">Read more →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/** Utility to upsert simple meta tags (no external deps) */
function updateMeta(name, content) {
  const sel = `meta[name="${name}"]`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
