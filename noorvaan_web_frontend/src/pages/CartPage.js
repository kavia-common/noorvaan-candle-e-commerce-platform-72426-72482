import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, updateQty, removeItem, totals } = useCart();

  if (!items.length) {
    return (
      <div className="nv-section">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/catalog" className="nv-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="nv-section">
      <h1>Your Cart</h1>
      <div className="nv-cart-list">
        {items.map(it => (
          <div key={it.id} className="nv-cart-item">
            <img className="nv-cart-thumb" src={it.image} alt={it.name} />
            <div>
              <div style={{fontWeight:600}}>{it.name}</div>
              <div style={{color:'var(--muted)'}}>${it.price} each</div>
              <div style={{display:'flex', gap:8, marginTop:8}}>
                <input
                  className="nv-input"
                  style={{width:90}}
                  type="number"
                  min={1}
                  value={it.qty}
                  onChange={e => updateQty(it.id, parseInt(e.target.value || '1', 10))}
                />
                <button className="nv-btn secondary" onClick={() => removeItem(it.id)}>Remove</button>
              </div>
            </div>
            <div style={{fontWeight:600}}>${(it.price * it.qty).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="nv-cart-summary">
        <div>
          <div>Subtotal</div>
          <div>Shipping</div>
          <div>Tax</div>
          <div style={{marginTop:8, fontWeight:700}}>Total</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div>${totals.subtotal.toFixed(2)}</div>
          <div>${totals.shipping.toFixed(2)}</div>
          <div>${totals.tax.toFixed(2)}</div>
          <div style={{marginTop:8, fontWeight:700}}>${totals.total.toFixed(2)}</div>
        </div>
      </div>

      <div style={{display:'flex', gap:12, marginTop:16}}>
        <Link to="/catalog" className="nv-btn secondary">Continue Shopping</Link>
        <Link to="/checkout" className="nv-btn">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
