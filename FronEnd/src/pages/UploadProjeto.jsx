import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { analisarPlanta } from "../../services/enerCheckIa";


const UploadProjeto = () => {
  const [pergunta, setPergunta] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [dataArquivo, setdDataArquivo] = useState(null)
  const [resposta, setResposta] = useState([null])
  const [tipo, setTipo] = useState('')



  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error)
  });


  const handleFileChange = async (e) => {

    const arquivo =  e.target.files[0];
    const data = await fileToBase64(arquivo)
    if(data.startsWith("data:image/")){
      setTipo("image/jpeg")
    } else if(data.startsWith("data:/application/pdf")) {
      setdDataArquivo("pdf")
    }
    setdDataArquivo(data.split(',')[1]);


  }



  return (
    <div className="container p-5 my-5">
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
        <input type="file" onChange={handleFileChange} />
        <div className="d-flex flex-column align-items-center">
          <p>Prévia:</p>
          <img src={`data:image/jpeg;base64,${dataArquivo}`} />
        </div>
        <button onClick={() => analisarPlanta(dataArquivo, tipo).then(setResposta)}>ANALISAR AGORA!!!!!!!!!!!!!!!!</button>
        <div>Div de teste:  </div>
      </div>

      <div className="d-flex flex-column align-items-center">
        <p>Testando a IA!</p>
        <p>Faça uma pergunta aleatória pra eu ver se tá pegando aqui</p>

        {carregando ? (
          <div className="spinner-border"> </div>
        ) : (
          ""
        )}

        {!erro ? (
          <p className="col-12 align-self-center" style={{whiteSpace: "pre-wrap"}}> { resposta == ""  ?   "O meu teste será exibido aqui." : resposta.analiseCategorizada[0].categoria }</p>
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

        <button onClick={""} disabled={carregando}>
          {!carregando ? "Fazer pergunta" : "gerando resposta..."}
        </button>
      </div>
    </div>
  );
};

export default UploadProjeto;
