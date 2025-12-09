import api from "../services/api";

const getPlanosPagos = async () => {
  try {
    console.log("Buscando todos os planos pagos...");

    const response = await api.get("/api/PlanoPagos");

    console.log("PlanosPagos carregados:", response.data?.lenght || 0);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar planos", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

const postPlanosPagos = async (planoId) => {
  try {
    console.log("Criando planoPago:", planoId);

    const response = await api.post("/api/PlanoPagos", {
      planoId: planoId,
    });

    console.log("PlanoPago criado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar planoPago", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

const getPlanoPagoByUsuario = async () => {
  try {
    console.log("Buscando planos de pagamento do usuário logado...");

    const response = await api.get("/api/PlanoPagos/me");

    console.log(
      "Planos de pagamento do usuário carregados:",
      response.data?.length || 0
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar planos de pagamento do usuário logado",
      error?.response?.data || error
    );
    throw error?.response?.data || error;
  }
};

export const planosPagosAPI = {
  getPlanosPagos,
  getPlanoPagoByUsuario,
  postPlanosPagos,
};

export default planosPagosAPI;
