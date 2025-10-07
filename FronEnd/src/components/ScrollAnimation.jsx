import React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import "./ScrollAnimation.css";

const ScrollAnimation = ({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
  className = "",
}) => {
  const [elementRef, , hasIntersected] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  const animationClass = hasIntersected
    ? `scroll-animate ${animation}`
    : "scroll-hidden";

  return (
    <div
      ref={elementRef}
      className={`${animationClass} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
