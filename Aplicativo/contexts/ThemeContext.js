import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [manualTheme, setManualTheme] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar tema salvo apenas uma vez
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('manualTheme');
      
      if (savedTheme) {
        setManualTheme(savedTheme);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar tema:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const currentTheme = manualTheme || systemColorScheme || 'light';

  const toggleTheme = async () => {
    try {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      setManualTheme(newTheme);
      await AsyncStorage.setItem('manualTheme', newTheme);
    } catch (error) {
      console.error('❌ Erro ao alterar tema:', error);
    }
  };

  const value = {
    theme: currentTheme,
    toggleTheme,
    isManualTheme: !!manualTheme,
    isLoaded,
    systemTheme: systemColorScheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};