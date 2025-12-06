import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Toast } from "react-bootstrap";
import projetosService from "../../../services/projetos";

const UploadProjeto = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  // Define os tipos de arquivos aceitos para upload
  const fileTypes = ["JPG", "PNG", "JPEG", "PDF"];
  const [imagem, setImagem] = useState(null);
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const nome = useRef(""); // Nome do arquivo

  // Função chamada quando o usuário seleciona um arquivo
  const handleFileChange = (e) => {
    const arquivo = e.target.files[0]; // Pega o primeiro arquivo selecionado
    if (arquivo) {
      nome.current = arquivo.name; // Salva o nome do arquivo
      setArquivoSelecionado(arquivo);
      // Cria URL para prévia
      setImagem(URL.createObjectURL(arquivo));
    }
  };

  const enviarArquivo = async () => {
    const id = localStorage.getItem("projetoId");
    if (!id) {
      console.error("ID do projeto não encontrado!");
      setShowToast(true);
      return;
    }
    if (!arquivoSelecionado) {
      console.error("Arquivo não selecionado!");
      setShowToast(true);
      return;
    }
    const formData = new FormData();
    formData.append("arquivo", arquivoSelecionado);
    try {
      await projetosService.postProjetoAnalisar(id, formData);
      console.log("Arquivo enviado para análise!");
      navigate("/dashboardProjeto");
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      setShowToast(true);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        paddingTop: "2rem",
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
          Erro ao enviar arquivo. Tente novamente.
        </Toast.Body>
      </Toast>
      <div
        className="container-fluid col-12 col-md-8 col-lg-6 my-5 d-flex flex-column justify-content-center align-items-center gap-4 rounded shadow"
        style={{
          border: "1px solid var(--primary)",
          backgroundColor: "var(--card-bg)",
          color: "var(--text)",
        }}
      >
        <h1
          className="fs-2 fw-bold text-center mt-4"
          style={{ color: "var(--text)" }}
        >
          Envie seu arquivo
        </h1>

        {/* Área de upload */}
        <div
          id="uploadContainer"
          className="container rounded-2 d-flex justify-content-center align-items-center flex-column gap-3 py-4 col-10"
          style={{
            border: "2px solid var(--primary)",
            backgroundColor: "rgba(var(--primary-rgb), 0.25)",
            color: "var(--text)",
          }}
        >
          <i
            className="bi bi-cloud-upload display-1"
            style={{ color: "var(--primary)" }}
          ></i>

          <div className="d-flex flex-column gap-2 align-items-center text-center">
            <p className="fs-5 m-0 fw-bold" style={{ color: "var(--text)" }}>
              Arraste & solte arquivos aqui
            </p>
            <span className="small" style={{ color: "var(--text-secondary)" }}>
              Formatos suportados: {fileTypes.join(", ")}
            </span>
            <input
              type="file"
              className="form-control col-8"
              onChange={handleFileChange}
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
            />
          </div>

          <div
            className="rounded-2 px-3 py-1"
            style={{
              border: "1px solid var(--primary)",
              backgroundColor: "rgba(var(--primary-rgb), 0.25)",
              color: "var(--primary)",
            }}
          >
            Arquivo Atual: {nome.current || "Nenhum"}
          </div>
        </div>

        {/* Botão enviar */}
        <button
          type="button"
          onClick={enviarArquivo}
          className="btn fw-bold mb-4"
          style={{
            backgroundColor: "var(--primary)",
            borderColor: "var(--primary)",
            color: "#ffffff",
          }}
        >
          Enviar Arquivo
        </button>
      </div>

      {/* Prévia */}
      {imagem && (
        <div className="d-flex flex-column align-items-center mt-4">
          <span className="fw-bold" style={{ color: "var(--text)" }}>
            Prévia:
          </span>
          <img
            className="img-fluid col-12 col-md-6 mt-3 mb-5 rounded shadow"
            src={imagem}
            alt="Prévia do arquivo"
          />
        </div>
      )}
    </div>
  );
};

export default UploadProjeto;
