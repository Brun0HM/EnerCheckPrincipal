import React from "react";

/**
 * Componente Motivos - Card de motivação/razões com suporte a tema escuro/claro
 *
 * Adaptado para usar variáveis CSS customizadas que se ajustam automaticamente
 * ao tema selecionado pelo usuário (claro ou escuro).
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} props.icon - Classe do ícone Bootstrap
 * @param {string} props.title - Título do motivo/razão
 * @param {string} props.description - Descrição detalhada
 */
const Motivos = (props) => {
  return (
    <div>
      {/* Card principal com background e bordas temáticas */}
      <div
        className="d-flex flex-column justify-content-center align-items-start border border-2 p-3 rounded-4 theme-card"
        style={{
          // Aplicação das variáveis CSS para tema dinâmico
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          color: "var(--text)",
          transition: "all 0.3s ease", // Transição suave para mudança de tema
        }}
      >
        {/* Container do ícone */}
        <div>
          <div
            className="p-1 pe-2 ps-2 rounded-3 d-inline-flex align-items-center justify-content-center"
            style={{
              width: "48px",
              height: "48px",
              // Fundo do ícone usando cor de fundo principal (mais sutil)
              backgroundColor: "var(--bg)",
              border: `1px solid var(--card-border)`,
            }}
          >
            {/* Ícone com cor primária do tema */}
            <i
              className={`${props.icon} fs-5`}
              style={{ color: "var(--primary)" }}
            ></i>
          </div>
        </div>

        {/* Conteúdo textual */}
        <div className="text-start">
          {/* Título com cor principal do tema */}
          <h5
            className="fw-semibold text-capitalize mt-3"
            style={{ color: "var(--text)" }}
          >
            {props.title}
          </h5>
          {/* Descrição com cor secundária do tema */}
          <p className="fs-5" style={{ color: "var(--text-secondary)" }}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Motivos;
