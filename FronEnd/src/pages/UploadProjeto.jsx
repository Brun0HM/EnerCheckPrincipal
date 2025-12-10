import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { analisarPlanta } from "../../services/enerCheckIa";
import { useNavigate } from "react-router";
import { FileUploader } from "react-drag-drop-files";

const UploadProjeto = () => {
  const navigate = useNavigate();

  const fileTypes = ["JPG", "PNG", "JPEG", "PDF"];


  const [nome, setNome] = useState();


  const [dataArquivo, setDataArquivo] = useState(null);
  const [tipo, setTipo] = useState("");

  const imagem = localStorage.getItem("Imagem");
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleData = async (data, formato) => {
    localStorage.setItem("imagem", data)
    localStorage.setItem("tipo", formato)
    console.log("Data recebida!")
    console.log("Formato do arquivo recebido: ", tipo)
    
    navigate("/dashboardProjeto")
  }

  const handleFileChange = async (e) => {
    const arquivo = e.target.files[0];
    const data = await fileToBase64(arquivo);
    localStorage.setItem("Imagem", data);
    setNome(arquivo.name);
    if (
      data.startsWith("data:image/jpg") ||
      data.startsWith("data:image/jpeg")
    ) {
      setTipo("image/jpeg");
    } else if (data.startsWith("data:application/pdf")) {
      setTipo("pdf");
    } else if (data.startsWith("data:image/png")) {
      setTipo("image/png");
    }
    setDataArquivo(imagem.split(",")[1]);
  };


  useEffect(() => {
    console.log("Imagem inserida: ", dataArquivo, " Nome: ", nome);
    console.log("Tipo de Imagem Inserida: ", tipo);
  }, [tipo, dataArquivo, nome]);

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
      <div className="container col-12 col-md-5 my-5 d-flex flex-column justify-content-center align-items-center gap-2 border border-primary">
        <p className="fs-2 fw-bold">Nova Análise - EnerCheckAI</p>
        <div
          id="uploadContainer"
          className="container border-2 bg-primary bg-opacity-25 rounded-2 d-flex justify-content-center align-items-center flex-column gap-2 py-3 col-8 border-primary"
        >
          <i className="bi bi-cloud-upload display-1"></i>

          <div className="d-flex flex-column gap-2 align-items-center ">
            <p className="fs-5 m-0 text-center fw-bold">
              Arraste & solte arquivos aqui
            </p>
            {/* <FileUploader  handleChange={handleFileChange} name="file"  classes="border-0 text-primary text-decoration-underline fw-bolder fs-5" children={<p className="m-0">Clique aqui</p>} types={fileTypes} /> */}
            <span className="small text-secondary">
              Formatos suportados: {fileTypes.slice(",")}
            </span>
            <input type="file" className="col-5" onChange={handleFileChange} />
          </div>

          <div className="border border-primary bg-primary bg-opacity-25 text-primary rounded-2 px-2">
            Arquivo Atual: {nome || "Nenhum"}{" "}
          </div>
          {/* <input type="file" className="col-9" onChange={handleFileChange} /> */}
        </div>
        <button
          onClick={() => handleData(dataArquivo, tipo)}
          className="btn btn-primary fw-bold "
        >
        Enviar Arquivo
        </button>

        {/* <div className="d-flex flex-column align-items-center mt-5">
        {/* <div className="d-flex flex-column align-items-center mt-5">
        <p>Testando a IA!</p>
        <p>Faça uma pergunta aleatória pra eu ver se tá pegando aqui</p>

        {carregando ? <div className="spinner-border"> </div> : ""}
        
        {!erro ? (
          <p
            className="col-12 align-self-center"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {" "}
            {resposta == ""
            ? "O meu teste será exibido aqui."
            : resposta.analiseCategorizada[0].categoria}
          </p>
          ) : (
            <div className=" border rounded-3 px-3 border-danger bg-danger-subtle bg-opacity-50 text-danger my-3">
            {erro}
            </div>
            )}

        <input
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          disabled={carregando}
          className="col-7"
          />

          <button onClick={{}} disabled={carregando}>
          {!carregando ? "Fazer pergunta" : "gerando resposta..."}
          </button>
          </div> */}
      </div>
      <div className="d-flex flex-column align-items-center">
        <span>Prévia: </span>
        <img
          className="img-fluid col-3 mt-3 mb-5"
          src={ imagem || "https://placehold.co/1000x500"  }
        />
      </div>
    </div>
  );
};

export default UploadProjeto;
