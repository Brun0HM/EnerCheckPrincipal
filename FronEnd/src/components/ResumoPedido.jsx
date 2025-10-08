import React from "react";

const ResumoPedido = () => {
  return (
    <>
      <div className="col-12 col-md-3 p-4 border border-3 rounded-4 shadow">
        <h5 className="fw-bold">Resumo do Pedido</h5>
        <div className="Plano">
          <div className="preco fw-bold d-flex justify-content-between">
            <p>Básico</p>
            <h5 className="fw-bold">R$00.00</h5>
          </div>
          <p className="mb-1">por mês</p>
          <span
            className="bg-primary-subtle p-1 px-2 rounded-2"
            style={{ fontSize: 14, color: "#001aff" }}
          >
            7 dias grátis
          </span>
        </div>
        <hr />
        <h6 className="fw-bold">Recursos inclusos:</h6>
        <div>
          <div className="d-flex gap-2">
            <i className="bi bi-check text-primary"> </i>
            <p className="">Até 10 projetos por mês</p>
          </div>
          <div className="d-flex gap-2">
            <i className="bi bi-check text-primary"> </i>
            <p>Análise de conformidade NBR 5410</p>
          </div>
          <div className="d-flex gap-2">
            <i className="bi bi-check text-primary"> </i>
            <p>Relatórios em PDF</p>
          </div>
          <div className="d-flex gap-2">
            <i className="bi bi-check text-primary"> </i>
            <p>Suporte por email</p>
          </div>
          <div className="d-flex gap-2">
            <i className="bi bi-check text-primary"> </i>
            <p className="m-0">Histórico de 30 dias</p>
          </div>
        </div>
        <hr />
        <div>
          <div className="d-flex justify-content-between mb-1">
            <p className="m-0">Subtotal:</p>
            <p className="m-0 fw-bold">R$00.00</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="m-0">Desconto:</p>
            <p className="m-0 fw-bold">R$00.00</p>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between ">
          <h5 className="">Total</h5>
          <h4 className="fw-bold">R$00.00</h4>
        </div>
      </div>
    </>
  );
};

export default ResumoPedido;
