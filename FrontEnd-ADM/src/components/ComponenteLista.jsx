import React from "react";

export const ComponenteLista = (props) => {
  return (
    <div className="border border-2 border-dark border-opacity-10 d-flex flex-row justify-content-between rounded-4 px-3 py-4">
      
      <div className="d-flex flex-column col-4 col-md-2">
        <p className="m-0 fw-medium fs-5   col-10 text-truncate">{props.nome}</p>
        <p className="m-0 small text-truncate col-md-12 col " >{props.desc}</p>
      </div>

      {props.topic1 && (
        <div
          className={`col-2 d-flex flex-column gap-0 align-items-center justify-content-center ${props.display1}`}
        >
          <p className="m-0 fw-medium fs-5 text-primary">{props.topic1}</p>
          <p className={`fw-semibold m-0  ${props.t1info.length >= 8 && "text-truncate"}`}>{props.t1info}</p>
        </div>
      )}

      {props.topic2 && (
        <div className=" col-2 d-flex flex-column gap-0 align-items-center d-lg-block d-none justify-content-center">
          <p className="m-0 fw-medium fs-5 text-primary">{props.topic2}</p>
          <p className={`fw-semibold m-0 ${props.t2info.length > 20 && "text-truncate"}`}>{props.t2info}</p>
        </div>
      )}

      {props.topic3 && (
        <div className=" col-2 d-flex flex-column gap-0 align-items-center d-lg-block d-none justify-content-center">
          <p className="m-0 fw-medium fs-5 text-primary">{props.topic3}</p>
          <p className="fw-semibold m-0">{props.t3info}</p>
        </div>
      )}

      {props.topic4 && (
        <div className="col-md-2 col d-flex flex-column gap-0 align-items-center justify-content-center">
          <p className="m-0 fw-medium fs-5 text-primary">{props.topic4}</p>
          <p className="fw-semibold m-0">{props.t4info}</p>
        </div>
      )}

      {props.topic5 && (
        <div className="col-md-1 col d-flex flex-column gap-0 align-items-center justify-content-center">
          <p className="m-0 fw-medium fs-5 text-primary">{props.topic5}</p>
          <p className="fw-semibold m-0">{props.t5info}</p>
        </div>
      )}

      <div className="col-md-2 col d-flex flex-row gap-2 align-items-center justify-content-center">
        <i
          className="btn bi bi-trash-fill text-danger"
          onClick={props.delete}
        ></i>
        <i
          className=" btn bi bi-pencil-fill text-warning"
          onClick={props.editar}
        ></i>
        <i className=" btn bi bi-eye-fill text-info " onClick={props.view}></i>
      </div>
    </div>
  );
};
