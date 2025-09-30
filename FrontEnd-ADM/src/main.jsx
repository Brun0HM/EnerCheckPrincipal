import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router"
import App from './App.jsx'
import GerenciamentoUsers from './Pages/GerenciamentoUsers.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>  
      <Route path="/*" element={<App />}> </Route>
      <Route path='/users' element={<GerenciamentoUsers />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
