import axios from 'axios';

const api = axios.create({
  baseURL: 'https://enercheck.onrender.com', 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Log de requests para debug
api.interceptors.request.use(
  (config) => {
    console.log(' API Request:', config.method?.toUpperCase(), config.url);
    console.log(' Request Data:', config.data);
    return config;
  },
  (error) => {
    console.log(' Request Error:', error);
    return Promise.reject(error);
  }
);

// Log de responses para debug
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log( 'API Error:', error.response?.status, error.config?.url);
    console.log('Error Data:', error.response?.data);
    
    // Log completo para debug
    if (error.response?.status === 404) {
      console.log('404 - Endpoint não encontrado:', error.config?.url);
      console.log('Base URL:', error.config?.baseURL);
    }
    
    return Promise.reject(error);
  }
);

export default api;