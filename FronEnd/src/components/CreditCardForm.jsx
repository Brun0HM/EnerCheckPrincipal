import React from "react";

const CreditCardForm = (props) => {
  return (
    <div className={`container ${props.display}`}>
      <div className="ms-1 align-items-start">
        <h3
          className=" fs-5 fw-bolder text-start"
          style={{ color: "var(--text)" }}
        >
          Dados do Cartão
        </h3>
      </div>
      <div>
        <div className="flex-grow-1 position-relative">
          <p className="fw-bold mb-0 mt-2 text-start">Nome no Cartão</p>
          <input
            className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
            style={{ color: "var(--text)" }}
            type="text"
            name="nomeCard"
            id="#nomeCard"
            placeholder="Nome como está no cartão"
          />
        </div>
        <div className="flex-grow-1 position-relative">
          <p className="fw-bold mb-0 mt-2 text-start">Número do cartão</p>
          <input
            className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
            style={{ color: "var(--text)" }}
            type="number"
            name="numeroCard"
            id="#numeroCard"
            placeholder="0000 0000 0000 0000"
          />
        </div>
        <div className='d-flex flex-column flex-md-row gap-2 align-items-center'>
  <div className='col-12 col-md-6 position-relative'>
    <p className="fw-bold mb-0 mt-2 text-start">Validade</p>
    <input
      className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
      style={{ color: "var(--text)" }}
      type="month"
      name="validadeCard"
      id="#validadeCard"
      placeholder="MM/AAAA"
      min={new Date().toISOString().slice(0, 7)}
      onChange={(e) => {
        const selectedDate = new Date(e.target.value + '-01');
        const currentDate = new Date();
        currentDate.setDate(1);
        
        if (selectedDate < currentDate) {
          alert('A validade do cartão não pode ser anterior à data atual');
          e.target.value = '';
          return;
        }
        
        const [year, month] = e.target.value.split('-');
        console.log(`${month}/${year}`);
      }}
    />
  </div>
  
  <div className='col-12 col-md-6 position-relative'>
    <p className="fw-bold mb-0 mt-2 text-start">CVV</p>
    <input
      className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
      style={{ color: "var(--text)" }}
      type="number"
      name="cvvCard"
      id="#cvvCard"
      placeholder="123"
      maxLength="4"
    />
  </div>
</div>
            <div className="flex-grow-1 position-relative">
          <p className="fw-bold mb-0 mt-2 text-start">CPF do titular</p>
          <input
            className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
            style={{ color: "var(--text)" }}
            type="text"
            name="CpfCard"
            id="#CpfCard"
            maxLength={'14'}
            minLength={'11'}
            placeholder="000.000.000-00"
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
              // Aplica a máscara do CPF em tempo real
              if (value.length <= 11) {
                if (value.length > 6) {
                  value = value.replace(/(\d{3})(\d{3})(\d{1,5})/, '$1.$2.$3');
                } else if (value.length > 3) {
                  value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
                }
                // Adiciona o hífen quando tem mais de 9 dígitos
                if (value.length > 11) {
                  value = value.replace(/(\d{3}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2');
                }
              }
              
              e.target.value = value;
            }}
          />
        </div>
        <div>
        <hr className='fs-2'    style={{
      color: "var(--text)"
    }}/>
       </div>
       <div className='mt-3'>

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
  >Confirmar Pagamento</button>
</div>
<div className="mt-3 mb-3">
  <span className="small text-start ms-0">Ao confirmar você concorda com nossos <a href="" className="text-decoration-none">Termos de Serviço</a> e <a href="" className="text-decoration-none">Políticas de Privacidade</a></span>
</div>
      </div>
    </div>
  );
};

export default CreditCardForm;
