import React, { useEffect, useState } from "react";

import { ComponenteLista } from "./ComponenteLista";
import VisualizarLista from "./VisualizarLista";
import DeleteModal from "./DeleteModal";
import Editar from "./Editar";
import { toast, ToastContainer } from "react-toastify";
import apiPlanos from "../apis/planos";

export const ListaPlanos = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const planos = (props.plano);


  const [carregando, setCarregando] = useState(false);

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
    
  const alerta = () => toast.success("Plano deletado com sucesso.",{
    position: "bottom-right",
    className: "bg-success text-light",
    autoClose: 3000,
  })
    const id = selectedItem.planoId;
    if (id) {
      try {
        console.log(`Excluindo item com ID: ${id}`);
        await apiPlanos.deletePlano(id);
        setShowModalDelete(false);
        alerta();
        
      } catch (error) {
        console.log("Erro ao deletar plano: " , error);
      }
    } else {
      console.log("não foi possível obter o ID do plano para exclusão.");
    }
  };

  const listarPlanos = async () => {
    setCarregando(true);
    try {
      if (planos) {
        console.log("planos carregados!")
      }
    } catch (e) {
      console.log("Plano nao carregou: ", e);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    listarPlanos();
  }, []);

  return (
    <>
        <ToastContainer></ToastContainer>
      <div
        className="d-flex flex-column gap-2 overflow-y-auto rounded-4 "
        style={{ maxHeight: "500px" }}
      >
        {!planos ? (
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
          planos.map((plano) => (
            <ComponenteLista
              key={plano.planoId}
              nome={plano.nome}
              topic1={"Preço"}
              t1info={plano.preco}
              topic2={"Requisições"}
              t2info={plano.quantidadeReq}
              topic3={"Usuários cadastrados"}
              t3info={plano.quantidadeUsers > 0 ? plano.quantidadeUsers : <span className="alert alert-warning py-0 px-2">Sem usuários</span>}
              view={() => handleView(plano)} // nesses handles, o .map vai passar o plano COMPLETO
              delete={() => handleDelete(plano)} // é bom comentar isso pq eu fiquei perdido desde o inicio tentando entender
              editar={() => handleEdit(plano)}
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
            endpointDelete={handleConfirmDelete}
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
