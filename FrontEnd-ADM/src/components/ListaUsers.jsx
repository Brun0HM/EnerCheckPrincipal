import React, { useState } from "react";
import usuarios from "../apis/usuarios";
import { ComponenteLista } from "./ComponenteLista";
import VisualizarLista from "./VisualizarLista";
import DeleteModal from "./DeleteModal";
import Editar from "./Editar";

export const ListaUsers = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleView = (item) => {
    setSelectedItem(item);
    setShowModalView(true);
  };
  const handleCloseModalView = () => {
    setSelectedItem(null);
    setShowModalView(false);
  };
  const handleCloseModalDelete = () => {
    setSelectedItem(null);
    setShowModalDelete(false);
  };
  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowModalDelete(true);
  };
  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModalEdit(true);
  };

  const handleConfirmDelete = (itemId) => {
    console.log(`Excluindo item com ID: ${itemId}`);
  };
  return (
    <>
      <div
        className="d-flex flex-column gap-2 overflow-y-auto rounded-4 "
        style={{ maxHeight: "500px" }}
      >
        {usuarios.map((item) => (
          <ComponenteLista
            key={item.id}
            nome={item.usuarioNome}
            desc={item.email}
            topic1={"CREA"}
            t1info={item.crea}
            topic2={"Data de Criação"}
            t2info={item.dataCriacao}
            topic3={"Plano"}
            t3info={item.planos[0]?.nome}
            view={() => handleView(item)}
            delete={() => handleDelete(item)}
            editar={() => handleEdit(item)}
          />
        ))}
      </div>
      {showModalView && (
        <div className="modal show d-block" tabIndex="-1">
          <div
            className="modal-backdrop show"
            onClick={handleCloseModalView}
          ></div>
          <VisualizarLista item={selectedItem} onClose={handleCloseModalView} />
        </div>
      )}
      {showModalDelete && (
        <div className="modal show d-block" tabIndex="-1">
          <div
            className="modal-backdrop show"
            onClick={handleCloseModalDelete}
          ></div>
          <DeleteModal
            item={selectedItem}
            onClose={handleCloseModalDelete}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}
      {showModalEdit && (
        <>
          {/* Fundo escuro */}
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"></div>

          {/* Modal centralizado */}
          <div className="d-flex justify-content-center align-items-center w-100 h-100 position-fixed z-3 top-0 end-0">
            <Editar fechar={() => setShowModalEdit(false)} />
          </div>
        </>
      )}
    </>
  );
};
