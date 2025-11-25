import axios from "axios";

const BASE_URL = "https://192.168.15.11:7257/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const listaPlanos = async () => {
  const response = await api.get("/Planos");
  const listaCompleta = response.data;

  return listaCompleta;
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
  const response = await api.get("/Planos", {
    id: id,
  });
  const planoBuscado = response.data;

  return planoBuscado;
};

const planos = [
  {
    nome: "Plano Empresarial",
    preco: "199.99",
    req: "100",
    ativo: true,
    totalUsuarios: "5",
  },
  {
    nome: "Plano Pro",
    preco: "79.99",
    req: "50",
    ativo: true,
    totalUsuarios: "15",
  },
  {
    nome: "Plano Básico",
    preco: "25.99",
    req: "10",
    ativo: true,
    totalUsuarios: "10",
  },
  {
    nome: "Plano Inicial",
    preco: "9.99",
    req: "3",
    ativo: false,
    totalUsuarios: "0",
  },
];

export default planos;
