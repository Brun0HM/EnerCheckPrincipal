import React, { useState } from "react";
import planos from "../apis/planos";
import { ComponenteLista } from "./ComponenteLista";
import VisualizarLista from "./VisualizarLista";

export const ListaPlanos = () => {
   const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const handleView = (item)=>{
      setSelectedItem(item);
      setShowModal(true);
    }
    const handleCloseModal = ()=>{
      setSelectedItem(null);
      setShowModal(false);
    }
  return (
    <>
    <div
      className="d-flex flex-column gap-2 overflow-y-auto rounded-4"
      style={{ maxHeight: "500px" }}
    >
      {planos.map((item) => (
        <ComponenteLista
          key={item.id}
          nome={item.nome}
          topic1={"Preço"}
          t1info={item.preco}
          topic2={"Requisições"}
          t2info={item.req}
          topic3={"Ativo?"}
          t3info={item.ativo ? "Sim" : "Não"}
          view={()=> handleView(item)}
        />
      ))}
    </div>
     {showModal &&(
      <div className='modal show d-block' tabIndex="-1">
        <div className='modal-backdrop show' onClick={handleCloseModal}></div>
        <VisualizarLista
        item={selectedItem}
        onClose={handleCloseModal}
        />
      </div>
    )}
    </>
  );
};
