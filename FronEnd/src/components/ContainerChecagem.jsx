import React from "react";
import ContainerCircuito from "./ContainerCircuito";

export const ContainerChecagem = (props) => {
  return (
    <div className="container bg-white rounded-3 border border-1  px-3 py-4 shadow">
      <div className="d-flex flex-row gap-3 align-items-center ms-2">
        <i className="bi bi-lightbulb text-primary fs-5"></i>
        <p className="fs-5 fw-bold text-black m-0">{props.categoria}</p>
      </div>
      <p className="  small text-body-secondary fw-medium ms-2">
        {props.descricao}
      </p>

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
