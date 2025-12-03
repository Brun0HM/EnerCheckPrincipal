import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import apiService from "../../services/api";
import "../App.css";
const Cadastro = () => {
  // Criar usuarios
  const inputNomeCompleto = useRef();
  const inputEmail = useRef();
  const inputEmpresa = useRef();
  const inputSenha = useRef();
  const inputNumeroCrea = useRef();

  // Função que cria usuarios na API
  async function handleCreateUser(event) {
    event.preventDefault();
    try {
      await apiService.createUser(
        inputEmail.current.value,
        inputSenha.current.value,
        inputNomeCompleto.current.value,
        inputNumeroCrea.current.value,
        inputEmpresa.current.value
      );
      inputEmail.current.value = ""; // Limpa o campo
      inputSenha.current.value = ""; // Limpa o campo
      inputNomeCompleto.current.value = ""; // Limpa o campo
      inputNumeroCrea.current.value = ""; // Limpa o campo
      inputEmpresa.current.value = ""; // Limpa o campo
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error; // Lançar erro para que o chamador possa lidar
    }
  }

  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    empresa: "",
    senha: "",
    Crea: "",
    aceitaTermos: false,
    receberAtualizacoes: false,
  });

  // Estado para armazenar erros de validação
  const [errors, setErrors] = useState({});

  // Estado para controlar se o formulário foi submetido
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Valida o formato do email

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const valitadeCrea = (Crea) => {
    const creaRegex = /^\d{6}$/;
    return creaRegex.test(Crea);
  };

  // Valida a força da senha

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid:
        minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar,
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
    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = "Nome completo é obrigatório";
    } else if (formData.nomeCompleto.trim().length < 2) {
      newErrors.nomeCompleto = "Nome completo deve ter pelo menos 2 caracteres";
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
          "A senha precisa ter 8+ caracteres, maiúscula, minúscula, número e caractere especial.";
      }
    }

    // Validação do crea
    if (!formData.Crea) {
      newErrors.Crea = "O CREA é obrigatório";
    } else {
      const creaIsValid = valitadeCrea(formData.Crea);
      if (!creaIsValid) {
        newErrors.Crea = "CREA inválido. Deve conter 6 dígitos.";
      }
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

    // Validação em tempo real para a senha, mas só mostra o erro se já foi submetido
    if (field === "senha" && isSubmitted) {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        setErrors((prev) => ({
          ...prev,
          senha:
            "A senha precisa ter 8+ caracteres, maiúscula, minúscula, número e caractere especial.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.senha;
          return newErrors;
        });
      }
    } else if (errors[field]) {
      // Remove erro dos outros campos quando o usuário começa a digitar
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Verifica se há erros ativos no formulário
   */
  const hasActiveErrors = () => {
    const activeErrors = Object.keys(errors).filter(
      (key) => errors[key] !== null && errors[key] !== undefined
    );
    return activeErrors.length > 0;
  };

  /**
   * Verifica se o formulário pode ser submetido (campos obrigatórios preenchidos)
   */
  const canSubmit = () => {
    return (
      formData.nomeCompleto.trim() &&
      formData.email.trim() &&
      formData.senha &&
      formData.Crea &&
      formData.aceitaTermos &&
      !hasActiveErrors()
    );
  };

  /**
   * Manipula o submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await handleCreateUser(e); // Aguardar a criação do usuário
        // Após criar, fazer login automático e redirecionar baseado no plano
        await apiService.loginUser(formData.email, formData.senha);
        const user = await apiService.getUserByToken();
        if (user && user.plano && user.useReq > 0) {
          navigate("/dashboardGeral");
        } else {
          navigate("/planos");
        }
      } catch (error) {
        console.error("Erro ao criar usuário ou fazer login:", error);
        // Talvez mostrar erro ao usuário, mas por enquanto apenas log
      }
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

          {/* Campo Nome Completo */}
          <div className="mb-3">
            <div className="flex-fill">
              <h6 style={{ color: "var(--text)" }}>Nome Completo *</h6>
              <input
                className={`w-100 form-control theme-input ${
                  errors.nomeCompleto ? "is-invalid" : ""
                }`}
                placeholder="Nome Completo"
                type="text"
                ref={inputNomeCompleto}
                value={formData.nomeCompleto}
                onChange={(e) =>
                  handleInputChange("nomeCompleto", e.target.value)
                }
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.nomeCompleto
                    ? "#dc3545"
                    : "var(--input-border)",
                  color: "var(--text)",
                }}
              />
              {errors.nomeCompleto && (
                <div
                  className="invalid-feedback d-block"
                  style={{ color: "#dc3545" }}
                >
                  {errors.nomeCompleto}
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
                ref={inputEmail}
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
                ref={inputEmpresa}
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
                ref={inputSenha}
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
                          <small
                            style={{
                              color: validation.hasSpecialChar
                                ? "#22c55e"
                                : "#dc3545",
                            }}
                          >
                            {validation.hasSpecialChar ? "✓" : "✗"} Especial
                          </small>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Campo CREA */}
            <div className="mb-3">
              <h6 style={{ color: "var(--text)" }}>CREA *</h6>
              <input
                className={`w-100 form-control theme-input ${
                  errors.Crea ? "is-invalid" : ""
                }`}
                placeholder="Apenas números"
                type="text"
                ref={inputNumeroCrea}
                value={formData.Crea}
                onChange={(e) => handleInputChange("Crea", e.target.value)}
                maxLength={6}
                minLength={6}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.Crea ? "#dc3545" : "var(--input-border)",
                  color: "var(--text)",
                }}
              />
              {errors.Crea && (
                <div
                  className="invalid-feedback d-block"
                  style={{ color: "#dc3545" }}
                >
                  {errors.Crea}
                </div>
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
                backgroundColor: formData.aceitaTermos
                  ? "var(--primary)"
                  : "var(--input-bg)",
                borderColor: errors.aceitaTermos
                  ? "#dc3545"
                  : formData.aceitaTermos
                  ? "var(--primary)"
                  : "var(--input-border)",
                color: "var(--text)",
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
                backgroundColor: formData.receberAtualizacoes
                  ? "var(--primary)"
                  : "var(--input-bg)",
                borderColor: formData.receberAtualizacoes
                  ? "var(--primary)"
                  : "var(--input-border)",
                color: "var(--text)",
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
                backgroundColor: canSubmit()
                  ? "var(--primary)"
                  : "var(--text-secondary)",
                borderColor: canSubmit()
                  ? "var(--primary)"
                  : "var(--text-secondary)",
                color: "#ffffff",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "600",
                opacity: canSubmit() ? 1 : 0.6,
                cursor: canSubmit() ? "pointer" : "not-allowed",
              }}
              disabled={!canSubmit()}
            >
              {!canSubmit() && isSubmitted && hasActiveErrors()
                ? "Corrija os erros acima"
                : canSubmit()
                ? "Criar conta"
                : "Preencha todos os campos obrigatórios"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
