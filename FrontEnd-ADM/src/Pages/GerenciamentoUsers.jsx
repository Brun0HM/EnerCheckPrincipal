import React, { useEffect, useState } from "react";
import { TabelaGeral } from "../components/TabelaGeral";
import { ContainerLista } from "../components/ContainerLista";

import { ListaUsers } from "../components/ListaUsers";
import Modal from "../components/Modal";
import apiService from "../../../FronEnd/services/api";
import { ToastContainer, toast } from "react-toastify";

const GerenciamentoUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const listarUsers = async () => {
    setCarregando(true);
    setUsuarios("");
    const notificacao = toast.loading(" Carregando dados...", {
      position: "bottom-right",
      className: "bg-primary text-light"
    });
    try {
      const dados = await apiService.getUser();
      if (dados) setUsuarios(dados);
      if (usuarios) {
        toast.update(notificacao, {
          render: "Dados Carregados!",
          type: "success",
          className: "bg-success text-light border border-2 border-light",
          isLoading: false,
          autoClose: 2000,
          progressClassName: "text-light bg-success-subtle"
        });
      }
    } catch (error) {
      console.log("Erro ao buscar usuarios: " + error);
      toast.update(notificacao, {
        render: "Erro ao acessar a API. cheque o console para mais informações",
        type: "danger",
        className: "bg-danger text-light",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setCarregando(false);
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
        <div className="d-flex flex-column overflow-hidden">
          <TabelaGeral
            topic1={"Cadastros Totais"}
            t1info={usuarios.length}
            topic2={"Tópico 2"}
            t2info={"67"}
            topic3={"Tópico 3"}
            t3info={"41"}
          />
          <ContainerLista
            topico={"Listagem de usuários"}
            desc={"gerencie os usuários disponíveis"}
            lista={<ListaUsers users={usuarios} />}
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
