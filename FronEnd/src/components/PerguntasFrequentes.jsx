import React from "react";

/**
 * Componente PerguntasFrequentes - Card de FAQ com suporte a tema escuro/claro
 *
 * Utiliza variáveis CSS customizadas para se adaptar ao tema selecionado,
 * garantindo que o fundo do card e cores dos textos mudem conforme o tema.
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título da pergunta
 * @param {string} props.descricao - Resposta/descrição da pergunta
 */
const PerguntasFrequentes = ({ title, descricao }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div
        className="card shadow-sm m-3 p-4 theme-card"
        style={{
          maxWidth: "40rem",
          borderRadius: "12px",
          // Aplicação das variáveis CSS para tema dinâmico
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          color: "var(--text)",
        }}
      >
        {/* Título da pergunta com cor do tema */}
        <h5 className="fw-bold mb-3" style={{ color: "var(--text)" }}>
          {title}
        </h5>
        {/* Descrição/resposta com cor secundária do tema */}
        <p className="m-0" style={{ color: "var(--text-secondary)" }}>
          {descricao}
        </p>
      </div>
    </div>
  );
};

export default PerguntasFrequentes;
