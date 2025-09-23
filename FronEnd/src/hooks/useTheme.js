import { useEffect, useState } from "react";

export const useTheme = () => {
  const getPreferredTheme = () => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  };

  
  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setTheme(e.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, toggleTheme };
};
