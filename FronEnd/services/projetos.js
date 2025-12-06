import api from "./api.js";

// Funções para os projetos

// Busca os projetos na Database
const getProjetos = async () => {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }
  const response = await api.get("/api/Projetos");
  try {
    return response.data;
  } catch (error) {
    console.error("Erro ao obter projetos:", error);
    throw error;
  }
};

// Cria um novo projeto na Database
const postProjetos = async (nome, descricao) => {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }
  try {
    return await api.post("/api/Projetos", {
      nome: nome,
      descricao: descricao,
    });
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    throw error;
  }
};

// Atualiza um projeto existente na Database
const putProjetos = async (id, data) => {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }
  try {
    return await api.put(`/api/Projetos/${id}`, data);
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    throw error;
  }
};
// Deleta um projeto da Database
const deleteProjetos = async (id) => {
  try {
    return await api.delete(`/api/Projetos/${id}`);
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw error;
  }
};
// Envia um projeto para análise do Gemini
const postProjetoAnalisar = async (id, data) => {
  try {
    return await api.post(`/api/Projetos/projeto/${id}/analisar`, data);
  } catch (error) {
    console.error("Erro ao analisar projeto:", error);
    throw error;
  }
};

//Exportando as funções de projetos
const projetosService = {
  getProjetos,
  postProjetos,
  putProjetos,
  deleteProjetos,
  postProjetoAnalisar,
};
export default projetosService;
