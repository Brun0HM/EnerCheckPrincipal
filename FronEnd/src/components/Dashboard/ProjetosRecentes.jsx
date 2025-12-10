import React from "react";
import { useNavigate } from "react-router";

export const ProjetosRecentes = (props) => {
  const navigate = useNavigate();

  /**
   * Define a cor do badge baseada no status
   * Adapta as cores para funcionarem em ambos os temas
   */
  const getBadgeStyle = (status) => {
    const baseStyle = {
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
    };

    switch (status) {
      case "aprovado":
        return {
          ...baseStyle,
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          color: "#16a34a",
          border: "1px solid rgba(34, 197, 94, 0.3)",
        };
      case "pendente":
        return {
          ...baseStyle,
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          color: "#d97706",
          border: "1px solid rgba(251, 191, 36, 0.3)",
        };
      case "rejeitado":
        return {
          ...baseStyle,
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          color: "#dc2626",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: "var(--card-border)",
          color: "var(--text-secondary)",
          border: "1px solid var(--card-border)",
        };
    }
  };

  const handleClick = () => {
    if (props.indice !== undefined) {
      navigate(`/dashboardProjeto${props.indice + 1}`);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between p-3 rounded-4 border mt-3 theme-card"
      style={{
        backgroundColor: "var(--input-bg)",
        borderColor: "var(--input-border)",
        color: "var(--text)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* Informações do projeto */}
      <div>
        <h6 className="mb-1 fw-medium" style={{ color: "var(--text)" }}>
          {props.nomeProjeto}
        </h6>
        <small style={{ color: "var(--text-secondary)" }}>
          {props.tempoProjeto}
        </small>
      </div>

      {/* Badge de status com cores adaptáveis */}
      <span style={getBadgeStyle(props.statusProjeto)}>
        {props.statusProjeto}
      </span>
    </div>
  );
};
