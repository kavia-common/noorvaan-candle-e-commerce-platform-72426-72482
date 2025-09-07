import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext();

// Types
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const UPDATE = 'UPDATE';
const CLEAR = 'CLEAR';

function reducer(state, action) {
  switch (action.type) {
    case ADD: {
      const { sku, product, qty = 1, price } = action.payload;
      const idx = state.items.findIndex(i => i.sku === sku);
      const items = [...state.items];
      if (idx >= 0) {
        items[idx] = { ...items[idx], qty: items[idx].qty + qty };
      } else {
        items.push({ sku, product, qty, price });
      }
      return { ...state, items };
    }
    case REMOVE: {
      const items = state.items.filter(i => i.sku !== action.payload.sku);
      return { ...state, items };
    }
    case UPDATE: {
      const items = state.items.map(i => i.sku === action.payload.sku ? { ...i, qty: action.payload.qty } : i);
      return { ...state, items };
    }
    case CLEAR:
      return { items: [] };
    default:
      return state;
  }
}

const initial = { items: [] };

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial, (init) => {
    try {
      const saved = localStorage.getItem('noorvaan_cart');
      return saved ? JSON.parse(saved) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem('noorvaan_cart', JSON.stringify(state));
  }, [state]);

  const subtotal = useMemo(() => state.items.reduce((s, i) => s + i.price * i.qty, 0), [state.items]);

  const api = useMemo(() => ({
    items: state.items,
    subtotal,
    add: (payload) => dispatch({ type: ADD, payload }),
    remove: (sku) => dispatch({ type: REMOVE, payload: { sku } }),
    update: (sku, qty) => dispatch({ type: UPDATE, payload: { sku, qty } }),
    clear: () => dispatch({ type: CLEAR })
  }), [state.items, subtotal]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access shopping cart API: items, subtotal, add, remove, update, clear */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
