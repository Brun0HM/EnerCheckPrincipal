import React from "react";

export const TabelaGeral = (props) => {
  return (
    <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-row rounded-4  align-items-center justify-content-between px-5 py-3">
      <div className="d-flex flex-column gap-1 align-items-center">
        <span className="fw-medium fs-5">{props.topic1}</span>
        <span className="fw-bold fs-1">{props.t1info}</span>
      </div>
      <div className="d-flex flex-column gap-1 align-items-center">
        <span className="fw-medium fs-5">{props.topic2}</span>
        <span className="fw-bold fs-1">{props.t2info}</span>
      </div>
      <div className="d-flex flex-column gap-1 align-items-center">
        <span className="fw-medium fs-5">{props.topic3}</span>
        <span className="fw-bold fs-1">{props.t3info}</span>
      </div>
    </div>
  );
};
