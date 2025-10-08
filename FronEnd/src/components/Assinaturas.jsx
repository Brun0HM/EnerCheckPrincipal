import React from "react";

const Assinaturas = () => {
  return (
    <div className=" col-11 col-md-6 shadow border-2 border rounded-4 px-4 py-3 ">
      <div>
        <h5 className="fw-bold">Plano Atual</h5>
        <p>Gerencie sua assinatura e método de pagamento</p>
      </div>

      <div className="SeuPlano border border-1 rounded-4 px-4 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Plano Pro</h5>
            <p className="m-0">R$ 149/mês</p>
          </div>
          <span
            className="bg-primary bg-opacity-10 p-1 px-3 rounded-5 fw-semibold"
            style={{ color: "#0004d4" }}
          >
            Ativo
          </span>
        </div>

        <p className="mt-3">Próxima cobrança: 15 de Fevereiro, 2025</p>

        <div className="d-flex justify-content-between col-12">
          <button className="btn btn-primary fw-semibold col-4">
            Alterar Plano
          </button>
          <button className="btn btn-outline-danger fw-semibold col-4 ">
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
            <button className="btn btn-outline-dark fw-semibold">Editar</button>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-3">
        <h5 className="fw-semibold">Histórico de Pagamentos</h5>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between align-items-center border border-1 rounded-4 px-3 py-3">
            <div>
              <h6 className="mb-0 fw-semibold">R$149,00</h6>
              <h6 className="m-0 fw-light">15 Jan 2025</h6>
            </div>
            <span
              className="px-2 py-1 rounded-5 fw-semibold"
              style={{
                backgroundColor: "#a0f8a496",
                color: "#008528",
                fontSize: 12,
              }}
            >
              Pago
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center border border-1 rounded-4 px-3 py-3">
            <div>
              <h6 className="mb-0 fw-semibold">R$149,00</h6>
              <h6 className="m-0 fw-light">15 Jan 2025</h6>
            </div>
            <span
              className="px-2 py-1 rounded-5 fw-semibold"
              style={{
                backgroundColor: "#a0f8a496",
                color: "#008528",
                fontSize: 12,
              }}
            >
              Pago
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center border border-1 rounded-4 px-3 py-3">
            <div>
              <h6 className="mb-0 fw-semibold">R$149,00</h6>
              <h6 className="m-0 fw-light">15 Jan 2025</h6>
            </div>
            <span
              className="px-2 py-1 rounded-5 fw-semibold"
              style={{
                backgroundColor: "#a0f8a496",
                color: "#008528",
                fontSize: 12,
              }}
            >
              Pago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assinaturas;
