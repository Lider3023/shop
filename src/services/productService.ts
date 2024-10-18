import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (limit = 12, skip = 0, sortBy = 'title', order = 'asc') => {
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};
