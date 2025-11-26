import api from "../services/api";

export const authAPI = {
  // POST /api/Auth/login - Login usando IdentityUser
  login: async (credentials) => {
    try {
      const response = await api.post('/api/Auth/login', {
        email: credentials.email,
        senha: credentials.senha,
      });
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error.response?.data || error;
    }
  },

  // POST /api/Auth/logout
  logout: async (token) => {
    try {
      const response = await api.post('/api/Auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error.response?.data || error;
    }
  },
};

export default authAPI;