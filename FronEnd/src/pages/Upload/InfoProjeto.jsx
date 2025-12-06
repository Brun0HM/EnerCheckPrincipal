import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import projetosService from "../../../services/projetos";
import { Toast } from "react-bootstrap";

const InfoProjeto = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const nomeProjeto = useRef("");
  const desc = useRef("");

  async function postProjeto() {
    // Obtém os valores dos refs
    const nome = nomeProjeto.current?.value || "";
    const descricao = desc.current?.value || "";

    // Validação
    if (!nome.trim() || !descricao.trim()) {
      setShowToast(true);
      showToast;
      return;
    }
    try {
      await projetosService.postProjetos(nome, descricao);
      navigate("/uploadProjeto");
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        height: "100vh",
      }}
    >
      {/* Toast de notificação */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="m-3 position-absolute top-0 end-0"
        style={{ zIndex: 1050 }}
      >
        <Toast.Body className="bg-danger text-white rounded">
          O nome e a descrição do projeto são obrigatórios!
        </Toast.Body>
      </Toast>
      <div
        className="container-fluid col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-center align-items-center gap-4 rounded shadow"
        style={{
          border: "1px solid var(--primary)",
          backgroundColor: "var(--card-bg)",
          color: "var(--text)",
        }}
      >
        <h1
          className="fs-2 fw-bold text-start mt-4"
          style={{ color: "var(--text)" }}
        >
          insira as informações do seu projeto
        </h1>

        {/* Campos para nome e descrição */}
        <div className="w-100 px-4">
          <div className="mb-3">
            <label
              htmlFor="nomeProjeto"
              className="form-label fw-bold"
              style={{ color: "var(--text)" }}
            >
              Nome do Projeto
            </label>
            <input
              type="text"
              className="form-control"
              id="nomeProjeto"
              ref={nomeProjeto}
              placeholder="Digite o nome do projeto"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="descricao"
              className="form-label fw-bold"
              style={{ color: "var(--text)" }}
            >
              Descrição do Projeto
            </label>
            <textarea
              className="form-control"
              id="descricao"
              rows="3"
              ref={desc}
              placeholder="Digite uma descrição para o projeto"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
            ></textarea>
          </div>
        </div>

        {/* Botão 1 */}
        <button
          type="button"
          onClick={postProjeto}
          className="btn fw-bold mb-4"
          style={{
            backgroundColor: "var(--primary)",
            borderColor: "var(--primary)",
            color: "#ffffff",
          }}
        >
          Criar Projeto
        </button>
      </div>
    </div>
  );
};

export default InfoProjeto;
