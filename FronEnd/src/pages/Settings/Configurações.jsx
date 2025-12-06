import React, { useEffect, useState } from "react";
import Navconfig from "../../components/Layout/Navconfig";
import Perfil from "../../components/Profile/Perfil";
import Segurança from "../../components/Security/Segurança";
import Notificacoes from "../../components/Support/Notificacoes";
import Assinaturas from "../../components/Plans/Assinaturas";

const Configurações = () => {
  const [activeComponent, setActiveComponent] = useState("perfil"); // Estado para controlar o componente ativo

  const renderComponent = () => {
    switch (activeComponent) {
      case "perfil":
        return <Perfil />;
      case "seguranca":
        return <Segurança />;
      case "notificacoes":
        return <Notificacoes />;
      case "assinatura":
        return <Assinaturas />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        style={{
          background: "var(--bg)",
          color: "var(--text)",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          <div className="d-flex flex-column  align-items-center justify-content-center pt-5 mt-5">
            <Navconfig onItemClick={setActiveComponent} />{" "}
            <div className="w-100" style={{ height: 850 }}>
              <div className="mt-4 justify-content-center d-flex">
                {renderComponent()}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configurações;
