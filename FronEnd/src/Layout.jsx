import React from "react";
import { Routes, Route, useLocation } from "react-router";
import App from "./App.jsx";
import DashboardProjeto from "./Pages/DashboardProjeto.jsx";
import Logar from "./pages/Logar.jsx";
import Cadastrar from "./pages/Cadastrar.jsx";
import Header from "./components/Header.jsx";
import DashBoardGeral from "./pages/DashboardGeral.jsx";
import Planos from "./pages/Planos.jsx";
import Tema from "./pages/TesteTheme.jsx";
import Footer from "./components/Footer.jsx";

const Layout = () => {
  const location = useLocation();
  
  // Rotas onde o Header e Footer não devem aparecer
  const hideNavbarRoutes = ["/login", "/cadastro"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Header />}
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/dashboardProjeto" element={<DashboardProjeto />}></Route>
        <Route path="/login" element={<Logar />} />
        <Route path="/cadastro" element={<Cadastrar />} />
        <Route path="/dashboardGeral" element={<DashBoardGeral />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/tema" element={<Tema />} />
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
};

export default Layout;