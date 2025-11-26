import api from "../services/api";

export const planosAPI = {
    getAllPlans: async (token) => {
        try {
          const response = await api.get('/api/Planos', {
            headers: { Authorization: `Bearer ${token}` }
          });
          return response.data;
        } catch (error) {
          console.error('Erro ao buscar planos:', error);
          throw error.response?.data || error;
        }
      },
      getPlansById: async (token, id) => {
        try {
            const response = await api.get(`/api/Usuarios/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
          console.error('Erro ao buscar plano:', error);
          throw error.response?.data || error;
        }
      },
}