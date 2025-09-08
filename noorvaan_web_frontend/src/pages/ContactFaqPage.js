import React from 'react';
import { useContent } from '../providers/ContentContext';

// PUBLIC_INTERFACE
export default function ContactFaqPage() {
  const { faqs } = useContent();

  return (
    <div style={{display:'grid', gap:20}}>
      <section className="hero">
        <div className="surface">
          <h1>Care & FAQ</h1>
          <p style={{color:'var(--muted)'}}>For clean, even burns: trim wick to 1/4" and let the first burn reach the glass edge.</p>
        </div>
      </section>

      <section className="grid grid-3">
        <div className="card" style={{padding:16}}>
          <h3>Wick Trim</h3>
          <p style={{color:'var(--muted)'}}>Trim to 1/4" each time to reduce soot and extend the candle’s life.</p>
        </div>
        <div className="card" style={{padding:16}}>
          <h3>First Burn</h3>
          <p style={{color:'var(--muted)'}}>Allow wax to melt to the edge on first burn to avoid tunneling.</p>
        </div>
        <div className="card" style={{padding:16}}>
          <h3>Safety</h3>
          <p style={{color:'var(--muted)'}}>Burn on a heat‑safe surface, away from drafts; do not leave unattended.</p>
        </div>
      </section>

      <section>
        <h2>FAQs</h2>
        <div style={{display:'grid', gap:10}}>
          {faqs.map((f, idx) => (
            <details key={idx} className="card" style={{padding:12}}>
              <summary style={{fontWeight:600, cursor:'pointer'}}>{f.q}</summary>
              <p style={{color:'var(--muted)'}}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="card" style={{padding:16}}>
        <h3>Contact</h3>
        <p style={{color:'var(--muted)'}}>Questions? Email us at support@noorvaan.example</p>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks, we will be in touch.')}}>
          <div style={{display:'grid', gap:10}}>
            <input className="input" placeholder="Your name" required />
            <input className="input" type="email" placeholder="you@example.com" required />
            <textarea className="input" placeholder="How can we help?" rows={4} required />
            <button className="btn btn-primary" type="submit">Send</button>
          </div>
        </form>
      </section>
    </div>
  );
}
