import React, { useEffect, useMemo, useState } from "react";
import { TabelaGeral } from "../components/TabelaGeral";
import { ContainerLista } from "../components/ContainerLista";

import { ListaUsers } from "../components/ListaUsers";
import Modal from "../components/Modal";
import apiService from "../../../FronEnd/services/api";
import { ToastContainer, toast } from "react-toastify";
import { ListaPlanos } from "../components/ListaPlanos";
import apiUser from "../apis/usuarios";

const GerenciamentoUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [executado, setExecutado] = useState(false);
  const [busca, setBusca] = useState("");

  const dadosFiltrados = useMemo(() => {
    if (!busca) return usuarios;
    const textoBusca = busca.toLowerCase().trim();
    return usuarios.filter((usuario) => {
      const nome = usuario?.nome?.toLowerCase();
      const email = usuario?.email?.toLowerCase();
      const empresa = usuario?.empresa?.toLowerCase();
      return (
        nome.includes(textoBusca) ||
        email.includes(textoBusca) ||
        empresa.includes(textoBusca)
      );
    });
  }, [usuarios, busca]);

  const listarUsers = async () => {
    try {
      const response = await apiService.getUser();
      setUsuarios(response);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    }
  };

  useEffect(() => {
    listarUsers();
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mt-2 pt-2 mb-3 pb-3">
        <div className="flex-shrink-0 mb-3">
          <h3 className="text-capitalize fw-bold text-start m-0">
            Administração de usuários
          </h3>
          <p className="fs-6 fw-light">
            Ler, criar, editar e excluir cadastro de usuários
          </p>
        </div>
        <div className="d-flex flex-column gap-2 gap-md-5 overflow-hidden">
          <input
          placeholder="Pesquise por nome, email ou empresa..."
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="col-3  rounded-2 border-2 bg-body-tertiary"
          ></input>
          <TabelaGeral topic1={"Cadastros Totais"} t1info={usuarios.length} />
          <ContainerLista
            topico={"Listagem de usuários"}
            desc={"gerencie os usuários disponíveis"}
            getLista={listarUsers}
            lista={
              <ListaUsers filteredData={dadosFiltrados} getLista={listarUsers} />
            }
            ModalOpen={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {isModalOpen && (
        <>
          {/* Fundo escuro */}
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"></div>

          {/* Modal centralizado */}
          <div className="d-flex justify-content-center align-items-center w-100 h-100 position-fixed z-3 top-0">
            <Modal fechar={() => setIsModalOpen(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default GerenciamentoUsers;
