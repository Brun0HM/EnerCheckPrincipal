import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import App from './App.jsx'
import GerenciamentoUsers from './Pages/GerenciamentoUsers.jsx';
import GerenciamentoPlanos from './Pages/GerenciamentoPlanos.jsx';
import OffCanva from "./components/OffCanva.jsx";

const AppWrapper =() => {
const location = useLocation();
const showOffCanva = ['/users', '/planos'].includes(location.pathname)

return (
  <>
    {showOffCanva && <OffCanva />}
    <Routes>  
      <Route path="/*" element={<App />} />
      <Route path='/users' element={<GerenciamentoUsers />} />
      <Route path='/planos' element={<GerenciamentoPlanos />} />
    </Routes>
  </>
);
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
</StrictMode>
);
