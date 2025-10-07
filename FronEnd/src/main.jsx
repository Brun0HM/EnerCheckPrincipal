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
import DashBoardGeral from "./pages/DashboardGeral.jsx";

import Planos from "./pages/Planos.jsx";
import Tema from "./pages/TesteTheme.jsx";
import Footer from "./components/Footer.jsx";
import UploadProjeto from "./pages/UploadProjeto.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/dashboardProjeto" element={<DashboardProjeto />}></Route>
        <Route path="/login" element={<Logar />} />
        <Route path="/cadastro" element={<Cadastrar />} />
        <Route path="/dashboardGeral" element={<DashBoardGeral />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/tema" element={<Tema />} />
        <Route path="/uploadProjeto" element={<UploadProjeto />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
