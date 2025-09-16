import React from 'react'
import { CardStatusProjetoDashboard } from '../components/CardStatusProjetoDashboard'
import { ProjetosRecentes } from '../components/ProjetosRecentes'


const DashboardGeral = () => {



  return (
    <div className='container mt-5'>
      <div className='align-align-items-start justify-content-start'>
        <h1 className='fw-bolder'>Dashboard</h1>
        <h5 className='fw-normal'>Gerencie seus projetos elétricos e verificações de conformidade</h5>
      </div>
    

          <div className='d-flex gap-3 my-4'>

            <CardStatusProjetoDashboard
              status={"Projetos Totais"}
              iconeStatus={"bi bi-file-earmark-text"}
              num={"24"}
              desc={"+2 desde o último mês"}
            />

            <CardStatusProjetoDashboard
              status={"Aprovados"}
              iconeStatus={"bi bi-check2-circle"}
              num={"18"}
              desc={"75% de aprovação"}
            />

            <CardStatusProjetoDashboard
              status={"Pendentes"}
              iconeStatus={"bi bi-exclamation-triangle"}
              num={"6"}
              desc={"Aguardando revisão"}
            />

            <CardStatusProjetoDashboard
              status={"Economia"}
              iconeStatus={"bi bi-graph-up"}
              num={"R$ 12.5k"}
              desc={"Em custos evitados"}
            />
          

          </div>


      {/* Projetos Recentes */}
        <div className='p-3 rounded-4 border shadow mb-4'>
            <h4 className='fw-bold'>Projetos Recentes</h4>
               <p>Seus últimos projetos verificados</p>

               {/* Projetos */}
               <ProjetosRecentes 
                  nomeProjeto={'Residencial Vila Belmiro'}
                  tempoProjeto={'2 dias atrás'}
                  statusProjeto={'Aprovado'}
                 />

                 <ProjetosRecentes 
                  nomeProjeto={'Centro Comercial'}
                  tempoProjeto={'5 dias atrás'}
                  statusProjeto={'Aprovado'}
                 />

                 <ProjetosRecentes 
                  nomeProjeto={'SENAI 721'}
                  tempoProjeto={'1 semana atrás'}
                  statusProjeto={'Aprovado'}
                 />
        </div>


    <div className='d-flex gap-3'>

        <div className='p-3 rounded-4 border shadow w-50'>
            <h4 className='fw-bold'>Novo Projeto</h4>
            <p>Faça upload de um novo projeto para verificação</p>
            <button className='btn btn-primary fw-semibold rounded-3 col-12'>Fazer Upload</button>
        </div>
        
        <div className='p-3 rounded-4 border shadow w-50'>
            <h4 className='fw-bold'>Relatórios</h4>
            <p>Visualize relatórios detalhados de conformidade</p>
            <button className='btn border fw-semibold rounded-3 col-12'>Ver Relatórios</button>
        </div>

    </div>
    
    
    
    
    </div>
  )
}

export default DashboardGeral