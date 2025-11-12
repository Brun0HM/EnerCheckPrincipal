import React from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router";
import { useTheme } from "../hooks/useTheme"; // Importando o hook
import LogoClara from "../assets/LogoEsticadaBranca.png";
import LogoEscura from "../assets/LogoEsticadaPreta.png";
import apiService from "../../services/api";

const Logar = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Usando o hook para obter o tema

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Cabeçalho da página */}
      <div className="mb-3 text-center">
        <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
          <img
            src={theme === "light" ? LogoEscura : LogoClara}
            alt=""
            className="img-fluid"
            width={300}
          />
        </div>
        <p className="fs-5" style={{ color: "var(--text-secondary)" }}>
          Faça seu login em sua conta
        </p>
      </div>

      {/* Componente de Login */}
      <Login />

      {/* Seção de opções adicionais */}
      <div className="d-flex flex-column justify-content-center align-items-center mt-3">
        {/* Link para criar conta */}
        <div className="d-flex gap-1 justify-content-center align-items-center mt-3 fs-5">
          <p className="m-0" style={{ color: "var(--text)" }}>
            Não tem uma conta?
          </p>
          <a
            className="text-decoration-none fw-semibold"
            onClick={() => navigate("/cadastro")}
            style={{
              cursor: "pointer",
              color: "var(--primary)",
            }}
          >
            Criar conta
          </a>
        </div>

        {/* Divisória decorativa */}
        <div
          className="d-flex align-items-center mt-3 w-100"
          style={{ maxWidth: "300px" }}
        >
          <hr
            className="flex-grow-1"
            style={{
              borderColor: "var(--text-secondary)",
              opacity: 0.5,
            }}
          />
          <span
            className="px-3 fw-semibold"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
            }}
          >
            OU CONTINUE COM
          </span>
          <hr
            className="flex-grow-1"
            style={{
              borderColor: "var(--text-secondary)",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Botões de login social - adaptados ao tema */}
        <div className="d-flex mt-3 gap-2">
          <button
            className="btn d-flex align-items-center justify-content-center"
            style={{
              width: "140px",
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--card-border)",
              color: "var(--text)",
            }}
          >
            <i className="bi bi-microsoft me-2"></i>Microsoft
          </button>
          <button
            className="btn d-flex align-items-center justify-content-center"
            style={{
              width: "140px",
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--card-border)",
              color: "var(--text)",
            }}
          >
            <i className="bi bi-google me-2"></i>Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logar;
