import React from "react";
const ContainerCircuito = (props) => {
  /**
   * Define a cor do ícone baseada no estado
   */
  const getIconColor = (estado) => {
    if (estado.includes("success")) return "#22c55e";
    if (estado.includes("danger")) return "#ef4444";
    if (estado.includes("warning")) return "#eab308";
    return "var(--text-secondary)";
  };

  return (
    <div
      className="border rounded-3 p-3 my-3 theme-card"
      style={{
        backgroundColor: "var(--input-bg)",
        borderColor: "var(--input-border)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Linha principal com ícone e título */}
      <div className="d-flex flex-row gap-3 align-items-center mb-2">
        <i
          className={`bi ${props.icone} fs-5`}
          style={{ color: getIconColor(props.estado) }}
        ></i>
        <h6 className="fw-semibold mb-0" style={{ color: "var(--text)" }}>
          {props.topico}
        </h6>
      </div>

      {/* Descrição do resultado */}
      <p className="small mb-0 ms-4" style={{ color: "var(--text-secondary)" }}>
        {props.result}
      </p>
    </div>
  );
};

export default ContainerCircuito;
