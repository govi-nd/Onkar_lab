"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  category: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);
const CART_STORAGE_KEY = "cart";
const CART_CHANGE_EVENT = "cartchange";

function getCartSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
}

function subscribeToCartChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

function parseCart(snapshot: string): CartItem[] {
  try {
    const parsed = JSON.parse(snapshot);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CartItem =>
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.price === "number"
    );
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCartChanges,
    getCartSnapshot,
    () => "[]"
  );
  const cart = useMemo(
    () => parseCart(cartSnapshot),
    [cartSnapshot]
  );

  function addToCart(item: CartItem) {
    const currentCart = parseCart(getCartSnapshot());
    const alreadyExists = currentCart.some(
      (test) => test.id === item.id
    );

    if (alreadyExists) {
      return;
    }

    saveCart([...currentCart, item]);
  }

  function removeFromCart(id: string) {
    const currentCart = parseCart(getCartSnapshot());
    saveCart(currentCart.filter((item) => item.id !== id));
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
