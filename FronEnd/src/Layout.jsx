import React from "react";
import { Routes, Route, useLocation } from "react-router";
import App from "./App.jsx";
import DashboardProjeto from "./pages/Dashboard/DashboardProjeto";
import Logar from "./pages/Auth/Logar";
import Cadastrar from "./pages/Auth/Cadastrar";
import Header from "./components/Layout/Header";
import DashBoardGeral from "./pages/Dashboard/DashboardGeral";
import Planos from "./pages/Plans/Planos";
import Tema from "./pages/Test/TesteTheme";
import Footer from "./components/Layout/Footer";
import FinalizarEscolhaAssinatura from "./pages/Plans/FinalizarEscolhaAssinatura.jsx";
import DashboardNavbar from "./components/Layout/DashboardNavbar";
import UploadProjeto from "./pages/Upload/UploadProjeto.jsx";
import Configurações from "./pages/Settings/Configurações.jsx";
import Teste from "./pages/Test/Teste.jsx";
import InfoProjeto from "./pages/Upload/InfoProjeto.jsx";

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
    "/novoProjeto",
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
        <Route path="/novoProjeto" element={<InfoProjeto />} />
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
};

export default Layout;
