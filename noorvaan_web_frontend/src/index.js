import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { CartProvider } from './providers/CartContext';
import { ContentProvider } from './providers/ContentContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePk = process.env.REACT_APP_REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(stripePk);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <ContentProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </ContentProvider>
    </Elements>
  </React.StrictMode>
);
