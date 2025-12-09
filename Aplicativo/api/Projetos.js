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

// Criar um novo projeto
const postProjetos = async (nome, descricao) => {
  try {
    console.log('Criando novo projeto...');
    const response = await api.post('/api/Projetos', { nome, descricao });
    console.log('Projeto criado:', response.data);
    return response.data; // Retorna os dados do projeto criado
  } catch (error) {
    console.error('Erro ao criar projeto:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Analisar um projeto
const postProjetoAnalisar = async (id, formData) => {
  try {
    console.log(`Analisando projeto com ID ${id}...`);
    const response = await api.post(`/api/Projetos/projeto/${id}/analisar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Análise concluída:', response.data);
    return response.data; // Retorna os dados da análise
  } catch (error) {
    console.error('Erro ao analisar projeto:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Exportar funções
export const projetosAPI = {
  getMeusProjetos,
  postProjetos,
  postProjetoAnalisar,
};

export default projetosAPI;