import React from 'react'
import { TabelaGeral } from '../components/TabelaGeral'
import { ListaUsuarios } from '../components/ListaUsuarios'


const GerenciamentoUsers = () => {
  return (
    <div className='px-3 py-5 w-100 h-100'>
      <h3 className='text-capitalize fw-bold text-start m-0'>Administração de usuários</h3>
      <p className='fs-6 fw-light'>Ler, criar, editar e excluir cadastro de usuários</p>
    <div className='container d-flex flex-column gap-3'>

    <TabelaGeral />
    <ListaUsuarios />

    </div>
    
    </div>
  )
}

export default GerenciamentoUsers