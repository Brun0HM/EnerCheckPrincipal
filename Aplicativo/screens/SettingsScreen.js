import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navconfig from '../components/Navconfig';
import Perfil from '../components/Perfil';
import Seguranca from '../components/Seguranca';
import Notificacoes from '../components/Notificacoes';
import Assinaturas from '../components/Assinaturas';
import { useTheme } from '../contexts/ThemeContext'; // Mudança aqui

export default function SettingsScreen() {
  const [activeComponent, setActiveComponent] = useState("perfil");
  const { theme, isManualTheme, isLoaded } = useTheme(); // Usando ThemeContext

  console.log('📱 SettingsScreen renderizada - tema:', theme);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando tema...</Text>
      </View>
    );
  }

  // Cores diretas baseadas no tema - mesmas das outras telas
  const currentTheme = {
    bg: theme === 'light' ? '#ffffff' : '#131313',
    text: theme === 'light' ? '#131313' : '#ffffff',
    textSecondary: theme === 'light' ? '#606060' : '#b8bcc8',
    primary: '#0D6EFD',
    cardBg: theme === 'light' ? '#ffffff' : '#2a2a2a',
    cardBorder: theme === 'light' ? '#e0e0e0' : '#3a3a3a',
    inputBg: theme === 'light' ? '#f8f9fa' : '#2d2d2d',
    inputBorder: theme === 'light' ? '#ced4da' : '#555555',
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "perfil":
        return <Perfil theme={currentTheme} />;
      case "seguranca":
        return <Seguranca theme={currentTheme} />;
      case "notificacoes":
        return <Notificacoes theme={currentTheme} />;
      case "assinatura":
        return <Assinaturas theme={currentTheme} />;
      default:
        return <Perfil theme={currentTheme} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            Configurações
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
            Gerencie suas preferências e configurações
          </Text>
        </View>

        {/* Navegação */}
        <Navconfig onItemClick={setActiveComponent} theme={currentTheme} />

        {/* Componente ativo */}
        <View style={styles.contentContainer}>
          {renderComponent()}
        </View>

        {/* Debug: Status do tema */}
        <View style={[styles.debugContainer, { 
          backgroundColor: currentTheme.cardBg, 
          borderColor: currentTheme.cardBorder 
        }]}>
          <Text style={[styles.debugText, { color: currentTheme.textSecondary }]}>
            Tema: {theme} {theme === 'light' ? '☀️' : '🌙'} 
            {isManualTheme ? ' (Manual)' : ' (Sistema)'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Espaço para tab bar flutuante
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  debugContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  debugText: {
    fontSize: 14,
    fontWeight: '500',
  },
});