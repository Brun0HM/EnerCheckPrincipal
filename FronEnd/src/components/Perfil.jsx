import React, { useState } from "react";

const Perfil = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState({});

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

    // Validar telefone
    if (!telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    }

    setErrors(newErrors);

    // Se não há erros, prosseguir
    if (Object.keys(newErrors).length === 0) {
      console.log("Formulário válido:", { nome, email, telefone });
      // Adicionar a logica para mandar para API
    }
  };

  // valida e coloca o () e o - no telefone enquanto digita
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    // 11 digits (cell with leading 9)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setTelefone(formatted);
  };

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
              placeholder="Seu nome completo"
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
              placeholder="seu@email.com"
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
              placeholder="Nome da Empresa"
              type="text"
              maxLength={100}
              className={`form-control theme-input`}
              // value={empresa}
            />
          </div>

          {/* Campo de Telefone */}
          <div>
            <span className="fw-semibold">Telefone</span>
            <input
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
              placeholder="(00) 00000-0000"
              type="tel"
              inputMode="numeric"
              maxLength={15}
              className={`form-control theme-input ${
                errors.telefone ? "is-invalid" : ""
              }`}
              value={telefone}
              onChange={handleTelefoneChange}
            />
            {errors.telefone && (
              <div className="invalid-feedback d-block">{errors.telefone}</div>
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
