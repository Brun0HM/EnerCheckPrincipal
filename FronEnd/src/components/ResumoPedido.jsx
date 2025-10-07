import React from "react";

const ResumoPedido = () => {
  return (
    <>
      <div className="col-12 col-md-3">
        <h5 className="fw-bold">Resumo do Pedido</h5>
        <div className="Plano">
          <div className="preco fw-bold d-flex justify-content-between">
            <p>Básico</p>
            <h5 className="fw-bold">R$49</h5>
          </div>
          <p>por mês</p>
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
          <div>
            <i className="bi bi-check"> Até 10 projetos por mês</i>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumoPedido;
