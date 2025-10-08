import React from "react";

const Editar = (props) => {
  return (
    <>
      <div className=" col-11 col-md-3 border border-2 rounded-4 py-4 shadow bg-white">
        <h3 className="ms-4 fw-bold">Editar Usuario</h3>
        <div className="d-flex flex-column align-items-center gap-4 fw-bold py-3">
          <div className="Name col-11 col-md-10">
            <label htmlFor="">Nome</label>
            <input id="nome" className="form-control" type="text" />
          </div>
          <div className="Email col-11 col-md-10">
            <label htmlFor="">Email</label>
            <input id="email" type="email" className="form-control" />
          </div>
          <div className="CREA col-11 col-md-10">
            <label htmlFor="crea">CREA</label>
            <input id="crea" className="form-control" />
            <div className="invalid-feedback">
              O CREA deve ter exatamente 10 dígitos.
            </div>
          </div>
          <div className="Plano col-11 col-md-10">
            <label htmlFor="plano">Plano</label>
            <select id="plano" className="form-select">
              <option value="" disabled>
                Selecione um plano
              </option>
              <option value="Plano Básico">Plano Básico</option>
              <option value="Plano Pro">Plano Pro</option>
              <option value="Plano Pro">Plano Empresarial</option>
              <option value="Plano Pro">Plano Inicial</option>
            </select>
          </div>
          <div className="col-10 d-flex justify-content-between mt-3">
            <button className="btn btn-primary col-5">Salvar</button>
            <button className="btn btn-outline-dark col-5" onClick={props.fechar}>Cancelar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editar;
