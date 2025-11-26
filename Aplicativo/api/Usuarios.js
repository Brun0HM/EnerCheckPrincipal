import api from "../services/api";

// API de Usuários baseada na Controller real
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
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error.response?.data || error;
    }
  },

  // GET /api/Usuarios/me - Buscar dados do usuário logado
  getCurrentUser: async (token) => {
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

  // POST /api/Usuarios/Cliente - Criar novo usuário como Cliente
  createCliente: async (userData) => {
    try {
      const response = await api.post('/api/Usuarios/Cliente', {
        email: userData.email,
        senha: userData.senha,
        nomeCompleto: userData.nomeCompleto,
        numeroCrea: userData.numeroCrea || "",
        empresa: userData.empresa || "",
        userReq: userData.userReq || 0
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error.response?.data || error;
    }
  },


  // PUT /api/Usuarios/usuario/add/plano - Vincular plano ao usuário logado
  vincularPlano: async (planoId, token) => {
    try {
      const response = await api.put('/api/Usuarios/usuario/add/plano', planoId, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao vincular plano:', error);
      throw error.response?.data || error;
    }
  },
}

export default usuariosAPI;