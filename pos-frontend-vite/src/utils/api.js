import axios from 'axios';

// Derive backend base URL from env, with sensible fallback.
// Example: VITE_API_BASE_URL=http://localhost:5000/api -> base http://localhost:5000
const rawApiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const backendBaseUrl = rawApiBase.replace(/\/api\/?$/i, '');

const api = axios.create({
  baseURL: backendBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
