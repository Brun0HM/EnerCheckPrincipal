import React from 'react'
import ResumoPedido from '../components/ResumoPedido'
import MetodoPagamento from '../components/MetodoPagamento'
import { useState } from 'react';


const FinalizarEscolhaAssinatura = () => {
      const [activePage, setActivePage] = useState("/");
  return (
    <div
    style={{
      backgroundColor: "var(--background)",
      color: "var(--text)",
      minHeight: "100vh",
      paddingBottom: "2rem",
    }}
  >
    <div className="w-100 text-center d-flex flex-column align-items-center justify-content-center">
      <div className={`mainContent w-75`}>
        <div className="text-center d-flex flex-column align-items-center justify-content-center px-3">
          <div className="container">
            <div>
              <h2 className="fw-bold display-3 display-md-3 display-sm-4 display-xs-5">
                Finalize a sua Assinatura
              </h2>
            </div>
            <div className="my-4 px-2">
              <span className="text-break fs-6 fs-md-5">
                Complete os dados de pagamento para começar a usar o EnerCheck
              </span>
            </div>
          </div>

          <div className='w-100 d-flex flex-column flex-lg-row gap-4 align-items-stretch px-2 px-lg-3'>
            <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-column rounded-4 px-3 py-3 col-12 col-lg-7">
              <div className="d-flex justify-content-between align-items-center ">
                <div>
                  <p className="m-0 fw-bold fs-5 text-start ms-3">Informações de Pagamento</p>
                  <p className="small text-start ms-3">Escolha o método de pagamento e preencha os dados</p>
                </div>
              </div>
       <div>
       <p className="m-0 fw-bold fs-5 text-start ms-3">Método de pagamento</p>
        <MetodoPagamento
        icon="bi bi-credit-card"  
          titulo="Cartão de Crédito"
          exemplo="Elo, Visa, Mastercard"
          />
             <MetodoPagamento
        icon="bi bi-phone"  
          titulo="PIX"
          exemplo="Pagamento Instantâneo"
          />
              <MetodoPagamento
        icon="bi bi-file-earmark-text"  
          titulo="Boleto Bancário"
          exemplo="Vencimento em três dias úteis"
          />
     <hr className='fs-2'    style={{
      color: "var(--text)"
    }}/>
       </div>
            </div>
            
            <div className="col-12 col-lg-3 p-4 border border-3 rounded-4 shadow h-100">
              <ResumoPedido />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default FinalizarEscolhaAssinatura