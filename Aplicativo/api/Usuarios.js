import api from "../services/api";

// API de Usuários baseada no Swagger
export const usuariosAPI = {
  // GET /api/Usuario - Buscar todos os usuários
  getAllUsers: async (token) => {
    try {
      const response = await api.get('/api/Usuario', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar usuários:', error);
      throw error.response?.data || error;
    }
  },

  // GET /api/Usuario/{id} - Buscar usuário por ID
  getUserById: async (id, token) => {
    try {
      const response = await api.get(`/api/Usuario/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar usuário ${id}:`, error);
      throw error.response?.data || error;
    }
  },

  // POST /api/Usuario - Criar novo usuário
  createUser: async (userData, token) => {
    try {
      const response = await api.post('/api/Usuario', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error);
      throw error.response?.data || error;
    }
  },

  // PUT /api/Usuario/{id} - Atualizar usuário
  updateUser: async (id, userData, token) => {
    try {
      const response = await api.put(`/api/Usuario/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao atualizar usuário ${id}:`, error);
      throw error.response?.data || error;
    }
  },

  // DELETE /api/Usuario/{id} - Deletar usuário
  deleteUser: async (id, token) => {
    try {
      const response = await api.delete(`/api/Usuario/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao deletar usuário ${id}:`, error);
      throw error.response?.data || error;
    }
  },
};

export default usuariosAPI;