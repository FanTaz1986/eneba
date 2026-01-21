import axios from 'axios';

// Configure your API base URL here
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

console.log('📡 API Base URL:', API_BASE_URL);
console.log('🔗 Full endpoint will be:', API_BASE_URL + '/api/list');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: () => apiClient.get('/api/products'),
  getById: (id) => apiClient.get(`/api/products/${id}`),
  search: (query) => apiClient.get('/api/products/search', { params: { q: query } }),
  getByCategory: (category) => apiClient.get(`/api/products/category/${category}`),
};

// List API (new endpoints with fuzzy search support)
export const listAPI = {
  getAll: () => apiClient.get('/api/list'),
  search: (query) => apiClient.get('/api/list', { params: { search: query } }),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => apiClient.post('/api/orders', orderData),
  getById: (id) => apiClient.get(`/api/orders/${id}`),
  getAll: () => apiClient.get('/api/orders'),
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (amount) => apiClient.post('/api/payment/create-intent', { amount }),
  confirmPayment: (paymentData) => apiClient.post('/api/payment/confirm', paymentData),
};

// Auth API (if needed)
export const authAPI = {
  login: (credentials) => apiClient.post('/api/auth/login', credentials),
  register: (userData) => apiClient.post('/api/auth/register', userData),
  logout: () => apiClient.post('/api/auth/logout'),
};

export default apiClient;
