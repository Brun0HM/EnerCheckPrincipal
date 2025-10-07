import React, { useState } from "react";
import planos from "../apis/planos";
import { ComponenteLista } from "./ComponenteLista";
import VisualizarLista from "./VisualizarLista";
import DeleteModal from "./DeleteModal";

export const ListaPlanos = ({paginatedData}) => {
   const [selectedItem, setSelectedItem] = useState(null);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

       // Usar dados paginados se fornecidos, senão usar todos os dados
       const dataToRender = paginatedData || planos;
  
    const handleView = (item)=>{
      setSelectedItem(item);
      setShowModalView(true);
    }
    const handleCloseModalView = ()=>{
      setSelectedItem(null);
      setShowModalView(false);
    }
    const handleCloseModalDelete = ()=>{
      setSelectedItem(null);
      setShowModalDelete(false);
    }
    const handleDelete = (item) => {
      setSelectedItem(item);
      setShowModalDelete(true);
    }
  
    const handleConfirmDelete = (itemId) => {
      console.log(`Excluindo item com ID: ${itemId}`);
    }
    
  return (
    <>
    <div
      className="d-flex flex-column gap-2 overflow-y-auto rounded-4"
      style={{ maxHeight: "500px" }}
    >
      {dataToRender.map((item) => (
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
          delete={()=> handleDelete(item)}
        />
      ))}
    </div>
     {showModalView &&(
      <div className='modal show d-block' tabIndex="-1">
        <div className='modal-backdrop show' onClick={handleCloseModalView}></div>
        <VisualizarLista
        item={selectedItem}
        onClose={handleCloseModalView}
        />
      </div>
    )}
     {showModalDelete &&(
      <div className='modal show d-block' tabIndex="-1">
        <div className='modal-backdrop show' onClick={handleCloseModalDelete}></div>
        <DeleteModal
        item={selectedItem}
        onClose={handleCloseModalDelete}
        onConfirm={handleConfirmDelete}
        />
      </div>
    )}
    </>
  );
};
