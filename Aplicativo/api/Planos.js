import api from "../services/api";

const getAllPlanos = async () => {
  try {
    console.log('Buscando todos os planos...');
    
    const response = await api.get('/api/Planos');
    
    console.log('Planos carregados:', response.data?.length || 0);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao buscar planos:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Buscar plano por ID
const getPlanoById = async (token, planoId) => {
  try {
    console.log('Buscando plano ID:', planoId);
    
    const response = await api.get(`/api/Planos/${planoId}`);
    
    console.log(' Plano encontrado:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao buscar plano:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Atualizar plano
const updatePlano = async (planoId, planoData) => {
  try {
    console.log(' Atualizando plano:', planoId);
    
    const response = await api.put(`/api/Planos/${planoId}`, planoData);
    
    console.log(' Plano atualizado:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao atualizar plano:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Incrementar usuários do plano
// const incrementarUsuarios = async (planoId) => {
//   try {
//     console.log('Incrementando usuários do plano:', planoId);
    
//     // Buscar plano atual
//     const planoAtual = await getPlanoById(null, planoId);
    
//     // Incrementar quantidade de usuários
//     const planoAtualizado = {
//       ...planoAtual,
//       quantidadeUsers: (planoAtual.quantidadeUsers || 0) + 1
//     };
    
//     // Atualizar plano
//     const resultado = await updatePlano(planoId, planoAtualizado);
    
//     console.log('Usuários incrementados:', resultado);
//     return resultado;
    
//   } catch (error) {
//     console.error('Erro ao incrementar usuários:', error);
//     throw error;
//   }
// };

// Exportar funções
export const planosAPI = {
  getAllPlanos,
  getPlanoById,
  updatePlano,
  // incrementarUsuarios,
};

export default planosAPI;