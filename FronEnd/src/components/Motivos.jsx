import React from "react";

const Motivos = (props) => {
  return (
    <div
      style={{
        
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-start bg-white border border-2 p-3 rounded-4">
        <div>
          <div
            className="zulzinho p-1 pe-2 ps-2 rounded-3 d-inline-flex align-items-center justify-content-center"
            style={{ width: "48px", height: "48px" }}
          >
            <i className={`${props.icon} text-primary fs-5`}></i>
          </div>
        </div>
        <div className="text-start">
          <h5 className="fw-semibold text-black text-capitalize mt-3">{props.title}</h5>
          <p className="text-secondary fs-5">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Motivos;
