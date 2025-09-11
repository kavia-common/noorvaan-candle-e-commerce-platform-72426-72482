import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className={({isActive}) => `nav-link${isActive ? ' active' : ''}`} style={{padding: '8px 12px', borderRadius: 8}}>
      {children}
    </NavLink>
  );
}

// PUBLIC_INTERFACE
export default function Header({ onOpenCart, cartCount }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // a11y: focus trapping for mobile nav drawer
  const mobileDrawerRef = useRef(null);
  const mobileHeadingRef = useRef(null);
  const mobileOpenerRef = useRef(null);

  useEffect(() => {
    if (mobileOpen) {
      // remember opener, move focus inside drawer
      mobileOpenerRef.current = document.activeElement;
      setTimeout(() => mobileHeadingRef.current?.focus(), 0);
    } else if (mobileOpenerRef.current && typeof mobileOpenerRef.current.focus === 'function') {
      // restore focus when closing
      mobileOpenerRef.current.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const drawer = mobileDrawerRef.current;
    if (!drawer) return;

    const getFocusable = () => drawer.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const nodes = getFocusable();
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const current = document.activeElement;
        if (e.shiftKey) {
          if (current === first || !drawer.contains(current)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (current === last || !drawer.contains(current)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [mobileOpen]);

  return (
    <header className="navbar">
      <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding: '14px 0', gap: 12}}>
        <div style={{display:'flex', alignItems:'center', gap: 10}}>
          <button className="btn btn-ghost" aria-label="Open menu" onClick={(e) => { mobileOpenerRef.current = e.currentTarget; setMobileOpen(v=>!v); }} style={{display:'inline-flex'}}>
            ☰
          </button>
          <Link to="/" style={{fontWeight: 800, letterSpacing: 1, fontSize: 18}} aria-label="Noorvaan home">
            NOORVAAN
          </Link>
        </div>

        <nav className="desktop-nav" style={{display:'none', gap: 8, alignItems:'center'}}>
          <NavItem to="/">Home</NavItem>
          <div onMouseEnter={()=>setMegaOpen(true)} onMouseLeave={()=>setMegaOpen(false)} style={{position:'relative'}}>
            <NavItem to="/shop">Candles Shop ▾</NavItem>
            {megaOpen && (
              <div className="mega">
                <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 40, padding:'24px 0'}}>
                  <div>
                    <h4 style={{margin:'6px 0'}}>Shop</h4>
                    <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:6}}>
                      <li><Link to="/shop?size=Classic">Classic</Link></li>
                      <li><Link to="/shop?size=Signature">Signature</Link></li>
                      <li><Link to="/shop?size=3-wick">3‑wick</Link></li>
                      <li><Link to="/shop?size=4-wick">4‑wick</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{margin:'6px 0'}}>Explore</h4>
                    <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:6}}>
                      <li><Link to="/shop?badge=Best%20Seller">Best Sellers</Link></li>
                      <li><Link to="/shop?badge=Limited">Limited</Link></li>
                      <li><Link to="/shop?badge=New">New</Link></li>
                      <li><Link to="/collections/house-and-home">Collections</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/collections/house-and-home">Collections</NavItem>
          <div onMouseEnter={()=>setMegaOpen(true)} onMouseLeave={()=>setMegaOpen(false)} />
          <NavItem to="/contact">FAQ & Care</NavItem>
          <div className="kbd">⌘K Search</div>
        </nav>

        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <Link to="/checkout" className="btn">Checkout</Link>
          <button className="btn btn-primary" onClick={onOpenCart} aria-label="Open cart">
            🛒 Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="container" style={{paddingBottom: 12}}>
          <div
            className="card"
            style={{padding: 12, position: 'relative'}}
            ref={mobileDrawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-heading"
          >
            {/* a11y: initial focus target for drawer */}
            <div id="mobile-nav-heading" tabIndex={-1} ref={mobileHeadingRef} style={{position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0 0 0 0)'}}>Navigation</div>
            <div style={{display:'grid', gap:6}}>
              <Link to="/" onClick={()=>setMobileOpen(false)}>Home</Link>
              <Link to="/shop" onClick={()=>setMobileOpen(false)}>Candles Shop</Link>
              <Link to="/about" onClick={()=>setMobileOpen(false)}>About</Link>
              <Link to="/collections/house-and-home" onClick={()=>setMobileOpen(false)}>Collections</Link>
              <Link to="/contact" onClick={()=>setMobileOpen(false)}>FAQ & Care</Link>
              <div className="hr" />
              <Link to="/shop?badge=Best%20Seller" onClick={()=>setMobileOpen(false)}>Best Sellers</Link>
              <Link to="/shop?badge=Limited" onClick={()=>setMobileOpen(false)}>Limited</Link>
              <Link to="/shop?badge=New" onClick={()=>setMobileOpen(false)}>New</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
