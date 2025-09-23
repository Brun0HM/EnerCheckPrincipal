import React from "react";

export const TabelaGeral = () => {
  return (
    <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-row rounded-4  align-items-center justify-content-between px-5 py-3">
      <div className="d-flex flex-column gap-1 align-items-center">
        <span className="fw-medium fs-5">Total de Usuários</span>
        <span className="fw-bold fs-1">200</span>
      </div>
      <div className="d-flex flex-column gap-1 align-items-center">
        <span className="fw-medium fs-5">Sei la tópico 2</span>
        <span className="fw-bold fs-1">222</span>
      </div>
      <div className="d-flex flex-column gap-1 align-items-center">
        <span className="fw-medium fs-5">Topico 3</span>
        <span className="fw-bold fs-1">222</span>
      </div>
    </div>
  );
};
