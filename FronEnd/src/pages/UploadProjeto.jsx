import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { analisarPlanta } from "../../services/enerCheckIa";

const UploadProjeto = () => {
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [dataArquivo, setDataArquivo] = useState(null);
  const [resposta, setResposta] = useState([null]);
  const [tipo, setTipo] = useState("");

  const imagem = localStorage.getItem("Imagem", "");

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleAnalisePlanta = async (imagem, tipo) => {
    setCarregando(true);
    setErro("");
    setResposta("");

    try {
      const response = await analisarPlanta(imagem, tipo)
      setResposta(response);
      localStorage.setItem("Analise", resposta);
      console.log("Resposta: ", resposta)
    } catch (error) {
      setErro("Houve um erro ao analisar a planta: " + error);
      console.log("Teve uns erro ai: ", error)
    } finally {
      setCarregando(false);
      setErro("");
    }
  };

  const handleFileChange = async (e) => {
    const arquivo = e.target.files[0];
    const data = await fileToBase64(arquivo);
    localStorage.setItem("Imagem", data);

    if (
      imagem.startsWith("data:image/jpg") ||
      imagem.startsWith("data:image/jpeg")
    ) {
      setTipo("image/jpeg");
      localStorage.setItem("Formato", tipo);
    } else if (imagem.startsWith("data:application/pdf")) {
      setTipo("pdf");
      localStorage.setItem("Formato", tipo);
    } else if (imagem.startsWith("data:image/png")) {
      setTipo("image/png");
      localStorage.setItem("Formato", tipo);
    }
    setDataArquivo(imagem.split(",")[1]);
  };

  return (
    <div className="container p-5 my-5 d-flex flex-column justify-content-center align-items-center gap-2">
      <p className="fs-2 fw-bold">Nova Análise - EnerCheckAI</p>
      <div
        id="uploadContainer"
        className="container border-1 rounded-2 text-dark d-flex justify-content-center align-items-center flex-column gap-3 py-3"
      >
        <p className="display-6">Inisira o arquivo de sua planta aqui</p>
        <span className="small text-secondary">
          Formatos suportados: jpg,jpeg,xml,pdf
        </span>
        <i className="bi bi-cloud-upload fs-1"></i>
        <input type="file" className="col-3" onChange={handleFileChange} />

        <div>Div de teste: </div>
      </div>
      <button
        onClick={() => handleAnalisePlanta(dataArquivo, tipo)}
        className="btn btn-primary fw-bold "
      >
        Analisar Planta
      </button>

      {carregando && <div className="spinner-border"></div>}
      {!erro && resposta!=null ? (
        <div className="border-success bg-success-subtle bg-opacity-50 text-success p-2 rounded-2">
          As infos Carregaram!
        </div>
      ) : (
        <div className="border-danger bg-danger-subtle bg-opacity-50 text-danger p-2 rounded-2">
          {erro}
        </div>
      )}

      <div className="d-flex flex-column align-items-center">
        <p>Prévia:</p>
        <img className="img-fluid col-3" src={imagem} />
      </div>
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
  );
};

export default UploadProjeto;
