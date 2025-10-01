import React, { useState } from "react";
import "../styles/main.scss";
import { useTheme } from "../hooks/useTheme"; // <-- importa o hook
import { useNavigate } from "react-router";

const Header = () => {
  const [MenuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // <-- usa o hook
  const navigate = useNavigate();

  return (
    <header className="container-fluid position-fixed fixed-top my-0 headerBlur text-center">
      <div className="w-75 align-items-center justify-content-center m-auto">
        <div className="my-2">
          <div className="row align-items-center">
            {/* Logo e título */}
            <div className="col-6 col-lg-auto" onClick={() => navigate("/")}>
              <a
                className="d-flex align-items-center ms-3 ms-lg-5 text-decoration-none"
                href="/*"
              >
                <div className="btn btn-dark text-light fw-bold">
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <h4 className="text-dark fw-bolder fs-3 ms-2 mb-0">
                  Enercheck
                </h4>
              </a>
            </div>

            {/* Navbar */}
            <div className="col-6 col-lg-auto ms-lg-auto">
              <nav className="navbar navbar-expand-lg p-0">
                <button
                  className="navbar-toggler btn btn-dark fs-4 rounded-3 d-lg-none ms-auto"
                  type="button"
                  aria-controls="navbarSupportedContent"
                  aria-expanded={MenuOpen}
                  aria-label="Toggle navigation"
                  onClick={() => setMenuOpen(!MenuOpen)}
                >
                  <i className={`${MenuOpen ? "bi bi-x " : "bi bi-list"}`}></i>
                </button>

                <div
                   className={`collapse navbar-collapse ${MenuOpen ? 'show' : ''}`}
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav flex-column flex-lg-row ms-auto">
                    {/* Seus links */}
                    <li className="nav-item">
                      <a
                        className="text-decoration-none text-dark mx-3 nav-link"
                        href="#recursos"
                      >
                        Recursos
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="text-decoration-none text-dark mx-3 nav-link"
                        href="#funciona"
                      >
                        Como Funciona
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="text-decoration-none text-dark mx-3 nav-link"
                        href="#depoimentos"
                      >
                        Depoimentos
                      </a>
                    </li>

                    {/* Botões de login e teste */}
                    <li className="nav-item">
                      <button
                        className="btn btn-light border-black mx-3 my-1"
                        onClick={() => navigate("/login")}
                      >
                        <a className="text-decoration-none text-dark">Entrar</a>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-dark mx-3 my-1"
                        onClick={() => navigate("/planos")}
                      >
                        <a className="text-decoration-none text-light" href="#">
                          Experimente Grátis!
                        </a>
                      </button>
                    </li>
                    {/* Botão de tema */}
                    <li className="nav-item d-flex align-items-center mx-3">
                      <button
                        className="btn btn-outline-dark"
                        onClick={toggleTheme}
                      >
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-dark mb-0 fw-bolder" />
    </header>
  );
};

export default Header;
