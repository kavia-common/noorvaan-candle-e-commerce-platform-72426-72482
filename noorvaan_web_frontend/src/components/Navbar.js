import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import NoorvaanLogo from '../assets/noorvaan-logo.png';

export default function Navbar() {
  const { items } = useCart();
  const { theme, setTheme } = useTheme();
  const cartCount = items.reduce((n, it) => n + it.qty, 0);

  const cycleTheme = () => {
    setTheme(prev => (prev === 'auto' ? 'light' : prev === 'light' ? 'dark' : 'auto'));
  };

  return (
    <nav className="nv-navbar">
      <div className="nv-container nv-nav-inner">
        <Link to="/" className="nv-brand" aria-label="Noorvaan Home">
          <img
            src={NoorvaanLogo}
            alt="Noorvaan"
            className="nv-logo"
          />
        </Link>
        <div className="nv-links">
          <NavLink to="/catalog" className="nv-link">Shop</NavLink>
          <NavLink to="/about" className="nv-link">About</NavLink>
          <NavLink to="/contact" className="nv-link">Contact</NavLink>
          <button className="nv-cart-link" onClick={cycleTheme} aria-label="Toggle theme mode">
            {theme === 'auto' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}
          </button>
          <NavLink to="/cart" className="nv-cart-link" aria-label="Cart">
            🛒 <span>{cartCount}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
