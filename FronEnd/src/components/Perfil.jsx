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
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
              placeholder="Seu nome completo"
              type="text"
              className="form-control theme-input"
            />
          </div>
          <div>
            <span className="fw-semibold">Email</span>
            <input
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
              placeholder="seu@email.com"
              type="text"
              className="form-control theme-input"
            />
          </div>
          <div>
            <span className="fw-semibold">Empresa</span>
            <input
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
              placeholder="Nome da Empresa"
              type="text"
              className="form-control theme-input"
            />
          </div>
          <div>
            <span className="fw-semibold">Telefone</span>
            <input
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text)",
              }}
              placeholder="(00)00000-0000"
              type="tel"
              className="form-control theme-input"
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
