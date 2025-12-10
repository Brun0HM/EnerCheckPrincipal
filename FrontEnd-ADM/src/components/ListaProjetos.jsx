import React, { useEffect, useState } from "react";

import { ComponenteLista } from "./ComponenteLista";
import VisualizarLista from "./VisualizarLista";
import DeleteModal from "./DeleteModal";
import Editar from "./Editar";
import apiService from "../../../FronEnd/services/api";

const ListaProjetos = ({ paginatedData, filteredData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const getProjetos = async () => {
    setCarregando(true)
    try {
      const dados = await apiService.getProjetos();
      if (Array.isArray(dados)) {
        console.log("os projetinho: " , dados)
      } 
    } catch (error) {
      console.log(("ah deu erro ai: ", error))
    } finally {
      setCarregando(false)
    }

  };

  const formatarData = (data) => {
    if (!data) return "Data inválida"; // Verifica se a data é válida
    const dataObj = new Date(data); // Converte a string em um objeto Date
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h12"
    }).format(dataObj); // Formata a data no padrão brasileiro (DD/MM/AAAA)
  };

  useEffect(() => {
    getProjetos();
    
  }, []);
  // Usar dados filtrados se fornecidos, senão usar dados paginados, senão usar todos os dados
  const dataToRender = filteredData || paginatedData;

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
    {carregando ? <div className="d-flex flex-column align-items-center text-center gap-3 mt-5">
            <div
              style={{ width: "5rem", height: "5rem" }}
              className="spinner-border text-primary align-self-center fs-2"
            >
              {" "}
            </div>
            <p>Carregando Informações...</p>
          </div> 
          :  <div
          className="d-flex flex-column gap-2 rounded-4"
          style={{ maxHeight: "500px" }}
        >
          {dataToRender.map((item) => (
          
            <ComponenteLista
              key={item.id}
              nome={item.nome}
              desc={item.email}
              display1={"d-lg-block d-none"}
              topic1={"Descrição"}
              t1info={item.descricao}
              topic3={"Data Início"}
              t3info={formatarData(item.dataInicio)}
              topic4={"Status"}
              t4info={item.status}
              view={() => handleView(item)}
              delete={() => handleDelete(item)}
              sumiu={item.sumiu}
              editar={() => handleEdit(item)}
            />
          ))}
        </div> }
      

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
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"></div>
          <div className="d-flex justify-content-center align-items-center w-100 h-100 position-fixed z-3 top-0 end-0">
            <Editar fechar={() => setShowModalEdit(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default ListaProjetos;
