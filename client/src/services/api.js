// client/src/services/api.js
import axios from 'axios';



const API_URL = process.env.REACT_APP_API_URL || 'https://websitecasagloria.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
