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
          <p className="fw-bold">Nome no Cartão</p>
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
          <p className="fw-bold">Número do cartão</p>
          <input
            className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
            style={{ color: "var(--text)" }}
            type="number"
            name="numeroCard"
            id="#numeroCard"
            placeholder="0000 0000 0000 0000"
          />
        </div>
        <div className='d-flex gap-2 align-items-center w-50'>
        <div className='flex-grow-1 position-relative'>
        <p className="fw-bold">Validade</p>
          <input
            className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
            style={{ color: "var(--text)" }}
            type="month"
            name="validadeCard"
            id="#validadeCard"
            placeholder="MM/AAAA"
            onChange={(e) => {
                const [year, month] = e.target.value.split('-');
                console.log(`${month}/${year}`);
              }}
          />
            </div>
            <div className='flex-grow-1 position-relative'>
            <p className="fw-bold">Número do cartão</p>
          <input
            className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
            style={{ color: "var(--text)" }}
            type="number"
            name="cvvCard"
            id="#cvvCard"
            placeholder="123"
          />
            </div>
            </div>
            <div className="flex-grow-1 position-relative">
          <p className="fw-bold">Nome no Cartão</p>
          <input
            className="form-control bg-light text-dark border-1 border-secondary rounded-2 "
            style={{ color: "var(--text)" }}
            type="number"
            name="CpfCard"
            id="#CpfCard"
            placeholder="000.000.000-00"
            onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  
                // Aplica a máscara do CPF: 000.000.000-00
                if (value.length <= 11) {
                  value = value.replace(/(\d{3})(\d)/, '$1.$2');
                  value = value.replace(/(\d{3})(\d)/, '$1.$2');
                  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                }
                
                e.target.value = value;
              }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
