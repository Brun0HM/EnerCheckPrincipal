import api from "./api.js";

// Função que busca os usuarios na API e retorna uma lista simplificada
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

// Função para obter o usuário autenticado pelo token
const getUserByToken = async () => {
  try {
    const token = localStorage.getItem("Token");
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

// Função para criar um novo usuário na database
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

// Função para deletar um usuário da database
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

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // e salva no localStorage para persistência
      try {
        localStorage.setItem("Token", token);
      } catch (error) {
        console.warn("Não foi possível salvar o token no localStorage:", error);
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

// Método put para editar as informações do usuario
const putUser = async (id, data) => {
  try {
    return await api.put(`/api/Usuarios/${id}`, data);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

// Exporta as funções do usuario
const apiUserService = {
  getUser,
  getUserByToken,
  createUser,
  deleteUser,
  loginUser,
  putUser,
};
export default apiUserService;
