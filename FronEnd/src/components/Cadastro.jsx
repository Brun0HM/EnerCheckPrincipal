import { useNavigate } from "react-router";
import "../App.css";

/**
 * Componente Cadastro - Formulário de registro com suporte a tema escuro/claro
 *
 * Aplicação completa do sistema de temas com variáveis CSS customizadas
 * para backgrounds, bordas, textos e inputs, garantindo consistência visual
 * em ambos os temas (claro e escuro).
 */
const Cadastro = () => {
  const navigate = useNavigate();

  return (
    <div
      className="row col-11 col-xl-3 p-4 border border-2 rounded-4 shadow shadow-sm theme-card"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        color: "var(--text)",
      }}
    >
      <div className="d-flex flex-column">
        {/* Cabeçalho do formulário */}
        <div className="d-flex flex-column text-start mb-1">
          <h5 style={{ color: "var(--text)" }}>Criar conta</h5>
          <p style={{ color: "var(--text-secondary)" }}>
            Preencha os dados abaixo para criar sua conta
          </p>
        </div>

        {/* Campos Nome e Sobrenome - linha dupla */}
        <div className="mb-3 gap-2 d-flex">
          <div className="">
            <h6 style={{ color: "var(--text)" }}>Nome</h6>
            <input
              className="w-100 form-control theme-input"
              placeholder="Nome"
              type="text"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
            />
          </div>
          <div className="">
            <h6 style={{ color: "var(--text)" }}>Sobrenome</h6>
            <input
              className="w-100 form-control theme-input"
              placeholder="Sobrenome"
              type="text"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
            />
          </div>
        </div>

        {/* Demais campos do formulário */}
        <div>
          <h6 style={{ color: "var(--text)" }}>Email</h6>
          <input
            className="w-100 form-control mb-3 theme-input"
            placeholder="meu@email.com"
            type="email"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text)",
            }}
          />

          <h6 style={{ color: "var(--text)" }}>Empresa (opcional)</h6>
          <input
            className="w-100 form-control mb-3 theme-input"
            placeholder="Sua empresa"
            type="text"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text)",
            }}
          />

          <h6 style={{ color: "var(--text)" }}>Senha</h6>
          <input
            className="w-100 form-control mb-3 theme-input"
            placeholder="Senha"
            type="password"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text)",
            }}
          />

          <h6 style={{ color: "var(--text)" }}>Confirmar Senha</h6>
          <input
            className="w-100 form-control mb-3 theme-input"
            placeholder="Confirme sua senha"
            type="password"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text)",
            }}
          />
        </div>

        {/* Checkboxes de termos e condições */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="termsCheck"
            required
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
            }}
          />
          <label
            className="form-check-label fw-semibold"
            htmlFor="termsCheck"
            style={{ color: "var(--text)" }}
          >
            Aceito os{" "}
            <a
              href="#"
              className="text-decoration-none"
              style={{ color: "var(--primary)" }}
            >
              termos e condições
            </a>
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="updatesCheck"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
            }}
          />
          <label
            className="form-check-label fw-semibold"
            htmlFor="updatesCheck"
            style={{ color: "var(--text)" }}
          >
            Quero receber atualizações sobre novos recursos e melhorias
          </label>
        </div>

        {/* Link para login e botão de cadastro */}
        <span
          className="mb-1"
          onClick={() => navigate("/login")}
          style={{
            cursor: "pointer",
            color: "var(--primary)",
          }}
        >
          Já tenho uma conta
        </span>

        <button
          className="btn"
          style={{
            backgroundColor: "var(--primary)",
            borderColor: "var(--primary)",
            color: "#ffffff",
          }}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
