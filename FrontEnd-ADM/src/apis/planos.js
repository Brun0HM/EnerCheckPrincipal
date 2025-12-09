import axios from "axios";

const BASE_URL = "https://enercheck.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    console.log("Interceptor de requisição chamado!");
    const token = localStorage.getItem("Token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Erro no interceptor de resposta ", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Interceptor de resposta chamado!");

    return response;
  },
  async (error) => {
    console.error("Erro no interceptor de resposta");
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


const listagemPlanos = async () => {
  try {
    const response = await api.get("/Planos");
    const listaCompleta = response.data;
  
    return listaCompleta;
    
  } catch (error) {
    console.error("erro ao buscar planos: " + error);
    
  }
};


const criarPlano = async (nome, preco, quantReq) => {
  const nomePlano = nome;

  try {
    const response = await api.post("/Planos", {
      nome: nomePlano,
      preco: preco,
      quantReq: quantReq,
    });

    console.log(response.data);
    alert("O plano " + nomePlano + " Foi criado com êxito.");
    return response;
  } catch (err) {
    console.log("Erro ao criar um plano: ", err);
  }
};

const listaPlanosId = async (id) => {
  const response = await api.get(`/Planos/${id}`);
  
  const planoBuscado = response.data;

  return planoBuscado;
};

const deletePlano = async (planoId) => {
  if (!planoId)
    try {
      const response = await api.delete(`/api/Planos/${planoId}`);
      console.log("Plano deletado com sucesso.");
      return response.data;
    } catch (error) {
      console.error("Deu ruim. ", error)
    }
};

const apiPlanos = {
  listagemPlanos,
  criarPlano,
  listaPlanosId,
  deletePlano
}

export default apiPlanos




// const planos = [
//   {
//     nome: "Plano Empresarial",
//     preco: "199.99",
//     req: "100",
//     ativo: true,
//     totalUsuarios: "5",
//   },
//   {
//     nome: "Plano Pro",
//     preco: "79.99",
//     req: "50",
//     ativo: true,
//     totalUsuarios: "15",
//   },
//   {
//     nome: "Plano Básico",
//     preco: "25.99",
//     req: "10",
//     ativo: true,
//     totalUsuarios: "10",
//   },
//   {
//     nome: "Plano Inicial",
//     preco: "9.99",
//     req: "3",
//     ativo: false,
//     totalUsuarios: "0",
//   },
// ];

// export default planos;
