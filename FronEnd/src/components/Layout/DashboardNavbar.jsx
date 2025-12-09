import React, { useState } from "react";
import "../../styles/main.scss";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router";

const Header = () => {
  const [MenuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="container-fluid position-fixed fixed-top my-0 headerBlur text-center">
      <div className="w-75 align-items-center justify-content-center m-auto">
        <div className="my-2">
          <div className="row align-items-center">
            {/* Logo e título - adaptado ao tema */}
            <div
              className="col-6 col-lg-auto"
              onClick={() => navigate("/dashboardGeral")}
            >
              <a className="d-flex align-items-center ms-3 ms-lg-5 text-decoration-none cursor-pointer">
                <div
                  className="btn text-light fw-bold"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <h4
                  className="fw-bolder fs-3 ms-2 mb-0"
                  style={{ color: "var(--text)" }}
                >
                  Enercheck
                </h4>
              </a>
            </div>

            {/* Navbar */}
            <div className="col-6 col-lg-auto ms-lg-auto">
              <nav className="navbar navbar-expand-lg p-0">
                <button
                  className="navbar-toggler btn fs-4 rounded-3 d-lg-none ms-auto"
                  type="button"
                  aria-controls="navbarSupportedContent"
                  aria-expanded={MenuOpen}
                  aria-label="Toggle navigation"
                  onClick={() => setMenuOpen(!MenuOpen)}
                  style={{
                    backgroundColor: "var(--primary)",
                    borderColor: "var(--primary)",
                    color: "#ffffff",
                  }}
                >
                  <i className={`${MenuOpen ? "bi bi-x " : "bi bi-list"}`}></i>
                </button>

                <div
                  className={`collapse navbar-collapse ${
                    MenuOpen ? "show" : ""
                  }`}
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav flex-column flex-lg-row ms-auto cursor-pointer">
                    {/* Links de navegação - adaptados ao tema */}
                    <li
                      className="nav-item"
                      onClick={() => navigate("/dashboardGeral")}
                    >
                      <a
                        className="text-decoration-none mx-3 nav-link"
                        style={{ color: "var(--text)" }}
                      >
                        DashBoard geral
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => navigate("/projetos")}
                    >
                      <a
                        className="text-decoration-none mx-3 nav-link"
                        style={{ color: "var(--text)" }}
                      >
                        Projetos
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => navigate("/configuracoes")}
                    >
                      <a
                        className="text-decoration-none mx-3 nav-link"
                        style={{ color: "var(--text)" }}
                      >
                        Configurações
                      </a>
                    </li>
                    {/* Botão de alternância de tema */}
                    <li className="nav-item d-flex align-items-center mx-3">
                      <button
                        className="btn btn-outline rounded-circle d-flex align-items-center justify-content-center"
                        onClick={toggleTheme}
                        style={{
                          borderColor: "var(--text-secondary)",
                          color: "var(--text)",
                          width: "40px",
                          height: "40px",
                        }}
                        title={`Mudar para tema ${
                          theme === "light" ? "escuro" : "claro"
                        }`}
                      >
                        {theme === "light" ? (
                          <i className="bi bi-moon-stars"></i>
                        ) : (
                          <i className="bi bi-brightness-high"></i>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <hr
        className="mb-0 fw-bolder"
        style={{
          borderColor: "var(--text-secondary)",
          opacity: 0.3,
        }}
      />
    </header>
  );
};

export default Header;
