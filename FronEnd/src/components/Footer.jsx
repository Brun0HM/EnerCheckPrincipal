import React from "react";
const DataAtual = new Date();
const AnoAtual = DataAtual.getUTCFullYear();
import LogoClara from "../assets/LogoBigdark.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-start py-md-4 py-2">
      <div className="container-fluid w-75">
        <div className="row ">
          <div className="col col-12 col-md-3 mb-1 mb-md-4">
            <div className="d-flex align-items-center mb-1 mb-md-3">
              <img
                src={LogoClara}
                width={200}
                height={200}
                alt="Logo"
                className="logo"
              />
            </div>
            <p className="text-light fw-light fs-6">
              Verificação automatizada de projetos elétricos com inteligência
              artificial.
            </p>
          </div>
          <div className="col-12 col-md-3 mb-1 mb-md-4">
            <h6 className="fw-bolder text-light mb-1 mb-md-3">Produto</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  Recursos
                </a>
              </li>
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  Preços
                </a>
              </li>
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  Demonstração
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3 mb-1 mb-md-4">
            <h6 className="fw-bolder text-light mb-1 mb-md-3">Suporte</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  Documentação
                </a>
              </li>
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  Contato
                </a>
              </li>
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3 mb-1 mb-md-4">
            <h6 className="fw-bolder text-light mb-1 mb-md-3">Empresa</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  Sobre
                </a>
              </li>
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a className="text-decoration-none text-secondary" href="#">
                  Carreiras
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="text-light" />
        <p className="text-secondary fw-lighter fs-5 text-center">
          {" "}
          &copy;{AnoAtual} Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
