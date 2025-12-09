import api from "./api.js";

const putPlanos = async (planoId, config = {}) => {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }
  const url = "/api/Usuarios/add/plano";
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

// Função para obter o histórico de pagamento do usuário
const historicoPagamento = async () => {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }
  const response = await api.get("/api/PlanoPagos/me");
  try {
    return response.data;
  } catch (error) {
    console.error("Erro ao obter histórico de pagamento:", error);
    throw error;
  }
};

//Função para gerar um plano pago
const gerarPlanoPago = async (planoId) => {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }
  try {
    const response = await api.post("/api/PlanoPagos", {
      planoId: planoId,
    });
    console.log("Plano pago gerado com sucesso");
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar plano pago:", error);
    throw error;
  }
};

// Exportando as funções de planos
const planosService = {
  putPlanos,
  historicoPagamento,
  gerarPlanoPago,
};
export default planosService;
