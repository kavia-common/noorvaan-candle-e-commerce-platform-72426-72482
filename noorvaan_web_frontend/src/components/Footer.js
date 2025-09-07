import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="nv-footer">
      <div className="nv-container" style={{display:'flex', justifyContent:'space-between', gap:16, flexWrap:'wrap'}}>
        <div>© {new Date().getFullYear()} Noorvaan Co.</div>
        <div style={{display:'flex', gap:12}}>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="/catalog">Shop</a>
        </div>
      </div>
    </footer>
  );
}
