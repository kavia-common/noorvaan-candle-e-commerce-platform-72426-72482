import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 20}}>
        <div>
          <div style={{fontWeight:800, letterSpacing:1}}>NOORVAAN</div>
          <p style={{color:'var(--muted)'}}>Carrier of light. Hand-poured in NYC with American organic soy wax.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <div style={{display:'grid'}}>
            <Link to="/shop">Scented Candles</Link>
            <Link to="/collections/house-and-home">House & Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Care & FAQ</Link>
          </div>
        </div>
        <div>
          <h4>Newsletter</h4>
          <form onSubmit={(e)=>{e.preventDefault(); alert('Thank you for subscribing!')}}>
            <input className="input" type="email" placeholder="you@example.com" required aria-label="Email" />
            <div style={{height:8}} />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
