import React from "react";
import ContainerCircuito from "./ContainerCircuito";
export const ContainerChecagem = (props) => {
  return (
    <div
      className="rounded-4 border px-4 py-4 shadow-sm theme-card h-100"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Cabeçalho da seção */}
      <div className="d-flex flex-row gap-3 align-items-center mb-3">
        <div
          className="p-2 rounded-3 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "var(--primary)",
            color: "#ffffff",
            minWidth: "40px",
            height: "40px",
          }}
        >
          <i className="bi bi-cpu fs-5"></i>
        </div>
        <div>
          <h5 className="fw-bold mb-1" style={{ color: "var(--text)" }}>
            {props.categoria}
          </h5>
          <p className="small mb-0" style={{ color: "var(--text-secondary)" }}>
            {props.descricao}
          </p>
        </div>
      </div>

      <ContainerCircuito
        icone={"bi-check2-circle"}
        estado={"text-success"}
        topico={"Circuito de iluminação - Sala"}
        result={"Dimensionamento adequado conforme NBR 5410"}
      />

      <ContainerCircuito
        icone={"bi-x-circle"}
        estado={"text-danger"}
        topico={"Circuito de Tomadas - Cozinha"}
        result={"Sobrecarga detectada - Redimensionar condutor'"}
      />

      <ContainerCircuito
        icone={"bi-check2-circle"}
        estado={"text-success"}
        topico={"Cicuito de Ar Condicionado"}
        result={"Proteção adequada instalada"}
      />

      <ContainerCircuito
        icone={"bi-x-circle"}
        estado={"text-danger"}
        topico={"Circuito de Chuveiro"}
        result={"DR inadequado para a potência"}
      />

      <div></div>
    </div>
  );
};
