import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const UploadProjeto = () => {
  const navigate = useNavigate();

  const fileTypes = ["JPG", "PNG", "JPEG", "PDF"];
  const nome = useRef("");
  const dataArquivo = useRef(null);
  const tipo = useRef("");
  const imagem = localStorage.getItem("Imagem");
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (e) => {
    const arquivo = e.target.files[0];
    const data = await fileToBase64(arquivo);
    localStorage.setItem("Imagem", data);
    nome.current = arquivo.name;
    if (
      data.startsWith("data:image/jpg") ||
      data.startsWith("data:image/jpeg")
    ) {
      tipo.current = "image/jpeg";
    } else if (data.startsWith("data:application/pdf")) {
      tipo.current = "pdf";
    } else if (data.startsWith("data:image/png")) {
      tipo.current = "image/png";
    }
    dataArquivo.current = data.split(",")[1];
  };

  useEffect(() => {
    console.log(
      "Imagem inserida: ",
      dataArquivo.current,
      " Nome: ",
      nome.current
    );
    console.log("Tipo de Imagem Inserida: ", tipo.current);
  });

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
          Nova Análise - EnerCheckAI
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
          onClick={() => {
            navigate("/info-projeto");
          }}
          className="btn fw-bold mb-4"
          style={{
            backgroundColor: "var(--primary)",
            borderColor: "var(--primary)",
            color: "#ffffff",
          }}
        >
          Próxima Etapa
        </button>
      </div>

      {/* Prévia */}
      <div className="d-flex flex-column align-items-center mt-4">
        <span className="fw-bold" style={{ color: "var(--text)" }}>
          Prévia:
        </span>
        <img
          className="img-fluid col-12 col-md-6 mt-3 mb-5 rounded shadow"
          src={imagem || "https://placehold.co/1000x500"}
          alt="Prévia do arquivo"
        />
      </div>
    </div>
  );
};

export default UploadProjeto;
