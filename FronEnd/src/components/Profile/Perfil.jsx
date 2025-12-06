import React, { useState, useEffect } from "react";
import apiUserService from "../../../services/usuario";

const Perfil = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [crea, setCrea] = useState("");
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validar nome
    if (!nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    // Validar email
    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
    }

    // Validar CREA
    if (!crea.trim()) {
      newErrors.crea = "CREA é obrigatório";
    }

    setErrors(newErrors);

    // Se não há erros, prosseguir
    if (Object.keys(newErrors).length === 0) {
      console.log("Formulário válido:", { nome, email, crea });
      // Adicionar a logica para mandar para API
    }
  };

  // Função para obter o usuário logado pelo token
  async function getUserLogado() {
    try {
      const user = await apiUserService.getUserByToken();
      setCurrentUser(user);
    } catch (error) {
      console.error("Erro ao obter usuário pelo token:", error);
    }
  }

  useEffect(() => {
    getUserLogado();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="col-11 col-md-8 shadow border-2 border rounded-3 p-4 pb-5 mb-5"
      >
        <div>
          <h5 className="fw-bold">Informações Pessoais</h5>
          <p>Atualize suas informações de perfil</p>
        </div>
        <div className="d-flex flex-column gap-4">
          {/* Campo de Nome */}
          <div>
            <span className="fw-semibold">Nome Completo</span>
            <input
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
              placeholder={currentUser?.nomeCompleto || "Seu Nome Completo"}
              type="text"
              maxLength={100}
              className={`form-control theme-input ${
                errors.nome ? "is-invalid" : ""
              }`}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && (
              <div className="invalid-feedback d-block">{errors.nome}</div>
            )}
          </div>

          {/* Campo de email */}
          <div className="mb-3">
            <h6 style={{ color: "var(--text)" }}>Email</h6>
            <input
              className={`w-100 form-control theme-input ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder={currentUser?.email || "Seu Email"}
              type="email"
              value={email}
              maxLength={100}
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

          {/* Campo de Empresa */}
          <div>
            <span className="fw-semibold">Empresa (Opcional)</span>
            <input
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
              placeholder={currentUser?.empresa || "Sua Empresa"}
              type="text"
              maxLength={100}
              className={`form-control theme-input`}
              // value={empresa}
            />
          </div>

          {/* Campo de CREA */}
          <div>
            <span className="fw-semibold">CREA</span>
            <input
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
              placeholder={currentUser?.numeroCrea || "Seu CREA"}
              type="text"
              maxLength={5}
              className={`form-control theme-input ${
                errors.crea ? "is-invalid" : ""
              }`}
              value={crea}
              onChange={(e) => setCrea(e.target.value)}
            />
            {errors.crea && (
              <div className="invalid-feedback d-block">{errors.crea}</div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary col-12 mt-5 fw-semibold"
        >
          Salvar Alterações
        </button>
      </form>
    </>
  );
};

export default Perfil;
