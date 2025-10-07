import React from "react";
import Cadastro from "../components/Cadastro";
import { useTheme } from "../hooks/useTheme";

const Cadastrar = () => {
  const { theme } = useTheme();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        transition: "all 0.3s ease",
        paddingBottom: "4rem",
      }}
    >
      {/* Espaçamento superior */}
      <div className="mt-5"></div>

      {/* Cabeçalho da página */}
      <div className="mb-3 mt-5 text-center">
        <div className="mb-2 d-flex justify-content-center align-items-center gap-2">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "var(--primary)",
              color: "#ffffff",
            }}
          >
            <i className="bi bi-lightning-charge"></i>
          </div>
          <h3 className="fw-bold m-0" style={{ color: "var(--text)" }}>
            EnerCheck
          </h3>
        </div>
        <p className="fs-5" style={{ color: "var(--text-secondary)" }}>
          Crie uma conta
        </p>
      </div>

      {/* Componente de Cadastro */}
      <Cadastro />
    </div>
  );
};

export default Cadastrar;
