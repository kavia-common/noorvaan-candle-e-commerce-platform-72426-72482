import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../providers/ContentContext';
import ProductCard from '../components/ProductCard';

// PUBLIC_INTERFACE
export default function CollectionsPage() {
  const { slug } = useParams();
  const { collections, fragrances } = useContent();

  const col = collections.find(c => c.slug === slug) || collections[0];
  const prods = fragrances.filter(f => col.products?.includes(f.slug));

  return (
    <div style={{display:'grid', gap:20}}>
      <section className="hero">
        <div className="surface">
          <h1 style={{margin:'0 0 8px'}}>{col.title}</h1>
          <p style={{color:'var(--muted)'}}>{col.intro}</p>
        </div>
      </section>

      <section className="grid grid-3">
        {(col.blocks || []).map((b, idx) => (
          <div key={idx} className="card" style={{overflow:'hidden'}}>
            {b.image && <img alt={b.title} src={b.image} style={{width:'100%', height:200, objectFit:'cover'}} />}
            <div style={{padding:12}}>
              <h3 style={{margin:'4px 0'}}>{b.title}</h3>
              <p style={{color:'var(--muted)'}}>{b.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2>Featured Fragrances</h2>
        <div className="grid grid-4">
          {prods.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section>
        <h3>Learn & Journal</h3>
        <div className="grid grid-3">
          {(col.posts || []).map((p, i) => (
            <article key={i} className="card" style={{padding:12}}>
              <div className="badge">Education</div>
              <h4 style={{margin:'6px 0'}}>{p.title}</h4>
              <p style={{color:'var(--muted)'}}>{p.snippet}</p>
              <Link to={p.href}>Read →</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
