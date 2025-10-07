import React from "react";

export const ComponenteLista = (props) => {
  return (
    <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-row justify-content-between rounded-4 px-3 py-4">
      <div className="d-flex flex-column gap-0">
        <p className="m-0 fw-medium fs-5">{props.nome}</p>
        <p className="m-0 small">{props.desc}</p>
      </div>

      <div className="d-flex flex-column gap-0 align-items-center">
        <p className="m-0 fw-medium fs-5 text-primary">{props.topic1}</p>
        <p className="fw-semibold m-0">{props.t1info}</p>
      </div>
      <div className="d-flex flex-column gap-0 align-items-center">
        <p className="m-0 fw-medium fs-5 text-primary">{props.topic2}</p>
        <p className="fw-semibold m-0 invisible">{props.t2info}</p>
      </div>

      <div className="d-flex flex-column gap-0 align-items-center">
        <p className="m-0 fw-medium fs-5 text-primary">{props.topic3}</p>
        <p className="fw-semibold m-0">{props.t3info}</p>
      </div>

      <div className="d-flex flex-row gap-3 align-items-center">
        <i className=" bi bi-trash-fill text-danger"></i>
        <i className="bi bi-pencil-fill text-warning"></i>
        <i className="bi bi-eye-fill text-info"></i>
      </div>
    </div>
  );
};
