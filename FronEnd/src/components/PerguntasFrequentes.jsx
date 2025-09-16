import React from "react";

const PerguntasFrequentes = ({ title, descricao }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div
        className="card shadow-sm m-3 p-4"
        style={{ maxWidth: "40rem", borderRadius: "12px" }}
      >
        <h5 className="fw-bold mb-3">{title}</h5>
        <p className="text-muted m-0">{descricao}</p>
      </div>
    </div>
  );
};

export default PerguntasFrequentes;
