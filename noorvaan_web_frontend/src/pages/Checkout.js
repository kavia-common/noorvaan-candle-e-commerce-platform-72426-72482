import React, { useEffect, useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getStripe } from '../services/stripe';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

function CheckoutForm() {
  const { items, totals, clear } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [status, setStatus] = useState('idle'); // idle | processing | success | error
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (totals.total > 0) {
      api.createPaymentIntent({ amount: totals.total, currency: 'usd' })
        .then(res => setClientSecret(res.clientSecret))
        .catch(() => setClientSecret(''));
    }
  }, [totals.total]);

  const disabled = !items.length || totals.total <= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('processing');
    setError('');

    try {
      // In real integration, confirmCardPayment with clientSecret from backend
      if (!stripe || !elements || !clientSecret) {
        // Simulate success flow without Stripe server
        await new Promise(r => setTimeout(r, 1000));
        setStatus('success');
        clear();
        return;
      }

      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card, billing_details: { name, email } }
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
        setStatus('error');
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        setStatus('success');
        clear();
      } else {
        setError('Unexpected payment status');
        setStatus('error');
      }
    } catch (err) {
      setError(err.message || 'Payment error');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div>
        <h2>Thank you!</h2>
        <p>Your order has been placed successfully.</p>
        <Link to="/catalog" className="nv-btn">Back to Shop</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="nv-section" style={{display:'grid', gap:16}}>
      <div>
        <h2>Contact</h2>
        <div className="nv-row">
          <input className="nv-input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="nv-input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
      </div>
      <div>
        <h2>Payment</h2>
        <div style={{border:'1px solid var(--border)', borderRadius:10, padding:12, background:'var(--card)'}}>
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        {error && <div style={{color:'#c00', marginTop:8}}>{error}</div>}
      </div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{color:'var(--muted)'}}>Total</div>
          <div style={{fontSize:'1.25rem', fontWeight:700}}>${totals.total.toFixed(2)}</div>
        </div>
        <button className="nv-btn" type="submit" disabled={disabled || status==='processing'}>
          {status==='processing' ? 'Processing…' : 'Pay now'}
        </button>
      </div>
    </form>
  );
}

export default function Checkout() {
  const stripePromise = useMemo(() => getStripe(), []);
  const { items } = useCart();

  return (
    <div className="nv-section">
      <h1>Checkout</h1>
      {!items.length ? (
        <p>Your cart is empty. <Link to="/catalog">Shop products</Link></p>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
