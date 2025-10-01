import React from 'react'
import { TabelaGeral } from '../components/TabelaGeral'
import { ContainerLista } from '../components/ContainerLista'
import { ListaPlanos } from '../components/ListaPlanos'


const GerenciamentoPlanos = () => {
  return (
    <>
    <div className='container'>
        <h3 className='text-capitalize fw-bold text-start m-0'>Administração de planos</h3>
        <p className='fs-6 fw-light'>Ler, criar, editar e excluir cadastro de planos</p>

    <div className='d-flex flex-column'>
    <TabelaGeral
    topic1={"Cadastros Totais"}
    t1info={"9"}

    topic2={"Tópico 2"}
    t2info={"67"}

    topic3={"Tópico 3"}
    t3info={"41"}
    />
    <ContainerLista 
    topico={"lorem ipsum dolor sit amet"}
    desc={"lorem ipsum dolor doloris"}
    lista={<ListaPlanos />}
    />


    </div>
    </div>
    </>
  )
}

export default GerenciamentoPlanos