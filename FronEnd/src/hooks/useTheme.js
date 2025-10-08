import { useEffect, useState, useLayoutEffect } from "react";

/**
 * Hook customizado para gerenciamento de tema (claro/escuro)
 *
 * Funcionalidades melhoradas:
 * - Persiste a preferência do usuário no localStorage
 * - Detecta a preferência do sistema operacional
 * - Aplica o tema automaticamente no documento
 * - Fornece função para alternar entre temas
 * - Retorna estado booleano para facilitar condicionais
 */
export const useTheme = () => {
  /**
   * Determina o tema inicial baseado em:
   * 1. Tema salvo no localStorage (prioridade)
   * 2. Preferência do sistema operacional
   * 3. Padrão: tema claro
   */
  const getInitialTheme = () => {
    // Verifica se há tema salvo no localStorage
    const savedTheme = localStorage.getItem("enercheck-theme");
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      return savedTheme;
    }

    // Se não há tema salvo, usa a preferência do sistema
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    // Padrão: tema claro
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme());

  /**
   * UseLayoutEffect executa antes da pintura da tela
   * Isso reduz o flash visual
   */
  useLayoutEffect(() => {
    // Remove atributo anterior para evitar conflitos
    document.documentElement.removeAttribute("data-theme");

    // Aplica o novo tema
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    // Para tema claro, não precisa do atributo (CSS padrão)

    // Salva a preferência no localStorage para persistência
    localStorage.setItem("enercheck-theme", theme);
  }, [theme]);

  /**
   * Escuta mudanças na preferência do sistema
   * Só aplica automaticamente se o usuário não definiu uma preferência manual
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e) => {
      // Só muda automaticamente se não há tema salvo pelo usuário
      const hasUserPreference = localStorage.getItem("enercheck-theme");
      if (!hasUserPreference) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Cleanup do event listener
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  /**
   * Alterna entre tema claro e escuro
   * Marca que o usuário fez uma escolha manual
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  /**
   * Define um tema específico
   * @param {string} newTheme - 'light' ou 'dark'
   */
  const setThemeMode = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
    } else {
      console.warn('Tema inválido. Use "light" ou "dark".');
    }
  };

  /**
   * Reset para preferência do sistema
   */
  const resetToSystemTheme = () => {
    localStorage.removeItem("enercheck-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemTheme);
  };

  return {
    theme,
    toggleTheme,
    setThemeMode,
    resetToSystemTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
};
