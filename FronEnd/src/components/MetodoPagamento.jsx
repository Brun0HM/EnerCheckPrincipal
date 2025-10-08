import React from 'react'

const MetodoPagamento = (props) => {
  return (
    <div className='mt-3'>

    <div
      className="d-flex flex-row justify-content-start align-items-start border border-2 border-dark border-opacity-10 p-1 rounded-2 ms-2 btn"
      style={{
        // Aplicação das variáveis CSS para tema dinâmico
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        color: "var(--text)",
        transition: "all 0.3s ease", // Transição suave para mudança de tema
      }}
      onClick={props.onClick}
    >
     <div className={`ms-3 mt-2 ${props.display}`}>
  <i className="bi bi-circle-fill" style={{ fontSize: '8px', color: 'var(--text)' }}></i>
</div>
 <div className='ms-4 '>
          <div
            className="p-1 pe-2 ps-2 rounded-3 align-items-center justify-content-center"
            style={{
              width: "30px",
              height: "30px"
            }}
          >
            {/* Ícone com cor primária do tema */}
            <i
              className={`${props.icon} fs-5`}
              style={{ color: "var(--primary)" }}
            ></i>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center ">
                <div>
                  <p className="m-0 fw-bold fs-6 text-start ms-3">{props.titulo}</p>
                  <p className="small text-start ms-3">{props.exemplo}</p>
                </div>
              </div>
    </div>
  </div>
  )
}

export default MetodoPagamento