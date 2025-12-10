import React, { useState } from "react";

const Segurança = () => {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validar Senha Atual
    if (!senhaAtual.trim()) {
      newErrors.senhaAtual = "Senha atual é obrigatória";
    }

    // Validar Nova Senha
    if (!novaSenha.trim()) {
      newErrors.novaSenha = "Nova senha é obrigatória";
    } else if (novaSenha.length < 6) {
      newErrors.novaSenha = "A nova senha deve ter pelo menos 6 caracteres";
    }

    // Validar Confirmação de Senha
    if (!confirmarSenha.trim()) {
      newErrors.confirmarSenha = "Confirmação de senha é obrigatória";
    } else if (novaSenha !== confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }

    setErrors(newErrors);

    // Se não há erros, prosseguir
    if (Object.keys(newErrors).length === 0) {
      console.log("Senha alterada com sucesso:", { senhaAtual, novaSenha });
      // Aqui você pode adicionar a lógica para enviar os dados para a API
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-11 col-md-8 rounded-3 p-4 pb-5 mb-5"
    >
      <div>
        <h5 className="fw-bold">Alterar Senha</h5>
        <p>Mantenha sua conta segura com uma senha forte</p>
      </div>
      <div className="d-flex flex-column gap-4">
        {/* Senha Atual */}
        <div>
          <span className="fw-semibold">Senha Atual</span>
          <div className="input-group">
            <input
              placeholder="Digite sua senha atual"
              type={showPassword ? "text" : "password"}
              className={`form-control theme-input ${
                errors.senhaAtual ? "is-invalid" : ""
              }`}
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>
          {errors.senhaAtual && (
            <div className="invalid-feedback d-block">{errors.senhaAtual}</div>
          )}
        </div>

        {/* Nova Senha */}
        <div>
          <span className="fw-semibold">Nova Senha</span>
          <div className="input-group">
            <input
              placeholder="Digite sua nova senha"
              type={showPassword ? "text" : "password"}
              className={`form-control theme-input ${
                errors.novaSenha ? "is-invalid" : ""
              }`}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>
          {errors.novaSenha && (
            <div className="invalid-feedback d-block">{errors.novaSenha}</div>
          )}
        </div>

        {/* Confirmar Nova Senha */}
        <div>
          <span className="fw-semibold">Confirmar Nova Senha</span>
          <div className="input-group">
            <input
              placeholder="Confirme sua nova senha"
              type={showPassword ? "text" : "password"}
              className={`form-control theme-input ${
                errors.confirmarSenha ? "is-invalid" : ""
              }`}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>
          {errors.confirmarSenha && (
            <div className="invalid-feedback d-block">
              {errors.confirmarSenha}
            </div>
          )}
        </div>
      </div>
      <button type="submit" className="btn btn-primary col-12 mt-5 fw-semibold">
        Alterar Senha
      </button>
    </form>
  );
};

export default Segurança;
