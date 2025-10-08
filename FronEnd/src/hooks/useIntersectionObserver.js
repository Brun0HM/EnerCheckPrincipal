import { useState, useEffect, useRef } from "react";

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Verifica se o browser suporta IntersectionObserver
    if (!window.IntersectionObserver) {
      // Fallback: marca como intersectado imediatamente se não há suporte
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [hasIntersected, options]);

  return [elementRef, isIntersecting, hasIntersected];
};
