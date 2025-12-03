import React from "react";
import { useNavigate } from "react-router";
import apiService from "../../services/api";

const TiposPlanos = (props) => {
  const navigate = useNavigate();
  const handleEscolherPlano = async () => {
    try {
      // Chama putPlanos com o planoId passado como prop
      await apiService.putPlanos(props.planoId);
      // Após sucesso, navega para a página de assinatura
      navigate("/comecarAssinatura");
    } catch (error) {
      console.error("Erro ao selecionar plano:", error);
      // Opcional: adicione tratamento de erro, como mostrar uma mensagem ao usuário
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <div
        className="card m-3 d-flex flex-column h-100 theme-card"
        style={{
          width: "20rem",
          minHeight: "550px",
          maxHeight: "550px",
          // Uso das variáveis CSS para tema dinâmico
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          color: "var(--text)",
        }}
      >
        {/* Ícone do plano */}
        <div className="mt-4 text-center">
          <i
            className={`${props.icon} p-2 ps-3 pe-3 rounded zulzinho fs-5`}
            style={{
              color: "var(--primary)",
              backgroundColor: "var(--bg)",
            }}
          ></i>
        </div>

        {/* Conteúdo principal do card */}
        <div className="card-body text-center d-flex flex-column justify-content-between flex-grow-1">
          {/* Cabeçalho do plano */}
          <div>
            <h5 className="card-title fw-bold" style={{ color: "var(--text)" }}>
              {props.title}
            </h5>
            <p
              className="card-text"
              style={{
                minHeight: "2.5rem",
                color: "var(--text-secondary)",
              }}
            >
              {props.desgracao}
            </p>
            <div className="mb-3">
              <h2 className="fw-bold" style={{ color: "var(--text)" }}>
                {props.preco}
              </h2>
              <span
                className="fw-semibold"
                style={{ color: "var(--text-secondary)" }}
              >
                /mês
              </span>
            </div>
          </div>

          {/* Lista de benefícios com altura fixa */}
          <div
            className="d-flex flex-column gap-2 justify-content-start"
            style={{
              minHeight: "225px",
              maxHeight: "225px",
              overflow: "hidden",
            }}
          >
            {props.itens.map((item, index) => (
              <div
                key={index}
                className="d-flex gap-2 align-items-center justify-content-start"
              >
                {/* Ícone de check com cor do tema */}
                <i
                  className="bi bi-check-circle flex-shrink-0"
                  style={{ color: "var(--primary)" }}
                ></i>
                {/* Texto do item com cor do tema */}
                <span className="text-start" style={{ color: "var(--text)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Botão de ação - sempre no final */}
          <div className="mt-3">
            <button
              className="btn w-75"
              style={{
                backgroundColor: "var(--primary)",
                borderColor: "var(--primary)",
                color: "#ffffff",
              }}
              onClick={handleEscolherPlano}
            >
              Escolher {props.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiposPlanos;
