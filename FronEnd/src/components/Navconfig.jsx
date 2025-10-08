import React, { useState } from "react";

const Navconfig = () => {
  const [activeItem, setActiveItem] = useState(""); // Estado para controlar o item ativo

  const handleItemClick = (item) => {
    setActiveItem(item); // Define o item ativo
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="bg-secondary d-flex bg-opacity-10 rounded-3 p-1">
          <div
            className={`d-flex gap-1 px-5 fs-6 rounded-2 align-items-center ${
              activeItem === "perfil" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleItemClick("perfil")} // Define "perfil" como ativo
          >
            <i className="bi bi-person my-1 ps-3 fw-semibold"></i>
            <p className="my-1 user-select-none pe-3 fw-semibold">Perfil</p>
          </div>
          <div
            className={`d-flex gap-1 px-5 fs-6 rounded-2 align-items-center ${
              activeItem === "seguranca" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleItemClick("seguranca")} // Define "seguranca" como ativo
          >
            <i className="bi bi-lock my-1 ps-3 fw-semibold"></i>
            <p className="my-1 user-select-none pe-3 fw-semibold">Segurança</p>
          </div>
          <div
            className={`d-flex gap-1 px-5 fs-6 rounded-2 align-items-center ${
              activeItem === "notificacoes" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleItemClick("notificacoes")} // Define "notificacoes" como ativo
          >
            <i className="bi bi-bell my-1 ps-3 fw-semibold"></i>
            <p className="my-1 user-select-none pe-3 fw-semibold">
              Notificações
            </p>
          </div>
          <div
            className={`d-flex gap-1 px-5 fs-6 rounded-2 align-items-center ${
              activeItem === "assinatura" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleItemClick("assinatura")} // Define "assinatura" como ativo
          >
            <i className="bi bi-credit-card my-1 ps-3 fw-semibold"></i>
            <p className="my-1 user-select-none pe-3 fw-semibold">Assinatura</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navconfig;
