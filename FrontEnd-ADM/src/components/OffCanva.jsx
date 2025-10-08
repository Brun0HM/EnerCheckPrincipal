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
      <nav className="position-fixed fixed-bottom bg-dark w-100">
        {/* Mobile Bottom Navigation */}
        <div className="d-flex justify-content-center w-100">
        <div className="col-12 col-lg-6 py-1">
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
        </div>
      </nav>

    </>
  );
};

export default OffCanva;
