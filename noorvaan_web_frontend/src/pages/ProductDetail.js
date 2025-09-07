import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.getProduct(id).then(setProduct).catch(() => setProduct(null));
  }, [id]);

  if (!product) return <div className="nv-section">Loading...</div>;

  return (
    <div className="nv-section nv-product">
      <div className="nv-gallery">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="nv-detail">
        <div className="nv-kicker">Candle</div>
        <h1>{product.name}</h1>
        <div className="nv-price" style={{marginBottom: 8}}>${product.price}</div>
        <p>{product.description}</p>
        <div style={{marginTop:12}}>
          <div className="nv-badge">{product.size}</div>
        </div>
        {product.notes?.length ? (
          <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
            {product.notes.map(n => <span key={n} className="nv-badge">{n}</span>)}
          </div>
        ) : null}
        <div style={{display:'flex', alignItems:'center', gap:10, marginTop:16}}>
          <input
            className="nv-input"
            style={{width:100}}
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(parseInt(e.target.value || '1', 10))}
          />
          <button
            className="nv-btn"
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, qty)}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="nv-btn secondary">View Cart</Link>
        </div>
      </div>
    </div>
  );
}
