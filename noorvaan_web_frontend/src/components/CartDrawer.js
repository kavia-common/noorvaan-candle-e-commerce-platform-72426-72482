import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../providers/CartContext';
import { useContent } from '../providers/ContentContext';

// PUBLIC_INTERFACE
export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, update, remove, clear } = useCart();
  const { site } = useContent();
  const threshold = site?.announcement?.threshold || 0;
  const remaining = Math.max(0, threshold - subtotal);

  return (
    <div style={{
      position:'fixed', inset:0, pointerEvents: open ? 'auto' : 'none', zIndex: 60
    }}>
      <div onClick={onClose} style={{
        position:'absolute', inset:0, background:'rgba(0,0,0,.4)', opacity: open ? 1 : 0, transition:'opacity .2s'
      }} />
      <aside className="card" style={{
        position:'absolute', right:0, top:0, bottom:0, width:'min(420px, 90vw)', transform:`translateX(${open? '0':'100%'})`,
        transition:'transform .25s ease', display:'flex', flexDirection:'column'
      }}>
        <div style={{padding:14, display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--border)'}}>
          <div style={{fontWeight:700}}>Your Cart</div>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        <div style={{padding:14, overflow:'auto', flex:1, display:'grid', gap:10}}>
          {items.length === 0 && <div style={{color:'var(--muted)'}}>Your cart is empty.</div>}
          {items.map(item => {
            // Generate a stable, unique id per item for label/input association
            const qtyId = `qty-${item.sku}`;
            const lineTotal = (item.price * item.qty).toFixed(2);
            return (
              <div key={item.sku} className="card" style={{padding:10}}>
                <div style={{display:'flex', gap:10}}>
                  <img src={item.product.images?.[0] || `https://placehold.co/100x100`} alt={item.product.name} width={80} height={80} style={{objectFit:'cover', borderRadius:8}} />
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600}}>{item.product.name}</div>
                    <div className="badge">{item.product.size_display}</div>
                    <div style={{display:'flex', alignItems:'center', gap:8, marginTop:6}}>
                      <label htmlFor={qtyId}>Qty</label>
                      <input
                        id={qtyId}
                        className="input"
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e)=>update(item.sku, Math.max(1, Number(e.target.value)))}
                        style={{width:80}}
                      />
                      <div
                        style={{marginLeft:'auto', fontWeight:600}}
                        aria-label={`line total $${lineTotal}`}
                      >
                        ${lineTotal}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{marginTop:8}}>
                  <button className="btn" onClick={()=>remove(item.sku)} aria-label="Remove">Remove</button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:14, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>Subtotal</div>
            <div style={{fontWeight:700}} aria-label={`subtotal $${subtotal.toFixed(2)}`}>${subtotal.toFixed(2)}</div>
          </div>
          {remaining > 0 ? (
            <div style={{marginTop:6, color:'var(--muted)'}}>Add ${remaining.toFixed(2)} for free shipping</div>
          ) : threshold > 0 ? (
            <div style={{marginTop:6, color:'var(--success)'}}>You’ve unlocked free shipping!</div>
          ) : null}
          <div style={{display:'flex', gap:10, marginTop:12}}>
            <button className="btn" onClick={clear}>Clear</button>
            <Link to="/checkout" className="btn btn-primary" onClick={onClose} style={{flex:1, textAlign:'center'}}>Checkout</Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
