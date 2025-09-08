import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCart } from '../providers/CartContext';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const taxes = Math.round(subtotal * 0.08 * 100) / 100;
  const shipping = subtotal >= 85 ? 0 : (subtotal > 0 ? 7.95 : 0);
  const total = subtotal + taxes + shipping;

  async function handlePay(e) {
    e.preventDefault();
    setError('');
    if (!stripe || !elements) return;
    setProcessing(true);

    try {
      // Normally, create PaymentIntent on server and confirm here. This demo simulates success.
      // const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement), billing_details: { email } }});
      await new Promise(res=>setTimeout(res, 1000));
      // Simulate success:
      clear();
      navigate('/');
      alert('Payment successful! Thank you for your order.');
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 0.9fr', gap:20}}>
      <section className="card" style={{padding:16}}>
        <h1>Checkout</h1>
        <form onSubmit={handlePay}>
          <div style={{display:'grid', gap:12}}>
            <label>Email
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" />
            </label>
            <label>Card Details</label>
            <div className="card" style={{padding:12}}>
              <CardElement options={{ style: { base: { fontSize: '16px' }}}} />
            </div>
            {error && <div style={{color:'var(--danger)'}}>{error}</div>}
            <button className="btn btn-primary" type="submit" disabled={!stripe || processing || items.length===0}>
              {processing ? 'Processing…' : `Pay $${total.toFixed(2)}`}
            </button>
            <div style={{color:'var(--muted)'}}>By placing your order, you agree to Noorvaan’s terms.</div>
          </div>
        </form>
      </section>
      <aside className="card" style={{padding:16, alignSelf:'start'}}>
        <h3>Order Summary</h3>
        <div style={{display:'grid', gap:10, marginTop:8}}>
          {items.length === 0 ? <div style={{color:'var(--muted)'}}>Your cart is empty. <Link to="/shop">Continue shopping</Link></div> : null}
          {items.map(i => (
            <div key={i.sku} style={{display:'flex', gap:8}}>
              <div className="badge">{i.qty}×</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{i.product.name}</div>
                <div style={{color:'var(--muted)'}}>{i.product.size_display}</div>
              </div>
              <div style={{fontWeight:600}}>${(i.qty * i.price).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="hr" />
        <div style={{display:'grid', gap:8}}>
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Taxes (8%)" value={`$${taxes.toFixed(2)}`} />
          <Row label="Shipping" value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`} />
          <div className="hr" />
          <Row label="Total" value={`$${total.toFixed(2)}`} bold />
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <div style={{fontWeight: bold ? 700 : 500}}>{label}</div>
      <div style={{fontWeight: bold ? 700 : 600}}>{value}</div>
    </div>
  );
}
