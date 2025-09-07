import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

/** Cart item shape: { id, name, price, qty, image, variant? } */
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('nv_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nv_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (id, qty) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p));
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const shipping = subtotal > 0 ? 8 : 0;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + shipping + tax).toFixed(2);
    return { subtotal, shipping, tax, total };
  }, [items]);

  const value = { items, addItem, updateQty, removeItem, clear, totals };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Provides cart items and operations: addItem, updateQty, removeItem, clear, totals */
  return useContext(CartContext);
}
