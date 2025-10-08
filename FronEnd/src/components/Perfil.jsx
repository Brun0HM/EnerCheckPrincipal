import React from "react";

const Perfil = () => {
  return (
    <>
      <div className=" col-11 col-md-8 shadow border-2 border rounded-3 p-4 pb-5 mb-5">
        <div>
          <h5 className="fw-bold">Informações Pessoais</h5>
          <p>Atualize suas informações de perfil</p>
        </div>
        <div className="d-flex flex-column gap-4">
          <div>
            <span className="fw-semibold">Nome Completo</span>
            <input
              placeholder="Seu nome completo"
              type="text"
              className="form-control"
            />
          </div>
          <div>
            <span className="fw-semibold">Email</span>
            <input
              placeholder="seu@email.com"
              type="text"
              className="form-control"
            />
          </div>
          <div>
            <span className="fw-semibold">Empresa</span>
            <input
              placeholder="Nome da Empresa"
              type="text"
              className="form-control"
            />
          </div>
          <div>
            <span className="fw-semibold">Telefone</span>
            <input
              placeholder="(00)00000-0000"
              type="tel"
              className="form-control"
            />
          </div>
        </div>
        <button className="btn btn-primary col-12 mt-5 fw-semibold">
          Salvas Alterações
        </button>
      </div>
    </>
  );
};

export default Perfil;
