import axios from "axios";

// URL base da sua API
const BASE_URL = "https://192.168.1.114:7257/api";

// 1. Cria a instância do Axios com a URL base
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const apiSemAuth = axios.create({
  baseURL: BASE_URL,
})



api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
})



api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      const response = await api.post("/Usuario/refresh", {
        refreshToken: refreshToken
      });

      const novoToken = response.data.accessToken;
      localStorage.setItem('Token', novoToken);
      originalRequest.headers['Authorization'] = `Bearer ${novoToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      console.error('O refresh token falhou: ', refreshError);
      localStorage.clear();
      window.location.href = '/'
       
      
    }
  }
} 

)

const loginUser = async (email, senha) => {

  if(email && senha) {

    try {
      
      const response = await api.post("/Usuario/login", {
        email: email,
        password: senha
      })
      
      const data = response.data;
      localStorage.setItem("Token", data.accessToken);
      localStorage.setItem('RefreshToken', data.refreshToken);

    } catch (error) {
      console.error("Erro ao utilizar a api: ", error)
    }
    
  }

}

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
  loginUser
};

export default apiService;

