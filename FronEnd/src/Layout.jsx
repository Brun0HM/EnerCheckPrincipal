import React from "react";
import { Routes, Route, useLocation } from "react-router";
import App from "./App.jsx";
import DashboardProjeto from "./pages/DashboardProjeto";
import Logar from "./pages/Logar";
import Cadastrar from "./pages/Cadastrar";
import Header from "./components/Header";
import DashBoardGeral from "./pages/DashboardGeral";
import Planos from "./pages/Planos";
import Tema from "./pages/TesteTheme";
import Footer from "./components/Footer";
import FinalizarEscolhaAssinatura from "./pages/FinalizarEscolhaAssinatura.jsx";
import DashboardNavbar from "./components/DashboardNavbar";
import UploadProjeto from "./pages/UploadProjeto.jsx";
import Configurações from "./pages/Configurações.jsx";
import Teste from "./pages/Teste.jsx";
import TabelaProjetos from "./pages/TabelaProjetos.jsx";

const Layout = () => {
  const location = useLocation();

  // Rotas onde o Header e Footer não devem aparecer
  const hideNavbarRoutes = [
    "/login",
    "/cadastro",
    "/dashboardProjeto",
    "/dashboardGeral",
    "/configuracoes",
    "/teste",
    "/uploadProjeto",
    "/planos",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Rotas onde a Dashboard Navbar deve aparecer
  const dashboardRoutes = [
    "/dashboardGeral",
    "/dashboardProjeto",
    "/configuracoes",
    "/uploadProjeto",
    "/planos",
  ];
  const shouldShowDashboardNavbar = dashboardRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Header />}
      {shouldShowDashboardNavbar && <DashboardNavbar />}
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/dashboardProjeto" element={<DashboardProjeto />} />
        <Route path="/login" element={<Logar />} />
        <Route path="/cadastro" element={<Cadastrar />} />
        <Route path="/dashboardGeral" element={<DashBoardGeral />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/tema" element={<Tema />} />
        <Route
          path="/comecarAssinatura"
          element={<FinalizarEscolhaAssinatura />}
        />
        <Route path="/uploadProjeto" element={<UploadProjeto />} />
        <Route path="/configuracoes" element={<Configurações />} />
        <Route path="/Teste" element={<Teste />} />
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
};

export default Layout;
