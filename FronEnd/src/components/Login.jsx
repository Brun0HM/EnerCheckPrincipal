import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Senha deve ter pelo menos 6 caracteres
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validar email
    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
    }

    // Validar senha
    if (!senha.trim()) {
      newErrors.senha = "Senha é obrigatória";
    } else if (!validatePassword(senha)) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);

    // Se não há erros, prosseguir com o login
    if (Object.keys(newErrors).length === 0) {
      console.log("Login válido:", { email, senha });
      // Navegar para o dashboard apenas se tudo estiver válido
      navigate("/dashboardGeral");
    }
  };

  // Função para lidar com o clique do botão
  const handleButtonClick = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validar email
    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
    }

    // Validar senha
    if (!senha.trim()) {
      newErrors.senha = "Senha é obrigatória";
    } else if (!validatePassword(senha)) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);

    // Se não há erros, prosseguir com o login
    if (Object.keys(newErrors).length === 0) {
      console.log("Login válido:", { email, senha });
      navigate("/dashboardGeral");
    }
  };

  return (
    <div
      className="row col-11 col-xl-3 p-4 border border-2 rounded-4 shadow shadow-sm theme-card"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        color: "var(--text)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column">
          {/* Cabeçalho do formulário */}
          <div className="d-flex flex-column text-start mb-1">
            <h5 style={{ color: "var(--text)" }}>Entrar</h5>
            <p style={{ color: "var(--text-secondary)" }}>
              Digite suas credenciais para acessar sua conta
            </p>
          </div>

          {/* Campo de email */}
          <div className="mb-3">
            <h6 style={{ color: "var(--text)" }}>Email</h6>
            <input
              className={`w-100 form-control theme-input ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="seu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
            />
            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email}</div>
            )}
          </div>

          {/* Campo de senha */}
          <div className="mb-1">
            <h6 style={{ color: "var(--text)" }}>Senha</h6>
            <input
              className={`w-100 form-control theme-input ${
                errors.senha ? "is-invalid" : ""
              }`}
              placeholder="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
            />
            {errors.senha && (
              <div className="invalid-feedback d-block">{errors.senha}</div>
            )}
          </div>

          {/* Opções adicionais */}
          <div className="d-flex justify-content-between mt-1">
            <div className="d-flex gap-1 align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                }}
              />
              <p className="fw-semibold m-0" style={{ color: "var(--text)" }}>
                Lembrar de mim
              </p>
            </div>
            <a
              className="text-decoration-none"
              href="/cadastrar"
              style={{
                cursor: "pointer",
                color: "var(--primary)",
              }}
            >
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão de submit */}
          <button
            type="submit"
            className="btn mt-3"
            style={{
              backgroundColor: "var(--primary)",
              borderColor: "var(--primary)",
              color: "#ffffff",
            }}
            onClick={handleButtonClick}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
