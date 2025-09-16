import React, { useState } from "react"; // Importa o React e o hook useState
import "../styles/main.scss"; // Importa o arquivo de estilos principal

// Componente Header
const Header = () => {
  const [MenuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto ou fechado

  return (
    <header
      className={`container-fluid position-fixed fixed-top my-0 headerBlur text-center`}
    >
      {/* Container principal do cabeçalho */}
      <div className="w-75 align-items-center justify-content-center m-auto">
        <div className="my-2">
          <div className="row align-items-center">
            {/* Seção esquerda: Logo e título */}
            <div className="col-6 col-lg-auto">
              <a
                className="d-flex align-items-center ms-3 ms-lg-5 text-decoration-none"
                href="/*"
              >
                {/* Botão com ícone de raio */}
                <div className="btn btn-dark text-light fw-bold">
                  <i className="bi bi-lightning-charge"></i>
                </div>
                {/* Título do cabeçalho */}
                <h4 className="text-dark fw-bolder fs-3 ms-2 mb-0">
                  Enercheck
                </h4>
              </a>
            </div>

            {/* Seção direita: Navegação */}
            <div className="col-6 col-lg-auto ms-lg-auto">
              <nav className="navbar navbar-expand-lg p-0">
                {/* Botão para abrir/fechar o menu no modo mobile */}
                <button
                  className="navbar-toggler btn btn-dark fs-4 rounded-3 d-lg-none ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setMenuOpen(!MenuOpen)} // Alterna o estado do menu
                >
                  {/* Ícone que muda dependendo do estado do menu */}
                  <i className={`${MenuOpen ? "bi bi-x " : "bi bi-list"}`}></i>
                </button>

                {/* Menu de navegação colapsável */}
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav flex-column flex-lg-row ms-auto">
                    {/* Item de navegação: Recursos */}
                    <li className="nav-item">
                      <a
                        className="text-decoration-none text-dark mx-3 nav-link"
                        href="#"
                      >
                        Recursos
                      </a>
                    </li>
                    {/* Item de navegação: Como Funciona */}
                    <li className="nav-item">
                      <a
                        className="text-decoration-none text-dark mx-3 nav-link"
                        href="#"
                      >
                        Como Funciona
                      </a>
                    </li>
                    {/* Item de navegação: Depoimentos */}
                    <li className="nav-item">
                      <a
                        className="text-decoration-none text-dark mx-3 nav-link"
                        href="#"
                      >
                        Depoimentos
                      </a>
                    </li>
                    {/* Botão de navegação: Entrar */}
                    <li className="nav-item">
                      <button className="btn btn-light border-black mx-3 my-1">
                        <a
                          className="text-decoration-none text-dark"
                          href="/login"
                        >
                          Entrar
                        </a>
                      </button>
                    </li>
                    {/* Botão de navegação: Experimente Grátis */}
                    <li className="nav-item">
                      <button className="btn btn-dark mx-3 my-1">
                        <a className="text-decoration-none text-light" href="#">
                          Experimente Grátis!
                        </a>
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Linha horizontal para separação visual */}
      <hr className="text-dark mb-0 fw-bolder" />
    </header>
  );
};

// Exporta o componente Header como padrão
export default Header;
