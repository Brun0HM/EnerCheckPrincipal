import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const token = response.data?.accessToken || response.data?.token || response.data;
    if (token && token !== 'cookie-auth') {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Salvar tokens no AsyncStorage
      try {
        await AsyncStorage.setItem('Token', token);
        if (response.data?.refreshToken) {
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        }
      } catch (storageError) {
        console.warn('Erro ao salvar tokens no AsyncStorage:', storageError);
      }
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
    if (error.response) {
      console.error('Status:', error.response.status, 'Dados:', error.response.data);
    } else if (error.request) {
      console.error('Requisição feita mas sem resposta:', error.request);
    } else {
      console.error('Erro ao configurar requisição:', error.message);
    }
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

// Função para renovar o token usando refresh token
const refreshToken = async () => {
  try {
    const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
    
    if (!storedRefreshToken) {
      throw new Error('Refresh token não encontrado');
    }
    
    console.log('Renovando token...');
    
    const response = await api.post('/Usuario/refresh', {
      refreshToken: storedRefreshToken
    });
    
    const novoToken = response.data.accessToken;
    
    // Atualizar tokens no AsyncStorage
    await AsyncStorage.setItem('Token', novoToken);
    if (response.data.refreshToken) {
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    // Atualizar header da API
    api.defaults.headers.common['Authorization'] = `Bearer ${novoToken}`;
    
    console.log('Token renovado com sucesso');
    return novoToken;
    
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    // Limpar storage em caso de falha
    await AsyncStorage.clear();
    throw error;
  }
};

// Função de logout
const logout = async () => {
  try {
    console.log('Fazendo logout...');
    
    // Limpar tokens do AsyncStorage
    await AsyncStorage.removeItem('Token');
    await AsyncStorage.removeItem('refreshToken');
    
    // Remover header de autorização
    delete api.defaults.headers.common['Authorization'];
    
    console.log('Logout realizado com sucesso');
    
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

// Carregar token do AsyncStorage ao iniciar
const loadToken = async () => {
  try {
    const token = await AsyncStorage.getItem('Token');
    if (token) {
      setAuthToken(token);
      console.log('Token carregado do AsyncStorage');
      return token;
    }
    return null;
  } catch (error) {
    console.error('Erro ao carregar token:', error);
    return null;
  }
};

// Função para alterar senha (Identity ASP.NET)
const changePassword = async (emailAtual, senhaAtual, novaSenha) => {
  try {
    console.log('Alterando senha do usuário...');
    

    const response = await api.post('/Usuario/manage/info', {
       newEmail: emailAtual,    
      oldPassword: senhaAtual,     
      newPassword: novaSenha 
    });
    
    console.log('Senha alterada com sucesso:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao alterar senha:', error?.response?.data || error);
    
    if (error.response) {
      console.error('Status:', error.response.status, 'Dados:', error.response.data);
    }
    
    throw error;
  }
};

// Exportar funções
const authAPI = {
  login,
  setAuthToken,
  refreshToken,
  logout,
  loadToken,
   changePassword,
};

export { authAPI };
export default authAPI;