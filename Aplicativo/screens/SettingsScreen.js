import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Navconfig from '../components/Navconfig';
import Perfil from '../components/Perfil';
import Seguranca from '../components/Seguranca';
import Notificacoes from '../components/Notificacoes';
import Assinaturas from '../components/Assinaturas';
import { useTheme } from '../contexts/ThemeContext';
import usuariosAPI from '../api/Usuarios';

export default function SettingsScreen() {
  const [activeComponent, setActiveComponent] = useState("perfil");
  const [userData, setUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { theme, isLoaded } = useTheme();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      console.log('🔄 SettingsScreen - Recarregando dados...');
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      setIsLoadingUser(true);
      console.log('Carregando dados do usuário autenticado...');
      
      const user = await usuariosAPI.getUserByToken();
      
      if (user) {
        setUserData(user);
        console.log('Dados do usuário carregados:', {
          id: user.id,
          nome: user.nomeCompleto,
          email: user.email,
          numeroCrea: user.numeroCrea,
          plano: user.plano?.nome,
          requisicoes: user.userReq
        });
      } else {
        console.warn('Nenhum usuário encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0D6EFD" />
        <Text style={{ marginTop: 10 }}>Carregando tema...</Text>
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
       if (isLoadingUser) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={currentTheme.primary} />
          <Text style={[styles.loadingText, { color: currentTheme.textSecondary }]}>
            Carregando dados...
          </Text>
        </View>
      );
    }
    switch (activeComponent) {
      case "perfil":
        return <Perfil theme={currentTheme} userData={userData}  onUserUpdate={loadUserData} />;
      case "seguranca":
        return <Seguranca theme={currentTheme}  userData={userData}/>;
      case "notificacoes":
        return <Notificacoes theme={currentTheme} />;
      case "assinatura":
        return <Assinaturas theme={currentTheme} navigation={navigation}  userData={userData}/>;
      default:
        return <Perfil theme={currentTheme}    userData={userData}  onUserUpdate={loadUserData}/>;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>

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