import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';

// PUBLIC_INTERFACE
function App() {
  /** Main application component configuring routing, providers, and layout.
   * Routes:
   * - /           -> Home (hero + featured products)
   * - /catalog    -> Product grid
   * - /product/:id-> Product detail
   * - /cart       -> Shopping cart
   * - /checkout   -> Checkout with Stripe (stub/simulated)
   * - /about      -> Brand storytelling
   * - /contact    -> Contact & newsletter form
   */
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
