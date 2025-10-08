import React from "react";

const Segurança = () => {
  return (
    <div className=" col-11 col-md-8 shadow border-2 border rounded-3 p-4 pb-5 mb-5">
      <div>
        <h5 className="fw-bold">Alterar Senha</h5>
        <p>Mantenha sua conta segura com uma senha forte</p>
      </div>
      <div className="d-flex flex-column gap-4">
        <div>
          <span className="fw-semibold">Senha Atual</span>
          <input
            placeholder="Digite sua senha atual"
            type="text"
            className="form-control"
          />
        </div>
        <div>
          <span className="fw-semibold">Nova Senha</span>
          <input
            placeholder="Digite sua nova senha"
            type="text"
            className="form-control"
          />
        </div>
        <div>
          <span className="fw-semibold">Confirmar Nova Senha</span>
          <input
            placeholder="Confirme sua nova senha"
            type="text"
            className="form-control"
          />
        </div>
      </div>
      <button className="btn btn-primary col-12 mt-5 fw-semibold">
        Alterar Senha
      </button>
    </div>
  );
};

export default Segurança;
