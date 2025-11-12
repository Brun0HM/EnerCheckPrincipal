import axios from "axios";

// URL base da sua API
const BASE_URL = "https://192.168.1.114:7257/api";

// 1. Cria a instância do Axios com a URL base
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Função para buscar os perfis.
 * Faz a requisição e já retorna a lista filtrada (id, nome e email).
 */
const getUser = async () => {
  const response = await api.get("/Usuarios");
  const listaCompleta = response.data;

  // Mapeia a lista para retornar id, nome e email
  const listaSimples = listaCompleta.map((user) => ({
    id: user.id,
    nome: user.nomeCompleto,
    email: user.email,
  }));

  return listaSimples;
};

/**
 * Função para criar um novo usuário.
 */
const createUser = async (email, senha, nomeCompleto, numeroCrea, empresa) => {
  // O endpoint para registro pode ser diferente, ajuste se necessário
  return await api.post("/Usuarios", {
    email: email,
    senha: senha,
    nomeCompleto: nomeCompleto,
    numeroCrea: numeroCrea,
    empresa: empresa,
  });
};

/**
 * Função para deletar um usuário.
 */
const deleteUser = async (id) => {
  return await api.delete(`/Usuarios/${id}`);
};

// Exporta as funções que o componente usará
const apiService = {
  getUser,
  createUser,
  deleteUser,
};

export default apiService;
