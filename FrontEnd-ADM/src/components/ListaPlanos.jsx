import React from "react";
import planos from "../apis/planos";
import { ComponenteLista } from "./ComponenteLista";

export const ListaPlanos = () => {
  return (
    <div
      className="d-flex flex-column gap-2 overflow-y-auto rounded-4"
      style={{ maxHeight: "500px" }}
    >
      {planos.map((plano) => (
        <ComponenteLista
          key={plano.id}
          nome={plano.nome}
          topic1={"Preço"}
          t1info={plano.preco}
          topic2={"Requisições"}
          t2info={plano.req}
          topic3={"Ativo?"}
          t3info={plano.ativo ? "Sim" : "Não"}
        />
      ))}
    </div>
  );
};
