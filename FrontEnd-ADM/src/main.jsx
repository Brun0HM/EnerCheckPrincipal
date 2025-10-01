import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter} from "react-router"
import AppWrapper from "./AppWrapper";


createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
</StrictMode>
);
