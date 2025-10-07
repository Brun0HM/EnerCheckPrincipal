import React from 'react'
import Search from '../components/Search'
import ListaProjetos from '../components/ListaProjetos'
import { ContainerLista } from '../components/ContainerLista'



const GerenciamentoIa = () => {
  return (
     <>
        <div className='container mt-2 pt-2 mb-3 pb-3'>
            <h3 className='text-capitalize fw-bold text-start m-0'>Monitoramento de uso da IA</h3>
            <p className='fs-6 fw-light'>Dashboard com métricas de utilização da IA do projeto</p>
    
        <div className='d-flex flex-column overflow-hidden'>
        <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-column rounded-4 px-3 py-3">
<Search/>
        <ContainerLista 
        topico={"Listagem Detalhada de Requisições"}
        desc={"Histórico completo de requisições processadas"}
        lista={<ListaProjetos />}
        />
        </div>
        </div>
        </div>
        </>
  )
}

export default GerenciamentoIa