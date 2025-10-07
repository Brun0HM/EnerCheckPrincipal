import React, { useState } from "react";
import "../App.css";

const Login = () => {
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
      // Aqui você pode adicionar a lógica de autenticação
    }
  };

  return (
    <div className="row col-11 col-xl-3 p-4 fundo border border-2 rounded-4 shadow shadow-sm text-dark ">
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column">
          <div className="d-flex flex-column text-start mb-1">
            <h5>Entrar</h5>
            <p>Digite suas credenciais para acessar sua conta</p>
          </div>
          <div className="mb-3">
            <h6>Email</h6>
            <input
              className={`w-100 form-control ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="seu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email}</div>
            )}
          </div>
          <div className="mb-1">
            <h6 className="text-dark">Senha</h6>
            <input
              className={`w-100 form-control ${
                errors.senha ? "is-invalid" : ""
              }`}
              placeholder="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {errors.senha && (
              <div className="invalid-feedback d-block">{errors.senha}</div>
            )}
          </div>
          <div className="d-flex justify-content-between mt-1">
            <div className="d-flex gap-1">
              <input className="form-check-input" type="checkbox" />
              <p className="fw-semibold">Lembrar de mim</p>
            </div>
            <a
              className="text-decoration-none"
              href="/cadastrar"
              style={{ cursor: "pointer" }}
            >
              Esqueceu a senha?
            </a>
          </div>
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
