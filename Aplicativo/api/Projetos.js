import api from "../services/api";

// Buscar todos os projetos do usuário logado
const getMeusProjetos = async () => {
  try {
    console.log('Carregando projetos do usuário logado...');
    const response = await api.get('/api/Projetos/me');
    console.log('Projetos carregados:', response.data);
    return response.data; // Retorna a lista de projetos
  } catch (error) {
    console.error('Erro ao carregar projetos do usuário:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Exportar funções
export const projetosAPI = {
  getMeusProjetos,
};

export default projetosAPI;