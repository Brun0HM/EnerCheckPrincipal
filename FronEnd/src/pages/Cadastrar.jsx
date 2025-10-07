import React from "react";
import Cadastro from "../components/Cadastro";

const Cadastrar = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 mt-5"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <div className="mt-5"></div>
      <div className="mb-3 mt-5 text-center">
        <div className="mb-2 d-flex justify-content-center align-items-center gap-2 ">
          <img src="https://placehold.co/40x40" alt="" />
          <h3 className="fw-bold m-0">EnerCheck</h3>
        </div>
        <p className="fs-5">Crie uma conta</p>
      </div>
      <Cadastro />
      <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-5"></div>
    </div>
  );
};

export default Cadastrar;
