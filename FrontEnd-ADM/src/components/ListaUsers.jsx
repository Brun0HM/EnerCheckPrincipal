import React, { useEffect, useState } from "react";

import { ComponenteLista } from "./ComponenteLista";
import VisualizarLista from "./VisualizarLista";
import DeleteModal from "./DeleteModal";
import Editar from "./Editar";
import apiService from "../../../FronEnd/services/api";
import { toast, ToastContainer } from "react-toastify";

export const ListaUsers = (props) => {
  const { paginatedData } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Usar dados paginados se fornecidos, senão usar todos os dados

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

  const handleConfirmDelete = async () => {
    setErro("");

    const alerta = () =>
      toast.success("Usuário deletado com sucesso.", {
        position: "bottom-right",
        className: "bg-primary text-light",
        autoClose: 3000,
        progressClassName: "text-light bg-success-subtle",
      });

    const id = selectedItem.id;
    if (id) {
      try {
        await apiService.deleteUser(id);
        console.log(`Excluindo item com ID: ${id}`);
        setShowModalDelete(false);
        alerta();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } catch (error) {
        console.log("Ocorreu um erro ao deletar o usuário: ", error);
        setErro(error);
        toast.update(alerta, {
          render:
            "Erro ao acessar a API. cheque o console para mais informações",
          type: "danger",
          className: "bg-danger text-light",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div
        className="d-flex flex-column gap-2 rounded-4"
        style={{ maxHeight: "500px" }}
      >
        {!paginatedData || paginatedData.length === 0 ? (
          <div className="d-flex flex-column align-items-center text-center gap-3 mt-5">
            <div
              style={{ width: "5rem", height: "5rem" }}
              className="spinner-border text-primary align-self-center fs-2"
            >
              {" "}
            </div>
            <p>Carregando Informações...</p>
          </div>
        ) : !carregando ? (
          paginatedData.map((usuario) => (
            <ComponenteLista
              key={usuario.id}
              nome={usuario.nome}
              desc={usuario.email}
              topic1={"CREA"}
              t1info={usuario.crea}
              topic2={"Empresa"}
              t2info={usuario.empresa || "Nenhuma"}
              topic3={"Plano"}
                  t3info={usuario.plano?.nome || "Não Cadastrado"} // item.planos[0]?.nome}
              view={() => handleView(usuario)} // nesses handles, o .map vai passar o usuário COMPLETO.
              delete={() => handleDelete(usuario)} // é bom comentar isso pq eu fiquei perdido desde o inicio tentando entender
              editar={() => handleEdit(usuario)}
            />
          ))
        ) : (
          <div className="d-flex flex-column align-items-center text-center gap-3 mt-5">
            <div
              style={{ width: "5rem", height: "5rem" }}
              className="spinner-border text-primary align-self-center fs-2"
            >
              {" "}
            </div>
            <p>Carregando Informações...</p>
          </div>
        )}
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
