import React from "react";

const Notificacoes = () => {
  return (
    <div className=" col-11 col-md-6 shadow border-2 border rounded-3 p-4">
      <div>
        <h5 className="fw-bold">Preferências de Notificação</h5>
        <p>Escolha como deseja receber notificações</p>
      </div>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="">
            <p className="m-0 fw-semibold">Notificação por Email</p>
            <p className="m-0">Receba atualizações por email</p>
          </div>
          <input
            className="border-dark-subtle form-check-input"
            type="checkbox"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="">
            <p className="m-0 fw-semibold">Atualizações de Projetos</p>
            <p className="m-0">Notificações sobre status dos projetos</p>
          </div>
          <input
            className="border-dark-subtle form-check-input"
            type="checkbox"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="">
            <p className="m-0 fw-semibold">Emails de Marketing</p>
            <p className="m-0">Novidades e promoções</p>
          </div>
          <input
            className="border-dark-subtle form-check-input"
            type="checkbox"
          />
        </div>
      </div>
      <button className="btn btn-primary col-12 mt-5 fw-semibold">
        Salvar Preferências
      </button>
    </div>
  );
};

export default Notificacoes;
