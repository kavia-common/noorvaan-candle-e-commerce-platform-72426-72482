import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PLPPage from './pages/PLPPage';
import PDPPage from './pages/PDPPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import ContactFaqPage from './pages/ContactFaqPage';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './pages/CheckoutPage';
import { useCart } from './providers/CartContext';
import PromoBar from './components/PromoBar';

// PUBLIC_INTERFACE
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { items } = useCart();

  return (
    <>
      <PromoBar />
      <Header onOpenCart={() => setDrawerOpen(true)} cartCount={items.reduce((s,i)=>s+i.qty,0)} />
      <main className="container" style={{paddingTop: 24}}>
        <Routes>
          <Route path="/" element={<HomePage onOpenCart={() => setDrawerOpen(true)} />} />
          <Route path="/shop" element={<PLPPage />} />
          <Route path="/product/:slug" element={<PDPPage onOpenCart={() => setDrawerOpen(true)} />} />
          <Route path="/collections/:slug" element={<CollectionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactFaqPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} />
    </>
  );
}
