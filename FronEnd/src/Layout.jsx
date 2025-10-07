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
