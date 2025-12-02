export const authAPI = {
  login: async (credentials) => {
    try {
      console.log(' Iniciando login...');
      console.log(' Email:', credentials.email);
      
      const loginData = {
        email: credentials.email?.trim(),
        password: credentials.password || credentials.senha,
        twoFactorCode: "",
        twoFactorRecoveryCode: ""
      };
      
      const response = await api.post('/Usuario/login?useCookies=true&useSessionCookies=false', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Login realizado com sucesso!');
      console.log(' Status:', response.status);
      
     
      let jwtToken = null;
      const authHeader = response.headers['authorization'] || response.headers['Authorization'];
      if (authHeader && authHeader !== 'AspNetCore.Identity.Application') {
        jwtToken = authHeader.replace('Bearer ', '').replace('bearer ', '');
        console.log('JWT Token encontrado');
      }
      
      // Para Identity, a resposta pode estar vazia (usa cookies)
      let userData = response.data;
      

      
      const setCookieHeader = response.headers['set-cookie'];
      
      if (jwtToken) {
        console.log('Autenticação JWT configurada');
        api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        
        return {
          success: true,
          token: jwtToken,
          user: userData,
          authMethod: 'jwt',
          headers: response.headers,
          cookies: setCookieHeader
        };
      } else {
        console.log('Autenticação por cookies configurada (Identity padrão)');
        
        return {
          success: true,
          token: 'cookie-auth', 
          user: userData,
          authMethod: 'cookies',
          headers: response.headers,
          cookies: setCookieHeader
        };
      }
      
    } catch (error) {
      console.error('Erro no login:', error.response?.status, error.response?.data);
      throw {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status
      };
    }
  },



  testToken: async (token) => {
    try {
      console.log('Testando autenticação...');
      

      const response = await api.get('/api/Planos');
      
      console.log('✅ Autenticação válida!');
      return { valid: true, data: response.data };
      
    } catch (error) {
      console.warn('⚠️ Falha na autenticação:', error.response?.status);
      return { valid: false, error: error.response?.data };
    }
  },

  setAuthToken: (token) => {
    if (token && token !== 'AspNetCore.Identity.Application' && token !== 'cookie-auth') {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('🔧 JWT Token configurado para requisições');
    } else {
      // Para cookies, não precisa configurar header
      delete api.defaults.headers.common['Authorization'];
      console.log('🔧 Usando autenticação por cookies');
    }
  },
};

export default authAPI;