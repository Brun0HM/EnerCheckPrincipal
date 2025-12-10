import React from "react";
export const InfoGeralContainer = (props) => {
  /**
   * Define a cor da barra de progresso baseada na pontuação
   */
  const getProgressColor = (pontuacao) => {
    if (pontuacao >= 90) return "#22c55e";
    if (pontuacao >= 70) return "#eab308";
    if (pontuacao >= 50) return "#f97316";
    return "#ef4444";
  };

  /**
   * Define a cor do texto da pontuação baseada na categoria
   */
  const getScoreColor = (cor) => {
    switch (cor) {
      case "success":
        return "#22c55e";
      case "danger":
        return "#ef4444";
      case "warning":
        return "#eab308";
      case "primary":
        return "var(--primary)";
      default:
        return "var(--text)";
    }
  };

  return (
    <div
      className="border rounded-4 py-4 px-4 shadow-sm theme-card h-100"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="d-flex flex-column h-100">
        {/* Cabeçalho com título e ícone */}
        <div className="d-flex flex-row justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold mb-0" style={{ color: "var(--text)" }}>
            {props.topico}
          </h6>
          <i
            className={`bi ${props.iconeTopico} fs-5`}
            style={{ color: "var(--text-secondary)" }}
          ></i>
        </div>

        {/* Conteúdo principal */}
        <div className="d-flex flex-column flex-grow-1">
          {/* Pontuação destacada */}
          <div className="text-center mb-3">
            <h2
              className="fw-bold mb-1"
              style={{
                color: getScoreColor(props.corNumero),
                fontSize: "2.5rem",
              }}
            >
              {props.pontuacaoGeral}%
            </h2>
          </div>

          {/* Barra de progresso estilizada */}
          <div className="mb-3">
            <div
              className="progress"
              role="progressbar"
              style={{
                height: "12px",
                backgroundColor: "var(--input-border)",
                borderRadius: "6px",
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${props.pontuacaoGeral}%`,
                  backgroundColor: getProgressColor(props.pontuacaoGeral),
                  borderRadius: "6px",
                  transition: "width 0.8s ease-in-out",
                }}
              ></div>
            </div>
          </div>

          {/* Comentário descritivo */}
          <p
            className="small fw-medium text-center mb-0 mt-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {props.comentario}
          </p>
        </div>
      </div>
    </div>
  );
};
