import React, { useState, useEffect, useCallback } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  Pressable,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CardStatusProjetoDashboard from '../components/CardStatusProjetoDashboard';
import ProjetosRecentes from '../components/ProjetosRecentes';
import { useTheme } from '../contexts/ThemeContext';
import { usuariosAPI } from '../api/Usuarios'; 

export default function GeralScreen({route}) {
  const { theme, isLoaded } = useTheme();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
    useCallback(() => {
      console.log('🔄 GeralScreen - Recarregando dados...');
      loadUserData();
    }, [route?.params?.timestamp]) // Recarrega quando timestamp muda
  );

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const user = await usuariosAPI.getUserByToken();
      setUserData(user);
      console.log('✅ Dados recarregados:', {
        email: user?.email,
        plano: user?.plano?.nome,
        requisicoes: user?.userReq
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando tema...</Text>
      </View>
    );
  }

  // Cores diretas baseadas no tema
  const currentTheme = {
    bg: theme === 'light' ? '#ffffff' : '#131313',
    text: theme === 'light' ? '#131313' : '#ffffff',
    textSecondary: theme === 'light' ? '#606060' : '#b8bcc8',
    primary: '#0D6EFD',
    cardBg: theme === 'light' ? '#ffffff' : '#2a2a2a',
    cardBorder: theme === 'light' ? '#e0e0e0' : '#3a3a3a',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho da página */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            Dashboard
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
            Gerencie seus projetos elétricos e verificações de conformidade
          </Text>
        </View>

        {/* Cards de Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <CardStatusProjetoDashboard
              status="Projetos Totais"
              iconeStatus="bi bi-file-earmark-text"
              num="24"
              desc="+2 desde o último mês"
              theme={currentTheme}
            />
            <CardStatusProjetoDashboard
              status="Aprovados"
              iconeStatus="bi bi-check2-circle"
              num="18"
              desc="75% de aprovação"
              theme={currentTheme}
            />
          </View>
          
          <View style={styles.statusRow}>
            <CardStatusProjetoDashboard
              status="Pendentes"
              iconeStatus="bi bi-exclamation-triangle"
              num="6"
              desc="Aguardando revisão"
              theme={currentTheme}
            />
            <CardStatusProjetoDashboard
              status="Economia"
              iconeStatus="bi bi-graph-up"
              num="R$ 12.5k"
              desc="Em custos evitados"
              theme={currentTheme}
            />
          </View>
        </View>

        {/* Projetos Recentes */}
        <View style={[styles.card, { 
          backgroundColor: currentTheme.cardBg, 
          borderColor: currentTheme.cardBorder 
        }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>
              Projetos Recentes
            </Text>
            <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
              Seus últimos projetos verificados
            </Text>
          </View>

          {/* Projetos */}
          <ProjetosRecentes
            nomeProjeto="Residencial Vila Belmiro"
            tempoProjeto="2 dias atrás"
            statusProjeto="Aprovado"
            theme={currentTheme}
          />
          <ProjetosRecentes
            nomeProjeto="Centro Comercial"
            tempoProjeto="5 dias atrás"
            statusProjeto="Aprovado"
            theme={currentTheme}
          />
          <ProjetosRecentes
            nomeProjeto="SENAI 721"
            tempoProjeto="1 semana atrás"
            statusProjeto="Aprovado"
            theme={currentTheme}
          />
        </View>

        {/* Cards de Ação */}
        <View style={styles.actionContainer}>
          {/* Card Novo Projeto */}
          <View style={[styles.actionCard, { 
            backgroundColor: currentTheme.cardBg, 
            borderColor: currentTheme.cardBorder 
          }]}>
            <Text style={[styles.actionTitle, { color: currentTheme.text }]}>
              Novo Projeto
            </Text>
            <Text style={[styles.actionSubtitle, { color: currentTheme.textSecondary }]}>
              Faça upload de um novo projeto para verificação
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { 
                  backgroundColor: currentTheme.primary,
                  borderColor: currentTheme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={() => navigation.navigate('UploadProjeto')}
            >
              <Text style={styles.primaryButtonText}>Fazer Upload</Text>
            </Pressable>
          </View>

          {/* Card Relatórios */}
          <View style={[styles.actionCard, { 
            backgroundColor: currentTheme.cardBg, 
            borderColor: currentTheme.cardBorder 
          }]}>
            <Text style={[styles.actionTitle, { color: currentTheme.text }]}>
              Relatórios
            </Text>
            <Text style={[styles.actionSubtitle, { color: currentTheme.textSecondary }]}>
              Visualize relatórios detalhados de conformidade
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.outlineButton,
                { 
                  borderColor: currentTheme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
            >
              <Text style={[styles.outlineButtonText, { color: currentTheme.primary }]}>
                Ver Relatórios
              </Text>
            </Pressable>
          </View>
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
  },
  actionContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  primaryButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});