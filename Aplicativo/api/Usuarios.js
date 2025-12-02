import api from "../services/api";

export const usuariosAPI = {
  // GET /api/Usuarios - Buscar todos os usuários (somente Admin)
  getAllUsers: async (token) => {
    try {
      const response = await api.get('/api/Usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error.response?.data || error;
    }
  },

  // GET /api/Usuarios/{id} - Buscar usuário por ID
  getUserById: async (id, token) => {
    try {
      const response = await api.get(`/api/Usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(` Erro ao buscar usuário ${id}:`, error);
      throw error.response?.data || error;
    }
  },

  // POST /api/Usuarios/Cliente - Criar novo usuário como Cliente (CORRETO)
  createCliente: async (userData) => {
    try {
      console.log('Enviando dados para /api/Usuarios/Cliente:', userData);
      
      // Mapear dados conforme RegisterDto esperado pela API
      const registerData = {
        email: userData.email,
        senha: userData.senha,
        nomeCompleto: userData.nomeCompleto,
        numeroCrea: userData.numeroCrea,
        empresa: userData.empresa || "",
        userReq: userData.userReq || 0
      };
      
      console.log('Dados formatados para API:', registerData);
      
      const response = await api.post('/api/Usuarios/Cliente', registerData);
      
      console.log('Resposta da API:', response.status, response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('Config URL:', error.config?.url);
      throw error.response?.data || error;
    }
  },

  // PUT /api/Usuarios/usuario/add/plano - Vincular plano ao usuário logado
  vincularPlano: async (planoId, token) => {
    try {
      console.log('Vinculando plano:', planoId);
      
      const response = await api.put('/api/Usuarios/usuario/add/plano', planoId, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Plano vinculado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao vincular plano:', error);
      throw error.response?.data || error;
    }
  },

  // GET /api/Usuarios/me - Buscar usuário logado
  getMe: async (token) => {
    try {
      const response = await api.get('/api/Usuarios/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário logado:', error);
      throw error.response?.data || error;
    }
  },
}

export default usuariosAPI;