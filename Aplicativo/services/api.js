import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://enercheck.onrender.com', 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});


// REQUEST INTERCEPTOR - Adiciona token automaticamente em todas as requisições

api.interceptors.request.use(
  async (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    
    // Buscar token do AsyncStorage e adicionar no header automaticamente
    try {
      const token = await AsyncStorage.getItem('Token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Token adicionado automaticamente');
      }
    } catch (error) {
      console.warn('Erro ao buscar token:', error);
    }
    
    return config;
  },
  (error) => {
    console.log('Request Error:', error);
    return Promise.reject(error);
  }
);


// RESPONSE INTERCEPTOR - Trata erros e renova token automaticamente

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
 console.log('API Error:', error.response?.status, error.config?.url);
    
    // Log de erro 404
    if (error.response?.status === 404) {
      console.log('404 - Endpoint não encontrado:', error.config?.url);
      console.log('Base URL:', error.config?.baseURL);
    }

      // URLs que NÃO devem tentar renovar token (endpoints de autenticação)
    const authEndpoints = [
      '/Usuario/login',
      '/Usuario/refresh',
      '/api/Usuarios/Cliente',
      '/Usuario/register'
    ];
    
        const isAuthEndpoint = authEndpoints.some(endpoint => 
      originalRequest.url?.includes(endpoint)
    );

    // RENOVAÇÃO AUTOMÁTICA DE TOKEN - Se receber 401 (não autorizado)
   
    if (error.response?.status === 401 && !originalRequest._retry &&  !isAuthEndpoint) {
      originalRequest._retry = true; // Previne loop infinito
      
      try {
        console.log('🔄 Token expirado. Tentando renovar...');
        
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          console.error('Refresh token não encontrado');
          throw new Error('Refresh token não disponível');
        }
        
        // Tentar renovar o token
        const response = await axios.post(
          'https://enercheck.onrender.com/Usuario/refresh',
          { refreshToken: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }
        );
        
        const novoToken = response.data.accessToken;
        
        // Salvar novo token
        await AsyncStorage.setItem('Token', novoToken);
        if (response.data.refreshToken) {
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        }
        
        console.log('Token renovado com sucesso!');
        
        // Atualizar header da requisição original com o novo token
        originalRequest.headers['Authorization'] = `Bearer ${novoToken}`;
        
        // Reexecutar a requisição original com o novo token
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error('Falha ao renovar token:', refreshError);
        
        // Limpar dados de autenticação
        try {
          await AsyncStorage.removeItem('Token');
          await AsyncStorage.removeItem('refreshToken');
          await AsyncStorage.removeItem('userData');
          console.log('🧹 Dados de autenticação limpos');
        } catch (clearError) {
          console.error('⚠️ Erro ao limpar AsyncStorage:', clearError);
        }
        
        // Lançar erro para que a aplicação possa redirecionar para login
        return Promise.reject(refreshError);
      }
    }
     if (error.response?.status === 401 && isAuthEndpoint) {
      console.log('Erro de autenticação em endpoint de login/registro');
    }
    
    return Promise.reject(error);
  }
);

export default api;