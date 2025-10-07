import React from 'react'
import { TabelaGeral } from '../components/TabelaGeral'
import { ContainerLista } from '../components/ContainerLista'
import { ListaPlanos } from '../components/ListaPlanos'
import planos from '../apis/planos'


const GerenciamentoPlanos = () => {

    const faturamentoTotal = planos.reduce(( valorAnt, plano ) => {
        return valorAnt + (plano.preco * plano.totalUsuarios)
    }, 0)
  return (
    <div className='container py-5'>
        <h3 className='text-capitalize fw-bold text-start m-0'>Administração de planos</h3>
        <p className='fs-6 fw-light'>Ler, criar, editar e excluir cadastro de planos</p>

    <div className='d-flex flex-column gap-3'>
    <TabelaGeral
    topic1={"Cadastros Totais"}
    t1info={planos.length}

    topic2={"Faturamento Atual"}
    t2info={"R$" + faturamentoTotal.toFixed(2)}

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