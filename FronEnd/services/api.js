import axios from "axios";

// URL base da sua API
const BASE_URL = "https://enercheck.onrender.com";

// 1. Cria a instância do Axios com a URL base
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 2. Adiciona interceptors para incluir o token em cada requisição
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

export default api;
