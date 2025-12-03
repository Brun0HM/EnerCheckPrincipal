import api from '../services/api';

// Função simples de login
const login = async (email, senha) => {
  try {
    console.log('Fazendo login:', email);
    
    const response = await api.post('/Usuario/login', {
      email: email,
      password: senha
    });
    
    console.log('Login bem-sucedido:', response.data);
    
    // Configurar token nos headers se disponível
    const token = response.data?.accessToken;
    if (token && token !== 'cookie-auth') {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return{
      token: token, 
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      expiresIn: response.data.expiresIn,
      tokenType: response.data.tokenType,
      user: response.data.user || null
    };
    
  } catch (error) {
    console.error('Erro no login:', error?.response?.data || error);
    throw error;
  }
};

// Configurar token nos headers
const setAuthToken = (token) => {
  if (token && token !== 'cookie-auth') {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Token configurado');
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('Token removido');
  }
};

// Exportar funções
const authAPI = {
  login,
  setAuthToken,
};

export { authAPI };
export default authAPI;