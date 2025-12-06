import api from "./api.js";


const putPlanos = async (planoId, config = {}) => {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }
  const url = "/api/Usuarios/usuario/add/plano";
  try {
    const response = await api.put(url, planoId, {
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao inserir plano:", error);
    throw error;
  }
};


// Exportando as funções de planos
const planosService = {
  putPlanos,
};
export default planosService;