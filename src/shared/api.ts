import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor for bypass
api.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer admin_bypass_token';
  return config;
});
