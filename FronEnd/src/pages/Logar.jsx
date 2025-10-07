import React from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router";

const Logar = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="mb-3">
        <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
          <img src="https://placehold.co/40x40" alt="" />
          <h3 className="fw-bold m-0">EnerCheck</h3>
        </div>
        <p className="fs-5">Faça seu login em sua conta</p>
      </div>
      <Login />
      <div className="d-flex flex-column justify-content-center align-items-center mt-3">
        <div className="d-flex gap-1 justify-content-center align-items-center mt-3 fs-5">
          <p className="m-0">Não tem uma conta?</p>
          <a
            className="text text-decoration-none"
            onClick={() => navigate("/cadastro")}
            style={{ cursor: "pointer" }}
          >
            Criar conta
          </a>
        </div>
        <div
          className="d-flex align-items-center mt-3 text-muted w-100"
          style={{ maxWidth: "300px" }}
        >
          <hr className="flex-grow-1" />
          <span className="px-3">OU CONTINUE COM</span>
          <hr className="flex-grow-1" />
        </div>
        <div className="d-flex mt-3 gap-2">
          <button className="btn btn-outline-dark" style={{ width: "140px" }}>
            <i className="bi bi-microsoft me-2"></i>Microsoft
          </button>
          <button className="btn btn-outline-dark" style={{ width: "140px" }}>
            <i className="bi bi-google me-2"></i>Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logar;
