import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../providers/ContentContext';
import { useCart } from '../providers/CartContext';

// PUBLIC_INTERFACE
export default function PDPPage({ onOpenCart }) {
  const { slug } = useParams();
  const { fragrances } = useContent();
  const product = useMemo(()=>fragrances.find(f=>f.slug===slug), [fragrances, slug]);

  const [activeTab, setActiveTab] = useState('Notes');

  const { add } = useCart();

  if (!product) return <div>Product not found.</div>;

  const sku = `${product.slug}-${product.size_display || 'Signature'}`;
  const price = product.price || 68;

  const onAdd = () => {
    add({ sku, product, qty: 1, price });
    onOpenCart?.();
  };

  const notes = product.notes || {};
  const burnMap = product.burn_time_by_size || { '4oz': 40, '8oz': 60, '14oz': 80, '30oz': 120, '86oz': 200 };

  return (
    <article style={{display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:24}}>
      <div className="card" style={{overflow:'hidden'}}>
        <div style={{aspectRatio:'4 / 3', position:'relative', background: product.vessel_color || '#eee'}}>
          <img alt={product.name} src={product.images?.[0] || 'https://placehold.co/1000x750'} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', mixBlendMode:'multiply'}} />
        </div>
        {product.images?.[1] && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, padding:10}}>
            <img alt={`${product.name} lifestyle`} src={product.images?.[1]} style={{width:'100%', borderRadius:8, objectFit:'cover'}} />
            <img alt={`${product.name} alt`} src={product.images?.[2] || product.images?.[0]} style={{width:'100%', borderRadius:8, objectFit:'cover'}} />
          </div>
        )}
      </div>

      <div>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          {product.badge && <span className="badge">{product.badge}</span>}
          <span className="badge">{product.family}</span>
        </div>
        <h1 style={{margin:'6px 0'}}>{product.name}</h1>
        <p style={{color:'var(--muted)'}}>{product.short || 'A premium soy candle inspired by Indian evenings—smoky agarwood, sultry mogra, and temple jasmine.'}</p>

        <div style={{display:'flex', alignItems:'center', gap:10, margin:'10px 0'}}>
          {product.size_display && <span className="badge">{product.size_display}</span>}
          <span style={{fontWeight:700}}>${price.toFixed(2)}</span>
        </div>

        <div style={{display:'flex', gap:10}}>
          <button className="btn btn-primary" onClick={onAdd}>Add to cart</button>
          <button className="btn">Save</button>
        </div>

        <div className="hr" />

        <AtGlance items={product.at_a_glance} />

        <div className="hr" />

        <section>
          <h3>Burn time by size</h3>
          <table className="table" aria-label="Burn time by size">
            <caption className="sr-only" style={{position:'absolute',left:'-10000px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}}>Estimated burn hours per candle size</caption>
            <thead>
              <tr><th scope="col">Size</th><th scope="col">Burn Time</th></tr>
            </thead>
            <tbody>
              {Object.entries(burnMap).slice(0,5).map(([size, hours]) => (
                <tr key={size}>
                  <td>{size}</td>
                  <td>{hours}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="hr" />

        <Tabs active={activeTab} onChange={setActiveTab} tabs={['Notes','Vessel & Materials','Room/Occasion','Care & Safety','FAQs']}>
          {activeTab === 'Notes' && (
            <Notes notes={notes} room={product.room_story} />
          )}
          {activeTab === 'Vessel & Materials' && (
            <div style={{color:'var(--muted)'}}>Reusable glass vessel with cotton wick. Clean, vegan soy wax; low‑soot burn when trimmed to 1/4".</div>
          )}
          {activeTab === 'Room/Occasion' && (
            <div>
              <h4 style={{margin:'4px 0'}}>Scene</h4>
              <p style={{color:'var(--muted)'}}>{product.room_story || 'Media room glow, jasmine at midnight, oud trails lingering in soft air.'}</p>
            </div>
          )}
          {activeTab === 'Care & Safety' && (
            <div>
              <ul style={{color:'var(--muted)'}}>
                <li>Trim wick to 1/4" before every burn.</li>
                <li>Let first burn reach glass edge to avoid tunneling.</li>
                <li>Burn on heat‑safe surface away from drafts and curtains.</li>
                <li>Do not burn more than 3–4 hours at a time.</li>
              </ul>
            </div>
          )}
          {activeTab === 'FAQs' && (
            <div style={{color:'var(--muted)'}}>See more in our <a href="/contact">FAQ & Care</a>.</div>
          )}
        </Tabs>

        <div className="hr" />

        <Related currentSlug={product.slug} />
      </div>
    </article>
  );
}

function AtGlance({ items = ['Long‑lasting', 'Reusable glass', 'Clean wax'] }) {
  const icons = ['🕯️','♻️','🌿','✨'];
  return (
    <section>
      <h3 style={{margin:'4px 0'}}>At‑a‑Glance</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
        {items.slice(0,4).map((t, i) => (
          <div key={t} className="card" style={{padding:12, display:'flex', alignItems:'center', gap:8}}>
            <span aria-hidden>{icons[i] || '⭐'}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tabs({ tabs, active, onChange, children }) {
  return (
    <section>
      <div style={{display:'flex', gap:8, borderBottom:'1px solid var(--border)'}}>
        {tabs.map(t => (
          <button
            key={t}
            className="btn"
            onClick={()=>onChange(t)}
            style={{
              border: 'none',
              borderBottom: active === t ? '2px solid var(--fg)' : '2px solid transparent',
              borderRadius: 0
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div style={{paddingTop:10}}>{children}</div>
    </section>
  );
}

function Notes({ notes, room }) {
  return (
    <div>
      <div style={{display:'flex', gap:20}}>
        <div>
          <div style={{fontWeight:700, marginBottom:6}}>Fragrance Pyramid</div>
          <ul style={{margin:0, paddingLeft:18}}>
            <li><strong>Top</strong> • {(notes.top || []).join(', ')}</li>
            <li><strong>Heart</strong> • {(notes.heart || []).join(', ')}</li>
            <li><strong>Base</strong> • {(notes.base || []).join(', ')}</li>
          </ul>
        </div>
        <div>
          <div style={{fontWeight:700, marginBottom:6}}>Room Story</div>
          <p style={{color:'var(--muted)'}}>{room || 'Beach House — sea breeze through linen curtains, sandal trails, and evening jasmine.'}</p>
        </div>
      </div>
    </div>
  );
}

function Related({ currentSlug }) {
  const { fragrances } = useContent();
  const others = fragrances.filter(f=>f.slug!==currentSlug).slice(0,4);
  return (
    <section>
      <h3>Pairs with</h3>
      <div className="grid grid-4">
        {others.map(o => (
          <div key={o.slug} className="card" style={{padding:12}}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <div style={{width:36, height:36, borderRadius:8, background:o.vessel_color || '#ddd'}} />
              <div style={{fontWeight:600}}>{o.name}</div>
            </div>
            <div style={{marginTop:8}}>
              <a href={`/product/${o.slug}`}>View →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
