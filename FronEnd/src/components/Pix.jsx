import React from 'react'

const Pix = (props) => {
  return (
    <div className={`container ${props.display}`}>
       <div
            className="p-1 pe-2 ps-2 rounded-3 align-items-center justify-content-center"
          >
            {/* Ícone com cor primária do tema */}
            <i
              className="bi bi-phone  fs-1"
              style={{ color: "var(--primary)" }}
            ></i>
          </div>
    <div className="ms-1 align-items-center">
      <h3
        className=" fs-5 fw-bolder text-center"
        style={{ color: "var(--text)" }}
      >
      Pagamento Via Pix
      </h3>
    </div>
    <div className="my-4 px-2">
              <span className="text-break fs-6 fs-md-5">
              Após confirmar, você receberá um QR Code para realizar o pagamento instantaneamente
              </span>
            </div>
            
    <div>
        <div>
    <hr className='fs-2'    style={{
      color: "var(--text)"
    }}/>
       </div>
<div
className="d-flex flex-row justify-content-start align-items-start"
style={{
  // Aplicação das variáveis CSS para tema dinâmico
  backgroundColor: "var(--card-bg)",
  borderColor: "var(--card-border)",
  color: "var(--text)",
  transition: "all 0.3s ease", // Transição suave para mudança de tema
}}
onClick={props.onClick}
>
<div className='ms-2 '>
    <div>
      {/* Ícone com cor primária do tema */}
      <i
        className={`bi bi-lock fs-6`}
        style={{ color: "var(--text)" }}
      ></i>
    </div>
  </div>
          <div className="ms-2">
            <p className="small text-start ms-0 ">Pagamento 100% seguro e criptografado</p>
          </div>
</div>
</div>
<div>
<button className="btn btn-dark text-light rounded-2 w-100"
style={{
    backgroundColor: "var(--button-primary-bg)",
    border: "none"
  }}
>Gerar QR Code PIX</button>
</div>
<div className="mt-3 mb-3">
<span className="small text-start ms-0">Ao confirmar você concorda com nossos <a href="" className="text-decoration-none">Termos de Serviço</a> e <a href="" className="text-decoration-none">Políticas de Privacidade</a></span>
</div>
    </div>
);
};

export default Pix