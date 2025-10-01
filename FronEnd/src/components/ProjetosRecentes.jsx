import React from "react";

export const ProjetosRecentes = (props) => {
  return (
    <div className="d-flex align-items-center bg-white justify-content-between p-3 rounded-4 border mt-3">
      <div>
        <h6 className="mb-1 fw-medium text-black">{props.nomeProjeto}</h6>
        <small className="text-secondary">{props.tempoProjeto}</small>
      </div>
      <span className="badge bg-success bg-opacity-25 text-success px-3 py-2">
        {props.statusProjeto}
      </span>
    </div>
  );
};
