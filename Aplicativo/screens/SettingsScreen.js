import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navconfig from '../components/Navconfig';
import Perfil from '../components/Perfil';
import Seguranca from '../components/Seguranca';
import Notificacoes from '../components/Notificacoes';
import Assinaturas from '../components/Assinaturas';

export default function SettingsScreen() {
  const [activeComponent, setActiveComponent] = useState("perfil");
  const colorScheme = useColorScheme();

  // Temas baseados nas variáveis CSS da versão web
  const themes = {
    light: {
      bg: '#ffffff',
      text: '#131313',
      textSecondary: '#606060',
      primary: '#0D6EFD',
      cardBg: '#ffffff',
      cardBorder: '#e0e0e0',
      inputBg: '#f8f9fa',
      inputBorder: '#ced4da',
    },
    dark: {
      bg: '#131313',
      text: '#ffffff',
      textSecondary: '#b8bcc8',
      primary: '#0D6EFD',
      cardBg: '#2a2a2a',
      cardBorder: '#3a3a3a',
      inputBg: '#2d2d2d',
      inputBorder: '#555555',
    }
  };

  const theme = themes[colorScheme] || themes.light;

  const renderComponent = () => {
    switch (activeComponent) {
      case "perfil":
        return <Perfil theme={theme} />;
      case "seguranca":
        return <Seguranca theme={theme} />;
      case "notificacoes":
        return <Notificacoes theme={theme} />;
      case "assinatura":
        return <Assinaturas theme={theme} />;
      default:
        return <Perfil theme={theme} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Configurações
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Gerencie suas preferências e configurações
          </Text>
        </View>

        {/* Navegação */}
        <Navconfig onItemClick={setActiveComponent} theme={theme} />

        {/* Componente ativo */}
        <View style={styles.contentContainer}>
          {renderComponent()}
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
});                                                                                                 