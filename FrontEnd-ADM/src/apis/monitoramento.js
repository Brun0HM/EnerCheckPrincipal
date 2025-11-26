import axios from "axios";

const BASE_URL = "https://enercheck.onrender.com/api";

// 1. Cria a instância do Axios com a URL base
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
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
        localStorage.setItem("Token", novoToken);
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

const getProjetos = async () => {
  const response = api.get("/Projetos");
  const listaCompleta = response.data;

  return listaCompleta;
};

const apiProjetos = {
  getProjetos,
};

export default apiProjetos;

// const projetos = [
//     {
//         nome: "Projeto Residencial Vila Nova",
//         email: "maria@exemplo.com",
//         tipoProjeto: "Projeto Residencial",
//         id: "#231",
//         tipoConta: "Pro",
//         dataInicio: "28-12-2023 13:30",
//         dataFim: "15-01-2024 14:30",
//         statusProjeto: "Concluído",
//         descricao: "projeto elétrico Residencial Vila Nova",
//     },
//     {
//         nome: "ProjetoComercial EnerCheck Jaketa",
//         email: "joao@exemplo.com",
//         tipoProjeto: "Projeto Comercial",
//         id: "#323",
//         tipoConta: "Básico",
//         dataInicio: "15-01-2024 14:25",
//         dataFim: "Não concluído",
//         statusProjeto: "Processando",
//         descricao: "projeto elétrico Jaketa",
//     },
//     {
//         nome: "Projeto Industrial PlastBras EnerCheck",
//         email: "ana@exemplo.com",
//         tipoProjeto: "Projeto Industrial",
//         id: "#123",
//         tipoConta: "Empresas",
//         dataInicio: "28-12-2023 07:30",
//         dataFim: "05-01-2024 16:45",
//         statusProjeto: "Concluído",
//         descricao: "projeto elétrico industrial PlastBras",
//     },
//     {
//         nome: "Projeto Residencial Centro",
//         email: "carlos@exemplo.com",
//         tipoProjeto: "Projeto Residencial",
//         id: "#456",
//         tipoConta: "Pro",
//         dataInicio: "10-01-2024 09:15",
//         dataFim: "Não concluído",
//         statusProjeto: "Erro",
//         descricao: "projeto elétrico residencial centro da cidade",
//     },
//     {
//         nome: "Projeto Comercial Shopping",
//         email: "lucia@exemplo.com",
//         tipoProjeto: "Projeto Comercial",
//         id: "#789",
//         tipoConta: "Empresas",
//         dataInicio: "20-01-2024 11:00",
//         dataFim: "Não concluído",
//         statusProjeto: "Processando",
//         descricao: "projeto elétrico para shopping center",
//     }
// ];

// export default projetos;
