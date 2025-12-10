import axios from "axios";

const BASE_URL = "https://enercheck.onrender.com/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("Token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;

      console.log("Cabeçalhos Enviados: ", config.headers)
    }

    return config;
  },
  (error) => {
    console.log("Erro no receptor de requisição! ", error)
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Erro no receptor de resposta! ", error)
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

const editUser = async (id , payload) => {
  if (id){
    try {
      const response = await api.put(`/api/Usuarios/${id}`, payload)
      return response;
    } catch (error) {
      console.error("Erro ao editar usuario: ", error.message)
    }
  }
}

const apiUser = {
  loginUser, editUser
}

export default apiUser;
