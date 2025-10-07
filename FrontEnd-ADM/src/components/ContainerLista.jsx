import React from "react";

export const ContainerLista = (props) => {
  return (
    <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-column rounded-4 px-3 py-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="m-0 fw-bold fs-5">{props.topico}</p>
          <p className="small">{props.desc}</p>
        </div>
        <button className="btn btn-dark py-1 px-3 rounded-3">
          <div
            className="d-flex flex-row align-items-center"
            onClick={props.ModalOpen}
          >
            <i className="bi bi-person-plus-fill text-primary fs-3 me-2"></i>{" "}
            <b className="fs-5" onClick={props.ModalOpen}>
              Cadastrar
            </b>
          </div>
        </button>
      </div>

      {props.lista}
    </div>
  );
};
