import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Navconfig from '../components/Navconfig';
import Perfil from '../components/Perfil';
import Seguranca from '../components/Seguranca';
import Notificacoes from '../components/Notificacoes';
import Assinaturas from '../components/Assinaturas';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const [activeComponent, setActiveComponent] = useState("perfil");
  const { theme, isManualTheme, isLoaded } = useTheme();
  const navigation = useNavigation();

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
        return <Assinaturas theme={currentTheme} navigation={navigation} />;
      default:
        return <Perfil theme={currentTheme} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      {/* Header customizado para manter o tema toggle */}
      <View style={[styles.customHeader, { 
        backgroundColor: currentTheme.cardBg,
        borderBottomColor: currentTheme.cardBorder 
      }]}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
          Configurações
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Subtitle */}
        <View style={styles.header}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Espaço para tab bar flutuante
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
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