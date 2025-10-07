import React, { useState } from "react";
import usuarios from "../apis/usuarios";

const Modal = (props) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [crea, setCrea] = useState("");
  const [plano, setPlano] = useState("");
  const [isCreaValid, setIsCreaValid] = useState(true);

  const handleCadastrar = () => {
    if (crea.length !== 10) {
      setIsCreaValid(false);
      return;
    }

    const novoUsuario = {
      usuarioNome: nome,
      email: email,
      dataCriacao: new Date().toLocaleDateString(),
      crea: crea,
      planos: [{ nome: plano }],
    };

    usuarios.push(novoUsuario);

    setNome("");
    setEmail("");
    setCrea("");
    setPlano("");
    setIsCreaValid(true); // Reseta a validação

    props.modalOpen();
  };

  const handleCreaChange = (e) => {
    const value = e.target.value;
    if (value.length === 10) {
      setIsCreaValid(true);
    } else {
      setIsCreaValid(false);
    }
    setCrea(value);
  };

  return (
    <div className=" col-11 col-md-3 border border-2 rounded-4 py-4 shadow bg-white">
      <h3 className="ms-4 fw-bold">Cadastro de Usuarios</h3>
      <div className="d-flex flex-column align-items-center gap-4 fw-bold py-3">
        <div className="Name col-11 col-md-10">
          <label htmlFor="">Nome</label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <div className="Email col-11 col-md-10">
          <label htmlFor="">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
          />
        </div>
        <div className="CREA col-11 col-md-10">
          <label htmlFor="crea">CREA</label>
          <input
            id="crea"
            value={crea}
            onChange={handleCreaChange}
            type="number"
            className={`form-control ${isCreaValid ? "" : "is-invalid"}`} // Adiciona classe de validação
          />
          <div className="invalid-feedback">
            O CREA deve ter exatamente 10 dígitos.
          </div>
        </div>
        <div className="Plano col-11 col-md-10">
          <label htmlFor="plano">Plano</label>
          <select
            id="plano"
            value={plano}
            onChange={(e) => setPlano(e.target.value)}
            className="form-select"
          >
            <option value="" disabled>
              Selecione um plano
            </option>
            <option value="Plano Básico">Plano Básico</option>
            <option value="Plano Pro">Plano Pro</option>
          </select>
        </div>
        <div className="col-10 d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary col-5"
            disabled={!isCreaValid}
            onClick={handleCadastrar}
          >
            Cadastrar
          </button>
          <button
            className="btn btn-outline-dark col-5"
            onClick={props.modalOpen}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
