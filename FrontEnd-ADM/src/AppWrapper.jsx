import App from "./App.jsx";
import GerenciamentoUsers from "./Pages/GerenciamentoUsers.jsx";
import GerenciamentoPlanos from "./Pages/GerenciamentoPlanos.jsx";
import OffCanva from "./components/OffCanva.jsx";
import { Route, Routes, useLocation } from "react-router";

const AppWrapper = () => {
  const location = useLocation();
  const showOffCanva = ["/users", "/planos"].includes(location.pathname);

  return (
    <>
      {showOffCanva && <OffCanva />}
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/users" element={<GerenciamentoUsers />} />
        <Route path="/planos" element={<GerenciamentoPlanos />} />
      </Routes>
    </>
  );
};

export default AppWrapper;
