import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import apiUserService from "../../../services/usuario";

const Perfil = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [crea, setCrea] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showWarningToast, setShowWarningToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
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
      const hasChanged =
        nome !== initialValues.nome ||
        email !== initialValues.email ||
        crea !== initialValues.crea ||
        empresa !== initialValues.empresa;
      if (!hasChanged) {
        setShowToast(true);
        setIsEditing(false);
        return;
      }

      console.log("ID do usuário:", currentUser?.id);
      const updatedData = {
        Id: currentUser?.id,
        Email: email,
        NomeCompleto: nome,
        NumeroCrea: crea,
        Empresa: empresa,
        Senha: currentUser?.senha || "",
        Plano: currentUser?.plano || null,
        Projetos: currentUser?.projetos || [],
        UseReq: currentUser?.useReq || 0,
      };
      console.log("Dados enviados:", updatedData);

      try {
        await apiUserService.putUser(currentUser.id, updatedData);
        setShowToast(true);
        setIsEditing(false);
        setInitialValues({ nome, email, crea, empresa });
      } catch (error) {
        console.error("Erro ao salvar alterações:", error);
        setShowErrorToast(true);
      }
    }
  };

  // Função para obter o usuário logado pelo token
  async function getUserLogado() {
    try {
      const user = await apiUserService.getUserByToken();
      setCurrentUser(user);
      if (user) {
        const nome = user.nomeCompleto || "";
        const email = user.email || "";
        const crea = user.numeroCrea || "";
        const empresa = user.empresa || "";
        setNome(nome);
        setEmail(email);
        setCrea(crea);
        setEmpresa(empresa);
        setInitialValues({ nome, email, crea, empresa });
      }
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
        className="col-11 col-md-8  rounded-3 p-4 pb-5 mb-5 position-relative"
      >
        {/* Toast de sucesso */}
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          className="m-3 position-absolute top-0 end-0"
          style={{ zIndex: 1050 }}
        >
          <Toast.Body className="bg-success text-white rounded">
            As alterações foram salvas!
          </Toast.Body>
        </Toast>

        {/* Toast de erro */}
        <Toast
          show={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          delay={3000}
          autohide
          className="m-3 position-absolute top-0 end-0"
          style={{ zIndex: 1050 }}
        >
          <Toast.Body className="bg-danger text-white rounded">
            Erro ao salvar alterações. Tente novamente.
          </Toast.Body>
        </Toast>
        {/* Toast de alerta de mudança para começar a editar */}
        <Toast
          show={showWarningToast}
          onClose={() => setShowWarningToast(false)}
          delay={3000}
          autohide
          className="m-3 position-absolute top-0 end-0"
          style={{ zIndex: 1050 }}
        >
          <Toast.Body className="bg-warning text-white rounded">
            Você entrou no modo de edição.
          </Toast.Body>
        </Toast>

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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
            {errors.crea && (
              <div className="invalid-feedback d-block">{errors.crea}</div>
            )}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary col-12 mt-5 fw-semibold"
          onClick={
            isEditing
              ? handleSubmit
              : () => {
                  setIsEditing(true);
                  setShowWarningToast(true);
                }
          }
        >
          {isEditing ? "Salvar Alterações" : "Editar"}
        </button>
      </form>
    </>
  );
};

export default Perfil;
