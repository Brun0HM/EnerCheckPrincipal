import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardStatusProjetoDashboard } from '../components/CardStatusProjetoDashboard';
import { ProjetosRecentes } from '../components/ProjetosRecentes';
import { useTheme } from '../contexts/ThemeContext';

export default function GeralScreen() {
  const { theme, isManualTheme, isLoaded } = useTheme();

  console.log('📱 GeralScreen renderizada - tema:', theme);

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
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.text }]}>Dashboard</Text>
          <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
            Gerencie seus projetos elétricos e verificações de conformidade
          </Text>
        </View>

        {/* Cards de Status */}
        <View style={styles.statusSection}>
          {/* Primeira linha de cards */}
          <View style={styles.statusRow}>
            <CardStatusProjetoDashboard
              status="Projetos Totais"
              iconeStatus="document-text-outline"
              num="24"
              desc="+2 desde o último mês"
              theme={currentTheme}
            />
            <CardStatusProjetoDashboard
              status="Aprovados"
              iconeStatus="checkmark-circle-outline"
              num="18"
              desc="75% de aprovação"
              theme={currentTheme}
            />
          </View>

          {/* Segunda linha de cards */}
          <View style={styles.statusRow}>
            <CardStatusProjetoDashboard
              status="Pendentes"
              iconeStatus="warning-outline"
              num="6"
              desc="Aguardando revisão"
              theme={currentTheme}
            />
            <CardStatusProjetoDashboard
              status="Economia"
              iconeStatus="trending-up-outline"
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

// ... styles permanecem iguais
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
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
  statusSection: {
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
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
  debugContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 8,
  },
  debugText: {
    fontSize: 14,
    fontWeight: '500',
  },
});