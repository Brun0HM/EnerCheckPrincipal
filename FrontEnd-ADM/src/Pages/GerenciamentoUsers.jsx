import React from "react";
import { TabelaGeral } from "../components/TabelaGeral";
import { ContainerLista } from "../components/ContainerLista";
import usuarios from "../apis/usuarios";
import { ListaUsers } from "../components/ListaUsers";
import { useState } from "react";
import Modal from "../components/Modal";

const GerenciamentoUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>

    <div className='container'>
      <h3 className='text-capitalize fw-bold text-start m-0'>Administração de usuários</h3>
      <p className='fs-6 fw-light'>Ler, criar, editar e excluir cadastro de usuários</p>
    <div className='d-flex flex-column'>

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
    
    />

    </div>
    
    </div>
    </>
  );
};

export default GerenciamentoUsers;
