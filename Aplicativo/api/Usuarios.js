import api from "../services/api";

const createCliente = async (userData) => {
  try {
    console.log('Criando cliente:', userData.email);
    
    const response = await api.post('/api/Usuarios/Cliente', userData);
    
    console.log('Cliente criado:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao criar cliente:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Vincular plano ao usuário
const vincularPlano = async (planoId) => {
  try {
    console.log('Vinculando plano:', planoId);
    
    const response = await api.put('/api/Usuarios/usuario/add/plano', planoId);
    
    console.log('Plano vinculado:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao vincular plano:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Exportar funções
export const usuariosAPI = {
  createCliente,
  vincularPlano,
};

export default usuariosAPI;