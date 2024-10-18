import { create } from 'zustand';
import { fetchProducts as fetchProductsAPI } from '../services/productService';

export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  stock: number;
}

interface StoreState {
  products: Product[];
  totalPages: number;
  currentPage: number;
  sortBy: string;
  order: string;
  fetchProducts: (page: number, sortBy: string, order: string) => Promise<void>;
  setSorting: (sortBy: string, order: string) => void;
}

const useStore = create<StoreState>((set) => ({
  products: [],
  totalPages: 0,
  currentPage: 1,
  sortBy: 'title',
  order: 'asc',

  fetchProducts: async (page = 1, sortBy = 'title', order = 'asc') => {
    try {
      const limit = 12;
      const skip = (page - 1) * limit;
      const data = await fetchProductsAPI(limit, skip, sortBy, order);
      set({
        products: data.products,
        totalPages: Math.ceil(100 / limit),
        currentPage: page,
      });
    } catch (error) {
      console.error('Error in store while fetching products:', error);
    }
  },

  setSorting: (sortBy: string, order: string) => {
    set({ sortBy, order });
  },
}));

export default useStore;
