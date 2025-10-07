import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const OffCanva = () => {
  const [activePage, setActivePage] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setActivePage(path);
  };

  return (
    <>
      <nav className="position-fixed fixed-bottom d-lg-none bg-dark w-100">
        {/* Mobile Bottom Navigation */}
        <div className="d-lg-none w-100 py-2">
          <ul className="navbar-nav flex-row justify-content-around align-items-center m-0 px-3">
            <li className="nav-item text-center">
              <a
                className={`text-decoration-none text-primary d-block p-2 ${
                  activePage === "/projetos" ? "text-light" : "text-primary"
                }`}
                onClick={() => handleNavigation("/projetos")}
              >
                <hr
                  className={`text-light my-0 ${
                    activePage === "/projetos" ? "d-block" : "d-none"
                  }`}
                />
                <i className="bi bi-robot fs-2"></i>
              </a>
            </li>
            <li className="nav-item text-center">
              <a
                className={`text-decoration-none text-primary d-block p-2 ${
                  activePage === "/users" ? "text-light" : "text-primary"
                }`}
                onClick={() => handleNavigation("/users")}
              >
                <hr
                  className={`text-light my-0 ${
                    activePage === "/users" ? "d-block" : "d-none"
                  }`}
                />
                <i className="bi bi-person-fill fs-2"></i>
              </a>
            </li>
            <li className="nav-item text-center">
              <hr
                className={`text-light my-0 ${
                  activePage === "/planos" ? "d-block" : "d-none"
                }`}
              />
              <a
                className={`text-decoration-none text-primary d-block p-2 ${
                  activePage === "/planos" ? "text-light" : "text-primary"
                }`}
                onClick={() => handleNavigation("/planos")}
              >
                <i className="bi bi-cash-stack fs-2"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="position-fixed fixed-start d-none d-lg-block bg-dark h-100">
        {/* Desktop Sidebar Navigation */}
        <div className="d-none d-lg-flex flex-column h-100 py-4 w-75">
          <ul className="navbar-nav flex-column justify-content-start align-items-center h-100 gap-4">
            <li className="nav-item text-center">
              <hr
                className={`text-light my-0 ${
                  activePage === "/projetos" ? "d-block" : "d-none"
                }`}
              />
              <a
                className={`text-decoration-none d-block p-3 ${
                  activePage === "/projetos" ? "text-light" : "text-primary"
                }`}
                onClick={() => handleNavigation("/projetos")}
              >
                <i className="bi bi-robot fs-1"></i>
              </a>
            </li>
            <li className="nav-item text-center">
              <hr
                className={`text-light my-0 ${
                  activePage === "/users" ? "d-block" : "d-none"
                }`}
              />
              <a
                className={`text-decoration-none d-block p-3 ${
                  activePage === "/users" ? "text-light" : "text-primary"
                }`}
                onClick={() => handleNavigation("/users")}
              >
                <i className="bi bi-person-fill fs-1"></i>
              </a>
            </li>
            <li className="nav-item text-center">
              <hr
                className={`text-light my-0 ${
                  activePage === "/planos" ? "d-block" : "d-none"
                }`}
              />
              <a
                className={`text-decoration-none d-block p-3 ${
                  activePage === "/planos" ? "text-light" : "text-primary"
                }`}
                onClick={() => handleNavigation("/planos")}
              >
                <i className="bi bi-cash-stack fs-1"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default OffCanva;
