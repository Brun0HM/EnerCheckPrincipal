import React, { useState } from "react";
import { TabelaGeral } from "../components/TabelaGeral";
import { ContainerLista } from "../components/ContainerLista";
import usuarios from "../apis/usuarios";
import { ListaUsers } from "../components/ListaUsers";
import Modal from "../components/Modal";

const GerenciamentoUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="container">
        <h3 className="text-capitalize fw-bold text-start m-0">
          Administração de usuários
        </h3>
        <p className="fs-6 fw-light">
          Ler, criar, editar e excluir cadastro de usuários
        </p>
        <div className="d-flex flex-column">
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
            lista={<ListaUsers />}
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
            <Modal modalOpen={() => setIsModalOpen(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default GerenciamentoUsers;
