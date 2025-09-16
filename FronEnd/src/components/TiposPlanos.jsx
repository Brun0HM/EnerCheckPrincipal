import React from "react";

const TiposPlanos = (props) => {
  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="card m-3" style={{ width: "18rem" }}>
          <div className="mt-4">
            <i
              className={`${props.icon} text-primary p-2 ps-3 pe-3 rounded  zulzinho fs-5`}
            ></i>
          </div>
          <div>
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">{props.title}</h5>
              <p className="card-text text-secondary">{props.desgracao}</p>
              <div>
                <h2 className="fw-bold">{props.preco}</h2>
                <span className="text-secondary fw-semibold">/mês</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-2 p-3">
            {props.itens.map((item, index) => (
              <div
                key={index}
                className="d-flex gap-2 align-items-center justify-content-center"
              >
                <i className="bi bi-check-circle text-primary"></i>
                <span className="text-dark">{item}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-dark mb-4 w-75 mx-auto">
            Escolher {props.title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TiposPlanos;
