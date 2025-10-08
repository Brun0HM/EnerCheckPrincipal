import React from 'react'


const FinalizarEscolhaAssinatura = () => {
  return (
    <div
    style={{
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100vh",
      paddingBottom: "2rem",
    }}
  >
       <div className="container-fluid text-center d-flex flex-column align-items-center justify-content-center">
        <div className={`mainContent`}>
          <div className="container text-center d-flex flex-column align-items-center justify-content-center px-3">
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
          </div>
          </div>
          </div>
    </div>
  )
}

export default FinalizarEscolhaAssinatura