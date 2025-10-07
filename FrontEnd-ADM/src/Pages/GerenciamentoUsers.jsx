import React from 'react'
import { TabelaGeral } from '../components/TabelaGeral'
import { ContainerLista } from '../components/ContainerLista'
import usuarios from '../apis/usuarios'
import { ListaUsers } from '../components/ListaUsers'


const GerenciamentoUsers = () => {
  return (
    <>

    <div className='container py-5'>
      <h3 className='text-capitalize fw-bold text-start m-0'>Administração de usuários</h3>
      <p className='fs-6 fw-light'>Ler, criar, editar e excluir cadastro de usuários</p>
    <div className='d-flex flex-column gap-3'>

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
  )
}

export default GerenciamentoUsers