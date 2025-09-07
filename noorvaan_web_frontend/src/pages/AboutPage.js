import React from 'react';

// PUBLIC_INTERFACE
export default function AboutPage() {
  return (
    <div className="hero">
      <div className="surface">
        <h1>About Noorvaan</h1>
        <p style={{color:'var(--muted)', maxWidth:760}}>
          “Noorvaan” means carrier of light. We reflect that spirit in every hand‑poured candle made in NYC with American organic soy wax.
          Our scents honor Indian stories—agarwood, mogra, jasmine, sandal and teakwood—evoking temple courtyards, monsoon gardens, and moonlit nights.
        </p>
        <div className="hr" />
        <div className="grid grid-3">
          <div className="card" style={{padding:16}}>
            <h3>Origin</h3>
            <p style={{color:'var(--muted)'}}>Crafted in small batches; each vessel reusable; each flame a quiet ritual.</p>
          </div>
          <div className="card" style={{padding:16}}>
            <h3>Materials</h3>
            <p style={{color:'var(--muted)'}}>Clean, vegan soy wax. Cotton wicks. Premium perfumes. Low‑soot when properly cared for.</p>
          </div>
          <div className="card" style={{padding:16}}>
            <h3>Mission</h3>
            <p style={{color:'var(--muted)'}}>To bring the essence of India into the heart of the West—thoughtful, evocative, serene.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
