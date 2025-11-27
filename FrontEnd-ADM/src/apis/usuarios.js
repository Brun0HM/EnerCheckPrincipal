import axios from "axios";

const BASE_URL = "https://enercheck.onrender.com/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const apiSemAuth = axios.create({
  baseURL: BASE_URL,
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

const loginUser = async (email, senha) => {
  if (email && senha) {
    try {
      const response = await api.post("/Usuario/login", {
        email: email,
        password: senha,
      });

      const tokenAcesso = response.data?.accessToken;
      const refreshToken = response.data?.refreshToken;

      localStorage.setItem("Token", tokenAcesso);
      localStorage.setItem("RefreshToken", refreshToken);
    } catch (error) {
      console.error("Erro ao utilizar a api: ", error);
    }
  }
};

export default loginUser;

// const usuarios = [
//   {
//     usuarioNome: "Luiz G Vieira",
//     email: "lu1zg@gmail.com",
//     dataCriacao: "06-06-2007",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Pro",
//       },
//     ],
//   },
//   {
//     usuarioNome: "Thiago Mazzi",
//     email: "thiagomazzi@gmail.com",
//     dataCriacao: "06-06-2007",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Pro",
//       },
//     ],
//   },
//   {
//     usuarioNome: "Joaquim G Ramos",
//     email: "joaquimtxt@gmail.com",
//     dataCriacao: "06-06-2007",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Pro",
//       },
//     ],
//   },
//   {
//     usuarioNome: "Ryan Rattini",
//     email: "rattin1@gmail.com",
//     dataCriacao: "06-06-2007",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Pro",
//       },
//     ],
//   },
//   {
//     usuarioNome: "Bruno Henrique Alves",
//     email: "bruno@gmail.com",
//     dataCriacao: "06-06-2007",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Pro",
//       },
//     ],
//   },

//   {
//     usuarioNome: "João Rodolfo Costa",
//     email: "j0ao@gmail.com",
//     dataCriacao: "06-06-2000",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Básico",
//       },
//     ],
//   },
//   {
//     usuarioNome: "Antony Leandro Vieira",
//     email: "antonyfortnite@gmail.com",
//     dataCriacao: "22-9-2025",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Pro",
//       },
//     ],
//   },
//   {
//     usuarioNome: "Daniel Hilario Mazzi",
//     email: "danielHilarioMazzi@gmail.com",
//     dataCriacao: "14-07-1975",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Pro",
//       },
//     ],
//   },
//   {
//     usuarioNome: "Cibele Souza Ramos",
//     email: "cibitxt@gmail.com",
//     dataCriacao: "26-12-1974",
//     crea: "12345678",
//     planos: [
//       {
//         nome: "Plano Pro",
//       },
//     ],
//   },
// ];

// export default usuarios;
