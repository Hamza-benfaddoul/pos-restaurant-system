import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Categories
export const getCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);

// Products
export const getProducts = (categoryId) => {
  const params = categoryId ? { categoryId } : {};
  return api.get('/products', { params });
};
export const createProduct = (data) => api.post('/products', data);

// Orders
export const getOrders = (status) => {
  const params = status ? { status } : {};
  return api.get('/orders', { params });
};
export const createOrder = (data) => api.post('/orders', data);
export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status });
export const getTodaysSales = () => api.get('/orders/today/sales');

export default api;
