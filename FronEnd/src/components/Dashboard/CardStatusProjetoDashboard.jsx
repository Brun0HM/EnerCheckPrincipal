import React from "react";
export const CardStatusProjetoDashboard = (props) => {
  return (
    <div
      className="container border border-1 rounded-4 py-3 px-3 shadow theme-card"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        color: "var(--text)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="d-flex flex-column">
        {/* Cabeçalho com título e ícone */}
        <div className="d-flex flex-row justify-content-between align-items-center">
          <p className="fw-medium mb-0" style={{ color: "var(--text)" }}>
            {props.status}
          </p>
          <i
            className={`bi ${props.iconeStatus}`}
            style={{ color: "var(--text-secondary)" }}
          ></i>
        </div>

        {/* Valor principal */}
        <div className="d-flex flex-row justify-content-between mt-2">
          <h4 className="fw-bold mb-0" style={{ color: "var(--text)" }}>
            {props.num}
          </h4>
        </div>

        {/* Descrição adicional */}
        <div className="d-flex flex-row justify-content-between mt-1">
          <small style={{ color: "var(--text-secondary)" }}>{props.desc}</small>
        </div>
      </div>
    </div>
  );
};
