import React from "react";

const TiposPlanos = (props) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <div
        className="card m-3 d-flex flex-column h-100"
        style={{
          width: "20rem",
          minHeight: "550px",
          maxHeight: "550px",
        }}
      >
        {/* Ícone */}
        <div className="mt-4 text-center">
          <i
            className={`${props.icon} text-primary p-2 ps-3 pe-3 rounded zulzinho fs-5`}
          ></i>
        </div>

        {/* Conteúdo do card */}
        <div className="card-body text-center d-flex flex-column justify-content-between flex-grow-1">
          {/* Header do plano */}
          <div>
            <h5 className="card-title fw-bold">{props.title}</h5>
            <p
              className="card-text text-secondary"
              style={{ minHeight: "2.5rem" }}
            >
              {props.desgracao}
            </p>
            <div className="mb-3">
              <h2 className="fw-bold">{props.preco}</h2>
              <span className="text-secondary fw-semibold">/mês</span>
            </div>
          </div>

          {/* Lista de itens com altura fixa */}
          <div
            className="d-flex flex-column gap-2 justify-content-start"
            style={{
              minHeight: "200px",
              maxHeight: "200px",
              overflow: "hidden",
            }}
          >
            {props.itens.map((item, index) => (
              <div
                key={index}
                className="d-flex gap-2 align-items-center justify-content-start"
              >
                <i className="bi bi-check-circle text-primary flex-shrink-0"></i>
                <span className="text-dark text-start">{item}</span>
              </div>
            ))}
          </div>

          {/* Botão sempre no final */}
          <div className="mt-3">
            <button className="btn btn-dark w-75">
              Escolher {props.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiposPlanos;
