import { create } from 'zustand';

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  description: string;
}

interface CartState {
  products: CartProduct[];
  addToCart: (product: CartProduct) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  products: [],
  addToCart: (product) => set((state) => {
    const existingProduct = state.products.find((p) => p.id === product.id);
    if (existingProduct) {
      return {
        products: state.products.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
        ),
      };
    }
    return { products: [...state.products, { ...product }] };
  }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
      ),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  clearCart: () => set({ products: [] }),
}));
