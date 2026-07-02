import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Details } from "@/components/book/types";

export type CartItem = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  category: string;
};

interface CartState {
  cart: CartItem[];
  patientDetails: Details;
  
  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  setPatientDetails: (details: Details) => void;
  clearBooking: () => void;
}

const initialDetails: Details = {
  name: "",
  phone: "",
  email: "",
  date: "",
  slot: "",
  notes: "",
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      patientDetails: initialDetails,
      
      addToCart: (item) =>
        set((state) => {
          const exists = state.cart.some((t) => t.id === item.id);
          if (exists) return state; // Do nothing if already in cart
          return { cart: [...state.cart, item] };
        }),
        
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id)
        })),
        
      setPatientDetails: (details) =>
        set(() => ({ patientDetails: details })),
        
      clearBooking: () =>
        set(() => ({
          cart: [],
          patientDetails: initialDetails,
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);
