import React from "react";

const Depoimentos = (props) => {
  return (
    <div>
      <div className="">
        <div className="card h-100 p-3  pt-4 pe-4 rounded-4 border-1  shadow">
          <div className="card-body d-flex flex-column">
            <div className="d-flex mt-2">
              <i className="bi bi-star-fill text-primary fs-5"></i>
              <i className="bi bi-star-fill text-primary fs-5"></i>
              <i className="bi bi-star-fill text-primary fs-5"></i>
              <i className="bi bi-star-fill text-primary fs-5"></i>
              <i className="bi bi-star-fill text-primary fs-5"></i>
            </div>
            <p className="card-tex flex-grow-1 text-start mt-1">
              {props.depoimento}
            </p>
            <div className="d-flex align-items-center">
              <img
                src={props.foto}
                alt={props.user}
                className="rounded-circle circulozinho"
              />
              <div className="ms-3 text-start">
                <span className="card-title fs-5 fw-bold">{props.user}</span>
                <p className="fs-6 card-subtitle text-body-secondary">
                  {props.profissa}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depoimentos;
