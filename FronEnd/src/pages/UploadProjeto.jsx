import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { analisarPlanta } from "../../services/enerCheckIa";
import { useNavigate } from "react-router";
import { FileUploader } from "react-drag-drop-files";


const UploadProjeto = () => {
  const navigate = useNavigate()


  const fileTypes = ["JPG", "PNG", "JPEG", "PDF"]

  const [nome, setNome] = useState()

  const [erro, setErro] = useState();
  const [carregando, setCarregando] = useState(false);
  const [dataArquivo, setDataArquivo] = useState(null);
  const [resposta, setResposta] = useState([]);
  const [tipo, setTipo] = useState("");

  const imagem = localStorage.getItem("Imagem");
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

    try {
      const response = await analisarPlanta(imagem, tipo);
      setResposta(response);
      localStorage.setItem("Analise", resposta)
    } catch (error) {

      setErro("Houve um erro ao analisar a planta: " + error);
      console.log(erro);

    } finally {
      setCarregando(false);
      
    }
  };
  
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
      localStorage.setItem("Formato", tipo);
    } else if (data.startsWith("data:application/pdf")) {
      setTipo("application/pdf");
      localStorage.setItem("Formato", tipo);
    } else if (data.startsWith("data:image/png")) {
      setTipo("image/png");
      localStorage.setItem("Formato", tipo);
    }
    setDataArquivo(imagem.split(",")[1]);
  };
  
    useEffect(() => {
  
      console.log("Array na página de upload: ", resposta)
      console.log(localStorage.getItem("Analise"))
      console.log("Tipo de Imagem Inserida: ", tipo)
      console.log("Imagem inserida: ", dataArquivo , " Nome: ", nome)
  
  
    }, [resposta, tipo, dataArquivo, nome])
  
  return (
    <div 
    style={{
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100vh",
      paddingTop: "2rem"
    }}>

    <div
     className="container col-5 my-5 d-flex flex-column justify-content-center align-items-center gap-2 border border-primary">
      
      
      <p className="fs-2 fw-bold">Nova Análise - EnerCheckAI</p>
      <div
        id="uploadContainer"
        className="container border-2 bg-primary bg-opacity-25 rounded-2 d-flex justify-content-center align-items-center flex-column gap-2 py-3 col-8 border-primary"
      >
        <i className="bi bi-cloud-upload display-1"></i>

        <div className="d-flex flex-column gap-2 align-items-center ">
        <p className="fs-5 m-0 text-center fw-bold">Arraste & solte arquivos aqui</p>
        {/* <FileUploader  handleChange={handleFileChange} name="file"  classes="border-0 text-primary text-decoration-underline fw-bolder fs-5" children={<p className="m-0">Clique aqui</p>} types={fileTypes} /> */}
        <span className="small text-secondary">
          Formatos suportados: {fileTypes.slice(',')}
        </span>
        <input type="file" className="col-5" onChange={handleFileChange} />
        </div>

        <div className="border border-primary bg-primary bg-opacity-25 text-primary rounded-2 px-2">Arquivo Atual: {nome || "Nenhum" } </div>
        {/* <input type="file" className="col-9" onChange={handleFileChange} /> */}
      </div>
        <img className="img-fluid col-5" src={"https://placehold.co/1000x500"} />
      <button
        onClick={() => handleAnalisePlanta(dataArquivo, tipo)}
        className="btn btn-primary fw-bold "
        disabled={carregando}
      >
        { !carregando ? "Analisar Planta" : "Carregando análise..."}
      </button>

      {carregando && <div className=" spinner-grow text-primary"></div>}


      {erro == "" ? (
        <div className={`border border-success bg-success-subtle ${ carregando && "d-none" } bg-opacity-50 text-success px-3 py-2 rounded-2`}>
          {carregando && "Caarregando Informações..."}
        </div>
      ) : (
        <div className={` border border-danger bg-danger-subtle ${ !erro  && "d-none" } bg-opacity-50 text-danger px-3 py-2 rounded-2`}>
          {erro && "Ops! Houve um erro! verifique as informações e tente novamente"}
        </div>
      )}

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
        </div>
  );
};

export default UploadProjeto;
