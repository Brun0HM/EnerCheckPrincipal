import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../App.css";

/**
 * Componente Cadastro - Formulário de registro com validações completas
 *
 * Sistema completo de validação de formulário com:
 * - Validação de campos obrigatórios
 * - Validação de formato de email
 * - Validação de força da senha
 * - Confirmação de senha
 * - Validação de termos obrigatórios
 * - Feedback visual de erros
 */
const Cadastro = () => {
  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    empresa: "",
    senha: "",
    confirmarSenha: "",
    aceitaTermos: false,
    receberAtualizacoes: false,
  });

  // Estado para armazenar erros de validação
  const [errors, setErrors] = useState({});

  // Estado para controlar se o formulário foi submetido
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Valida o formato do email
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Valida a força da senha
   */
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    };
  };

  /**
   * Valida todos os campos do formulário
   */
  const validateForm = () => {
    const newErrors = {};

    // Validação do nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validação do sobrenome
    if (!formData.sobrenome.trim()) {
      newErrors.sobrenome = "Sobrenome é obrigatório";
    } else if (formData.sobrenome.trim().length < 2) {
      newErrors.sobrenome = "Sobrenome deve ter pelo menos 2 caracteres";
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validação da senha
    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else {
      const passwordValidation = validatePassword(formData.senha);
      if (!passwordValidation.isValid) {
        newErrors.senha =
          "Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número";
      }
    }

    // Validação da confirmação de senha
    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = "Confirmação de senha é obrigatória";
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "Senhas não coincidem";
    }

    // Validação dos termos
    if (!formData.aceitaTermos) {
      newErrors.aceitaTermos = "Você deve aceitar os termos e condições";
    }

    return newErrors;
  };

  /**
   * Manipula mudanças nos campos do formulário
   */
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  /**
   * Manipula o submit do formulário
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log("Cadastro válido:", formData);
      // Aqui você pode adicionar a lógica de cadastro (API call)
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
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
            <h5 style={{ color: "var(--text)" }}>Criar conta</h5>
            <p style={{ color: "var(--text-secondary)" }}>
              Preencha os dados abaixo para criar sua conta
            </p>
          </div>

          {/* Campos Nome e Sobrenome - linha dupla */}
          <div className="mb-3 gap-2 d-flex">
            <div className="flex-fill">
              <h6 style={{ color: "var(--text)" }}>Nome *</h6>
              <input
                className={`w-100 form-control theme-input ${
                  errors.nome ? "is-invalid" : ""
                }`}
                placeholder="Nome"
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.nome ? "#dc3545" : "var(--input-border)",
                  color: "var(--text)",
                }}
              />
              {errors.nome && (
                <div
                  className="invalid-feedback d-block"
                  style={{ color: "#dc3545" }}
                >
                  {errors.nome}
                </div>
              )}
            </div>
            <div className="flex-fill">
              <h6 style={{ color: "var(--text)" }}>Sobrenome *</h6>
              <input
                className={`w-100 form-control theme-input ${
                  errors.sobrenome ? "is-invalid" : ""
                }`}
                placeholder="Sobrenome"
                type="text"
                value={formData.sobrenome}
                onChange={(e) => handleInputChange("sobrenome", e.target.value)}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.sobrenome
                    ? "#dc3545"
                    : "var(--input-border)",
                  color: "var(--text)",
                }}
              />
              {errors.sobrenome && (
                <div
                  className="invalid-feedback d-block"
                  style={{ color: "#dc3545" }}
                >
                  {errors.sobrenome}
                </div>
              )}
            </div>
          </div>

          {/* Demais campos do formulário */}
          <div>
            {/* Campo Email */}
            <div className="mb-3">
              <h6 style={{ color: "var(--text)" }}>Email *</h6>
              <input
                className={`w-100 form-control theme-input ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="meu@email.com"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.email ? "#dc3545" : "var(--input-border)",
                  color: "var(--text)",
                }}
              />
              {errors.email && (
                <div
                  className="invalid-feedback d-block"
                  style={{ color: "#dc3545" }}
                >
                  {errors.email}
                </div>
              )}
            </div>

            {/* Campo Empresa */}
            <div className="mb-3">
              <h6 style={{ color: "var(--text)" }}>Empresa (opcional)</h6>
              <input
                className="w-100 form-control theme-input"
                placeholder="Sua empresa"
                type="text"
                value={formData.empresa}
                onChange={(e) => handleInputChange("empresa", e.target.value)}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--text)",
                }}
              />
            </div>

            {/* Campo Senha */}
            <div className="mb-3">
              <h6 style={{ color: "var(--text)" }}>Senha *</h6>
              <input
                className={`w-100 form-control theme-input ${
                  errors.senha ? "is-invalid" : ""
                }`}
                placeholder="Senha (min. 8 caracteres)"
                type="password"
                value={formData.senha}
                onChange={(e) => handleInputChange("senha", e.target.value)}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.senha ? "#dc3545" : "var(--input-border)",
                  color: "var(--text)",
                }}
              />
              {errors.senha && (
                <div
                  className="invalid-feedback d-block"
                  style={{ color: "#dc3545" }}
                >
                  {errors.senha}
                </div>
              )}
              {/* Indicadores de força da senha */}
              {formData.senha && (
                <div className="mt-2">
                  <small style={{ color: "var(--text-secondary)" }}>
                    Força da senha:
                  </small>
                  <div className="d-flex gap-2 mt-1">
                    {(() => {
                      const validation = validatePassword(formData.senha);
                      return (
                        <>
                          <small
                            style={{
                              color: validation.minLength
                                ? "#22c55e"
                                : "#dc3545",
                            }}
                          >
                            {validation.minLength ? "✓" : "✗"} 8+ caracteres
                          </small>
                          <small
                            style={{
                              color: validation.hasUpperCase
                                ? "#22c55e"
                                : "#dc3545",
                            }}
                          >
                            {validation.hasUpperCase ? "✓" : "✗"} Maiúscula
                          </small>
                          <small
                            style={{
                              color: validation.hasLowerCase
                                ? "#22c55e"
                                : "#dc3545",
                            }}
                          >
                            {validation.hasLowerCase ? "✓" : "✗"} Minúscula
                          </small>
                          <small
                            style={{
                              color: validation.hasNumbers
                                ? "#22c55e"
                                : "#dc3545",
                            }}
                          >
                            {validation.hasNumbers ? "✓" : "✗"} Número
                          </small>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Campo Confirmar Senha */}
            <div className="mb-3">
              <h6 style={{ color: "var(--text)" }}>Confirmar Senha *</h6>
              <input
                className={`w-100 form-control theme-input ${
                  errors.confirmarSenha ? "is-invalid" : ""
                }`}
                placeholder="Confirme sua senha"
                type="password"
                value={formData.confirmarSenha}
                onChange={(e) =>
                  handleInputChange("confirmarSenha", e.target.value)
                }
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.confirmarSenha
                    ? "#dc3545"
                    : "var(--input-border)",
                  color: "var(--text)",
                }}
              />
              {errors.confirmarSenha && (
                <div
                  className="invalid-feedback d-block"
                  style={{ color: "#dc3545" }}
                >
                  {errors.confirmarSenha}
                </div>
              )}
              {/* Indicador de senha coincidente */}
              {formData.confirmarSenha && formData.senha && (
                <small
                  style={{
                    color:
                      formData.senha === formData.confirmarSenha
                        ? "#22c55e"
                        : "#dc3545",
                  }}
                >
                  {formData.senha === formData.confirmarSenha
                    ? "✓ Senhas coincidem"
                    : "✗ Senhas não coincidem"}
                </small>
              )}
            </div>
          </div>

          {/* Checkboxes de termos e condições */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="termsCheck"
              checked={formData.aceitaTermos}
              onChange={(e) =>
                handleInputChange("aceitaTermos", e.target.checked)
              }
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: errors.aceitaTermos
                  ? "#dc3545"
                  : "var(--input-border)",
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
                onClick={(e) => e.preventDefault()}
              >
                termos e condições
              </a>
              {" *"}
            </label>
            {errors.aceitaTermos && (
              <div
                className="invalid-feedback d-block"
                style={{ color: "#dc3545" }}
              >
                {errors.aceitaTermos}
              </div>
            )}
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="updatesCheck"
              checked={formData.receberAtualizacoes}
              onChange={(e) =>
                handleInputChange("receberAtualizacoes", e.target.checked)
              }
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
          <div className="d-flex flex-column gap-3">
            <span
              className="text-center"
              onClick={() => navigate("/login")}
              style={{
                cursor: "pointer",
                color: "var(--primary)",
                textDecoration: "underline",
              }}
            >
              Já tenho uma conta
            </span>

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "var(--primary)",
                borderColor: "var(--primary)",
                color: "#ffffff",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "600",
              }}
              disabled={isSubmitted && Object.keys(errors).length > 0}
            >
              {isSubmitted && Object.keys(errors).length > 0
                ? "Corrija os erros acima"
                : "Criar conta"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
