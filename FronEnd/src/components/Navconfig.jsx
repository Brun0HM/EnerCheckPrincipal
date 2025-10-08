import React, { useState } from "react";

const Navconfig = ({ onItemClick }) => {
  const [activeItem, setActiveItem] = useState("perfil"); // Estado para controlar o item ativo
  const [showAllItems, setShowAllItems] = useState(false); // Estado para controlar a exibição dos itens

  const handleItemClick = (item) => {
    setActiveItem(item); // Define o item ativo
    onItemClick(item); // Notifica o componente pai sobre o item clicado
    setShowAllItems(false); // Fecha o menu ao selecionar um item
  };

  return (
    <>
      <div className="col-12 col-md-8">
        {/* Toggle para exibir os itens em telas pequenas */}
        <div className="d-md-none d-flex justify-content-between vx align-items-center bg-secondary bg-opacity-10 rounded-3 p-2 ">
          <div
            className={`d-flex gap-1 justify-content-center fs-6 rounded-2 align-items-center bg-white shadow col-10`}
          >
            <i
              className={`bi bi-${
                activeItem === "perfil"
                  ? "person"
                  : activeItem === "seguranca"
                  ? "lock"
                  : activeItem === "notificacoes"
                  ? "bell"
                  : "credit-card"
              } my-1 ps-3 fw-semibold`}
            ></i>
            <p className="my-1 user-select-none pe-3 fw-semibold">
              {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
            </p>
          </div>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowAllItems(!showAllItems)}
          >
            <i className={`bi ${showAllItems ? "bi-x" : "bi-list"}`}></i>
          </button>
        </div>

        {/* Itens do menu */}
        {showAllItems && (
          <div className="bg-secondary d-flex flex-column bg-opacity-10 rounded-3 p-1 d-md-none">
            <div
              className={`d-flex gap-1 col-12 justify-content-center fs-6 rounded-2 align-items-center ${
                activeItem === "perfil" ? "bg-white shadow" : ""
              }`}
              onClick={() => handleItemClick("perfil")}
            >
              <i className="bi bi-person my-1 ps-3 fw-semibold"></i>
              <p className="my-1 user-select-none pe-3 fw-semibold">Perfil</p>
            </div>
            <div
              className={`d-flex gap-1 col-12 justify-content-center fs-6 rounded-2 align-items-center ${
                activeItem === "seguranca" ? "bg-white shadow" : ""
              }`}
              onClick={() => handleItemClick("seguranca")}
            >
              <i className="bi bi-lock my-1 ps-3 fw-semibold"></i>
              <p className="my-1 user-select-none pe-3 fw-semibold">
                Segurança
              </p>
            </div>
            <div
              className={`d-flex gap-1 col-12 justify-content-center fs-6 rounded-2 align-items-center ${
                activeItem === "notificacoes" ? "bg-white shadow" : ""
              }`}
              onClick={() => handleItemClick("notificacoes")}
            >
              <i className="bi bi-bell my-1 ps-3 fw-semibold"></i>
              <p className="my-1 user-select-none pe-3 fw-semibold">
                Notificações
              </p>
            </div>
            <div
              className={`d-flex gap-1 col-12 justify-content-center fs-6 rounded-2 align-items-center ${
                activeItem === "assinatura" ? "bg-white shadow" : ""
              }`}
              onClick={() => handleItemClick("assinatura")}
            >
              <i className="bi bi-credit-card my-1 ps-3 fw-semibold"></i>
              <p className="my-1 user-select-none pe-3 fw-semibold">
                Assinatura
              </p>
            </div>
          </div>
        )}

        {/* Itens do menu para telas grandes */}
        <div className="bg-secondary d-none d-md-flex bg-opacity-10 rounded-3 p-1">
          <div
            className={`d-flex gap-1 col-12 col-md-3 justify-content-center fs-6 rounded-2 align-items-center ${
              activeItem === "perfil" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleItemClick("perfil")}
          >
            <i className="bi bi-person my-1 ps-3 fw-semibold"></i>
            <p className="my-1 user-select-none pe-3 fw-semibold">Perfil</p>
          </div>
          <div
            className={`d-flex gap-1 col-12 col-md-3 justify-content-center fs-6 rounded-2 align-items-center ${
              activeItem === "seguranca" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleItemClick("seguranca")}
          >
            <i className="bi bi-lock my-1 ps-3 fw-semibold"></i>
            <p className="my-1 user-select-none pe-3 fw-semibold">Segurança</p>
          </div>
          <div
            className={`d-flex gap-1 col-12 col-md-3 justify-content-center fs-6 rounded-2 align-items-center ${
              activeItem === "notificacoes" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleItemClick("notificacoes")}
          >
            <i className="bi bi-bell my-1 ps-3 fw-semibold"></i>
            <p className="my-1 user-select-none pe-3 fw-semibold">
              Notificações
            </p>
          </div>
          <div
            className={`d-flex gap-1 col-12 col-md-3 justify-content-center fs-6 rounded-2 align-items-center ${
              activeItem === "assinatura" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleItemClick("assinatura")}
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
