import React, { useEffect, useState } from "react";
import planos from "../apis/planos";
import { ComponenteLista } from "./ComponenteLista";
import VisualizarLista from "./VisualizarLista";
import DeleteModal from "./DeleteModal";
import Editar from "./Editar";
import apiPlanos from "../apis/planos";
export const ListaPlanos = ({paginatedData}) => {
   const [selectedItem, setSelectedItem] = useState(null);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

  const [planos, setPlanos] = useState([]);
  const [carregando, setCarregando] = useState(false)

       // Usar dados paginados se fornecidos, senão usar todos os dados
       const dataToRender = paginatedData
  
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
    };
    const handleEdit = (item) => {
      setSelectedItem(item);
      setShowModalEdit(true);
    };
  
    const handleConfirmDelete = (itemId) => {
      console.log(`Excluindo item com ID: ${itemId}`);
    }

    const listarPlanos = async () => {

      try {
        setCarregando(true)
        const dados = await apiPlanos.listagemPlanos()
        setPlanos(dados);
      } catch (e) {
        console.log("Erro ao utilizar a api: ", e)
      } finally {
        setCarregando(false)
      }
    }

   useEffect(() => {

    listarPlanos();
   

   },[])
    
    
    
  return (
    <>
    <div
      className="d-flex flex-column gap-2 overflow-y-auto rounded-4"
      style={{ maxHeight: "500px" }}
    >
      {planos && planos.map((item) => (
        <ComponenteLista
          key={item.planoId}
          nome={item.nome}
          topic1={"Preço"}
          t1info={item.preco}
          topic2={"Requisições"}
          t2info={item.quantidadeReq}
          topic3={"Ativo?"}
          t3info={item.ativo ? "Sim" : "Não"}
          view={()=> handleView(item)}
          delete={() => handleDelete(item)}
          editar={() => handleEdit(item)}
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
