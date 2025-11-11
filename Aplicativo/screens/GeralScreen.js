import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  useColorScheme 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardStatusProjetoDashboard } from '../components/CardStatusProjetoDashboard';
import { ProjetosRecentes } from '../components/ProjetosRecentes';

export default function GeralScreen() {
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Dashboard</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Gerencie seus projetos elétricos e verificações de conformidade
          </Text>
        </View>

        {/* Cards de Status - Layout mobile (como col-sm do Bootstrap) */}
        <View style={styles.statusSection}>
          {/* Primeira linha de cards */}
          <View style={styles.statusRow}>
            <CardStatusProjetoDashboard
              status="Projetos Totais"
              iconeStatus="document-text-outline"
              num="24"
              desc="+2 desde o último mês"
              theme={theme}
            />
            <CardStatusProjetoDashboard
              status="Aprovados"
              iconeStatus="checkmark-circle-outline"
              num="18"
              desc="75% de aprovação"
              theme={theme}
            />
          </View>

          {/* Segunda linha de cards */}
          <View style={styles.statusRow}>
            <CardStatusProjetoDashboard
              status="Pendentes"
              iconeStatus="warning-outline"
              num="6"
              desc="Aguardando revisão"
              theme={theme}
            />
            <CardStatusProjetoDashboard
              status="Economia"
              iconeStatus="trending-up-outline"
              num="R$ 12.5k"
              desc="Em custos evitados"
              theme={theme}
            />
          </View>
        </View>

        {/* Projetos Recentes */}
        <View style={[styles.card, { 
          backgroundColor: theme.cardBg, 
          borderColor: theme.cardBorder 
        }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Projetos Recentes
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
              Seus últimos projetos verificados
            </Text>
          </View>

          {/* Lista de Projetos */}
          <ProjetosRecentes
            nomeProjeto="Residencial Vila Belmiro"
            tempoProjeto="2 dias atrás"
            statusProjeto="Aprovado"
            theme={theme}
          />
          <ProjetosRecentes
            nomeProjeto="Centro Comercial"
            tempoProjeto="5 dias atrás"
            statusProjeto="Aprovado"
            theme={theme}
          />
          <ProjetosRecentes
            nomeProjeto="SENAI 721"
            tempoProjeto="1 semana atrás"
            statusProjeto="Aprovado"
            theme={theme}
          />
        </View>

        {/* Cards de Ação - Layout mobile (stacked verticalmente) */}
        <View style={styles.actionSection}>
          {/* Card Novo Projeto */}
          <View style={[styles.actionCard, { 
            backgroundColor: theme.cardBg, 
            borderColor: theme.cardBorder 
          }]}>
            <Text style={[styles.actionTitle, { color: theme.text }]}>
              Novo Projeto
            </Text>
            <Text style={[styles.actionSubtitle, { color: theme.textSecondary }]}>
              Faça upload de um novo projeto para verificação
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { 
                  backgroundColor: theme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={() => alert('Navegando para Upload de Projeto')}
            >
              <Text style={styles.primaryButtonText}>Fazer Upload</Text>
            </Pressable>
          </View>

          {/* Card Relatórios */}
          <View style={[styles.actionCard, { 
            backgroundColor: theme.cardBg, 
            borderColor: theme.cardBorder 
          }]}>
            <Text style={[styles.actionTitle, { color: theme.text }]}>
              Relatórios
            </Text>
            <Text style={[styles.actionSubtitle, { color: theme.textSecondary }]}>
              Visualize relatórios detalhados de conformidade
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                { 
                  borderColor: theme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={() => alert('Navegando para Relatórios')}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>
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
  
  // Status Cards Section (como flex-column flex-md-row do Bootstrap)
  statusSection: {
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  // Cards principais
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
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
  },

  // Action Cards Section (como flex-column flex-lg-row)
  actionSection: {
    gap: 16,
  },
  actionCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
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

  // Botões
  primaryButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});