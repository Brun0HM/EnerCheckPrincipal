// Importações necessárias
import React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import "../styles/ScrollAnimation.css";

const ScrollAnimation = ({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
  className = "",
}) => {
  /**
   * Hook personalizado que observa quando o elemento entra na viewport
   * - threshold: 0.1 significa que a animação será triggered quando 10% do elemento estiver visível
   * - rootMargin: "50px" adiciona uma margem de 50px ao redor da viewport para trigger antecipado
   */
  const [elementRef, , hasIntersected] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  /**
   * Determina qual classe CSS aplicar baseado na visibilidade do elemento
   * - Se o elemento foi intersectado: aplica a classe de animação
   * - Se ainda não foi intersectado: mantém o elemento oculto
   */
  const animationClass = hasIntersected
    ? `scroll-animate ${animation}`
    : "scroll-hidden";

  return (
    <div
      ref={elementRef} // Referência para o elemento ser observado
      className={`${animationClass} ${className}`} // Combina classes de animação com classes customizadas
      style={{
        animationDelay: `${delay}ms`, // Define o atraso da animação
        animationDuration: `${duration}s`, // Define a duração da animação
      }}
    >
      {children} {/* Renderiza o conteúdo filho dentro do container animado */}
    </div>
  );
};

export default ScrollAnimation;
