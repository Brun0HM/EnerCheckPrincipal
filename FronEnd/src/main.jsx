import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/main.scss";
import DashboardProjeto from "./Pages/DashboardProjeto.jsx";
import Logar from "./pages/Logar.jsx";
import Cadastrar from "./pages/Cadastrar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import DashBoardGeral from "./Pages/DashBoardGeral.jsx";
import Planos from "./pages/Planos.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/dashboardProjeto" element={<DashboardProjeto />}></Route>
        <Route path="/login" element={<Logar />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/dashboardGeral" element={<DashBoardGeral />} />
        <Route path="/planos" element={<Planos />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
