"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Rehydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecom_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  // Persist whenever items change
  useEffect(() => {
    localStorage.setItem("ecom_cart", JSON.stringify(items));
  }, [items]);

  function addItem(product) {
    setItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev; // already in cart
      return [...prev, { ...product, qty: product.minOrderQty || 1, note: "" }];
    });
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateQty(id, qty) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  function updateNote(id, note) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, note } : i));
  }

  function clearCart() { setItems([]); }

  return (
    <CartContext.Provider value={{ items, count: items.length, addItem, removeItem, updateQty, updateNote, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
