import React from "react";
import apiUserService from "../../../services/usuario";
import planosService from "../../../services/planos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProjetosRecentes } from "../Dashboard/ProjetosRecentes";
const Assinaturas = () => {
  const navigate = useNavigate();
  const [plano, setPlano] = useState(null);
  const [historicoPagamentos, setHistoricoPagamentos] = useState([]);

  async function planoAtual() {
    try {
      const plano = await apiUserService.getUserByToken();
      setPlano(plano.plano);
      console.log("plano atual:", plano.plano);
    } catch (error) {
      console.error("Erro ao obter plano atual:", error);
    }
  }

  async function historico() {
    try {
      const historico = await planosService.historicoPagamento();
      setHistoricoPagamentos(historico);
      console.log("Histórico de pagamentos:", historico);
    } catch (error) {
      console.error("Erro ao obter histórico de pagamento:", error);
      throw error;
    }
  }

  // Ordenar historico de pagamento por data decrescente e pegar os 3 últimos
  const UltimosPagamentos = historicoPagamentos
    .sort((a, b) => new Date(b.dataPagamento) - new Date(a.dataPagamento))
    .slice(0, 3);

  useEffect(() => {
    planoAtual();
    historico();
  }, []);

  return (
    <div className=" col-11 col-md-8 bg-dark rounded-4 px-4 py-3 pb-5 mb-5 ">
      <div>
        <h5 className="fw-bold">Plano Atual</h5>
        <p>Gerencie sua assinatura e método de pagamento</p>
      </div>

      <div className="SeuPlano  rounded-4 px-4 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">
              Plano: {plano ? `${plano.nome}` : "Nenhum plano"}
            </h5>
            <p className="m-0">R$ {plano ? plano.preco : 149}/mês</p>
          </div>
          <span
            className="bg-primary bg-opacity-10 p-1 px-3 rounded-5 fw-semibold"
            style={{ color: "var(--text)" }}
          >
            Ativo
          </span>
        </div>

        <p className="mt-3">Próxima cobrança: 15 de Fevereiro, 2025</p>

        <div className="d-flex flex-column flex-md-row justify-content-between col-12">
          <button
            className="btn mb-3 mb-md-0 btn-primary fw-semibold col-12 col-md-4"
            onClick={() => navigate("/planos")}
          >
            Alterar Plano
          </button>
          <button className="btn btn-outline-danger fw-semibold col-12 col-md-4 ">
            Cancelar Assinatura
          </button>
        </div>
      </div>

      <div className="Metodo mt-4">
        <h5 className="fw-semibold mb-3">Método de Pagamento</h5>

        <div className="Carton border border-1 rounded-4 px-4 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-credit-card fs-5"></i>
              <div>
                <p className="m-0">•••• •••• •••• 4242</p>
                <p className="m-0">Expira em 12/2026</p>
              </div>
            </div>
            <button
              className="btn btn-outline-primary fw-semibold"
              onClick={() => navigate("/comecarAssinatura")}
            >
              Editar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-3">
        <h5 className="fw-semibold">Histórico de Pagamentos</h5>
        <div className="d-flex flex-column gap-3">
          {UltimosPagamentos.length === 0 ? (
            <div className="d-flex justify-content-between align-items-center border border-1 rounded-4 px-3 py-3">
              <p className="m-0">Nenhum pagamento encontrado.</p>
            </div>
          ) : (
            UltimosPagamentos.map((pagamento, index) => (
              <div
                key={pagamento.id || index}
                className="d-flex justify-content-between align-items-center border border-1 rounded-4 px-3 py-3"
              >
                <div>
                  <h6 className="mb-0 fw-semibold">
                    R$ {pagamento.valorTotal}
                  </h6>
                  <h6 className="m-0 fw-light">
                    {new Date(pagamento.dataPagamento).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </h6>
                </div>
                <span
                  className="px-2 py-1 rounded-5 fw-semibold"
                  style={{
                    backgroundColor: "#a0f8a496",
                    color: "var(--text)",
                    fontSize: 12,
                  }}
                >
                  Pago
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Assinaturas;
