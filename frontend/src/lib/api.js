import axios from 'axios';
import { API_URL } from '../constants';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (useful for auth token injections later)
apiClient.interceptors.request.use(
  (config) => {
    // Modify config here if needed (e.g. inject authorization headers)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (useful for standardized error handling)
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
