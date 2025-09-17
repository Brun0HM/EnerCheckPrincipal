import React from "react";
import { useTheme } from "../hooks/useTheme";

const TesteTheme = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <div className="container py-5">
        <h1>Meu Site</h1>
        <p>O tema atual é: {theme}</p>
        <button className="btn btn-primary" onClick={toggleTheme}>
          Alternar Tema
        </button>
      </div>
    </div>
  );
};

export default TesteTheme;
