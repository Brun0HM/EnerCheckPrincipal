import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

/**
 * Componente para proteger rotas que requerem autenticação
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Componente filho a ser renderizado se autenticado
 * @returns {React.ReactNode} - Retorna o componente filho ou redireciona para /login
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  // Renderiza o componente filho se estiver autenticado
  return children;
};

export default PrivateRoute;
