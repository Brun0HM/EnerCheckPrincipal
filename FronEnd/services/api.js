import axios from "axios";

// URL base da sua API
const BASE_URL = "https://enercheck.onrender.com";

// 1. Cria a instância do Axios com a URL base
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 90000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Padronizado para minúsculo
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await api.post("/Usuario/refresh", {
          refreshToken: refreshToken,
        });

        const novoToken = response.data.accessToken;
        localStorage.setItem("token", novoToken); // Padronizado para minúsculo
        originalRequest.headers["Authorization"] = `Bearer ${novoToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("O refresh token falhou: ", refreshError);
        localStorage.clear();
        window.location.href = "/";
      }
    }
  }
);

// 1. Usuarios --------------------------------------------------------------------------------
/**
 * Função para buscar os perfis.
 * Faz a requisição e já retorna a lista filtrada (id, nome e email).
 */
const getUser = async () => {
  const response = await api.get("/api/Usuarios");
  const listaCompleta = response.data;

  // Mapeia a lista para retornar id, nome e email
  const listaSimples = listaCompleta.map((user) => ({
    id: user.id,
    nome: user.nomeCompleto,
    email: user.email,
    numeroCrea: user.numeroCrea,
    useReq: user.useReq,
    empresa: user.empresa,
    plano: user.plano,
  }));

  return listaSimples;
};

const getUserByToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token não encontrado. Usuário não autenticado.");
      return null;
    }

    const response = await api.get("/api/Usuarios/me");
    console.log("Usuário obtido com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuário pelo token:", error.message);
    if (error.response) {
      console.error(
        "Status:",
        error.response.status,
        "Dados:",
        error.response.data
      );
    }
    // Em caso de erro, retorne null ou lance o erro para o chamador decidir
    return null;
  }
};

/**
 * Função para criar um novo usuário.
 */
const createUser = async (email, senha, nomeCompleto, numeroCrea, empresa) => {
  // O endpoint para registro pode ser diferente, ajuste se necessário
  return await api.post("/api/Usuarios/Cliente", {
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
  return await api.delete(`/api/Usuarios/${id}`);
};

//login
const loginUser = async (email, senha) => {
  // console.log("user: ", + email + " senha: " + senha);
  try {
    const response = await api.post("/Usuario/login", {
      email: email,
      password: senha,
    });

    // Ajuste conforme a estrutura real da sua API (token, accessToken, data.token etc.)
    const token =
      response.data?.token || response.data?.accessToken || response.data;

    console.log("Login bem-sucedido!");
    console.log("Token Bearer:", token);

    // Se quiser, define header default para futuras chamadas
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // e salva no localStorage para persistência
      try {
        localStorage.setItem("token", token);
      } catch (e) {
        console.warn("Não foi possível salvar o token no localStorage:", e);
      }
    }

    return response;
  } catch (error) {
    // Logs detalhados para ajudar a depuração
    if (error.response) {
      console.error("Erro na resposta da API:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error("Requisição feita mas sem resposta:", error.request);
    } else {
      console.error("Erro ao configurar requisição:", error.message);
    }
    throw error;
  }
};

//--------------------------------------------------------------------------------------------
// 2. Planos --------------------------------------------------------------------------------

const putPlanos = async (data, config = {}) => {
  const token = localStorage.getItem("token"); // Padronizado para minúsculo
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }
  const url = "/api/Usuarios/usuario/add/plano";
  try {
    const response = await api.put(url, data, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao inserir plano:", error);
    throw error;
  }
};

//--------------------------------------------------------------------------------------------
// 3. Projeto --------------------------------------------------------------------------------
const getProjetos = async () => {
  const token = localStorage.getItem("token"); // Padronizado para minúsculo
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

const postProjetos = async (nome, descricao) => {
  const token = localStorage.getItem("token");
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

const putProjetos = async (id, data) => {
  const token = localStorage.getItem("token");
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

const deleteProjetos = async (id) => {
  try {
    return await api.delete(`/api/Projetos/${id}`);
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw error;
  }
};

const postProjetoAnalisar = async (id, data) => {
  try {
    return await api.post(`/api/Projetos/projeto/${id}/analisar`, data);
  } catch (error) {
    console.error("Erro ao analisar projeto:", error);
    throw error;
  }
};

//--------------------------------------------------------------------------------------------

// 4. acabou acho ----------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

// Exporta as funções que o componente usará
const apiService = {
  getUser,
  createUser,
  deleteUser,
  loginUser,
  putPlanos,
  getUserByToken,
  getProjetos,
  postProjetos,
  putProjetos,
  deleteProjetos,
  postProjetoAnalisar,
};

export default apiService;
