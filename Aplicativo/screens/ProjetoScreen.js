import React, { useEffect, useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InfoGeralContainer } from '../components/InfoGeralContainer';
import { ContainerChecagem } from '../components/ContainerChecagem';
import { useTheme } from '../contexts/ThemeContext'; 
import { Ionicons } from '@expo/vector-icons';

export default function ProjetoScreen() {
  const { theme,  isLoaded } = useTheme(); // Usando ThemeContext
  const [analise, setAnalise] = useState('');

  // Estados para comentários (baseado no DashboardProjeto.jsx original)
  const [comentarioGeral, setComentarioGeral] = useState("");
  const [comentConform, setComentConform] = useState("");
  const [comentInstalacao, setComentInstalacao] = useState("");

  // Pontuações dos diferentes aspectos do projeto (valores de exemplo)
  const pontuacaoGeral = 10;
  const pontuacaoConformidade = 90;
  const pontuacaoInstalacao = 50;



  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando tema...</Text>
      </View>
    );
  }

  // Cores diretas baseadas no tema - mesmas do GeralScreen para consistência
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

  // Funções para trocar comentários baseado nas pontuações
  const trocarComentario = () => {
    if (pontuacaoGeral <= 20) {
      setComentarioGeral("Erros críticos a serem revisados");
    } else if (pontuacaoGeral <= 50) {
      setComentarioGeral("Razoável, ajustes necessários");
    } else if (pontuacaoGeral >= 90) {
      setComentarioGeral("Excelente conformidade");
    } else if (pontuacaoGeral >= 70) {
      setComentarioGeral("Conformidade padrão, há pontos a melhorar");
    }
  };

  const trocarComentConform = () => {
    if (pontuacaoConformidade <= 20) {
      setComentConform("Erros críticos a serem revisados");
    } else if (pontuacaoConformidade <= 50) {
      setComentConform("Razoável, ajustes necessários");
    } else if (pontuacaoConformidade >= 90) {
      setComentConform("Excelente conformidade");
    } else if (pontuacaoConformidade >= 70) {
      setComentConform("Conformidade padrão, há pontos a melhorar");
    }
  };

  const trocarComentInst = () => {
    if (pontuacaoInstalacao <= 30) {
      setComentInstalacao("Erros críticos a serem revisados");
    } else if (pontuacaoInstalacao <= 50) {
      setComentInstalacao("Razoável, ajustes necessários");
    } else if (pontuacaoInstalacao >= 90) {
      setComentInstalacao("Excelente conformidade");
    } else if (pontuacaoInstalacao >= 70) {
      setComentInstalacao("Conformidade padrão, há pontos a melhorar");
    }
  };

  useEffect(() => {
    // Carregar dados salvos no AsyncStorage
    loadStoredData();
    
    // Definir comentários baseados nas pontuações
    trocarComentario();
    trocarComentConform();
    trocarComentInst();
  }, []);

  // Atualizar comentários quando pontuações mudarem
  useEffect(() => {
    trocarComentario();
  }, [pontuacaoGeral]);

  useEffect(() => {
    trocarComentConform();
  }, [pontuacaoConformidade]);

  useEffect(() => {
    trocarComentInst();
  }, [pontuacaoInstalacao]);

  const loadStoredData = async () => {
    try {
      const analiseData = await AsyncStorage.getItem("Analise");
      if (analiseData) setAnalise(analiseData);
      console.log('Dados carregados:', { analiseData });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.text }]}>Dashboard do Projeto</Text>
          <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
            Análise detalhada de conformidade e instalação elétrica
          </Text>
        </View>

        {/* Seção de Informações Gerais */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <InfoGeralContainer
              topico="Pontuação Geral"
              iconeTopico="speedometer-outline"
              pontuacaoGeral={pontuacaoGeral}
              corNumero="danger"
              comentario={comentarioGeral}
              theme={currentTheme}
            />
          </View>

          <View style={styles.infoRow}>
            <InfoGeralContainer
              topico="Conformidade NBR"
              iconeTopico="shield-checkmark-outline"
              pontuacaoGeral={pontuacaoConformidade}
              corNumero="success"
              comentario={comentConform}
              theme={currentTheme}
            />
          </View>

          <View style={styles.infoRow}>
            <InfoGeralContainer
              topico="Instalação"
              iconeTopico="construct-outline"
              pontuacaoGeral={pontuacaoInstalacao}
              corNumero="warning"
              comentario={comentInstalacao}
              theme={currentTheme}
            />
          </View>
        </View>

        {/* Análise Detalhada */}
        <ContainerChecagem
          categoria="Circuitos de Força"
          descricao="Análise dos circuitos de força e dimensionamento"
          theme={currentTheme}
        />

        <ContainerChecagem
          categoria="Proteção e Segurança"
          descricao="Verificação de dispositivos de proteção (DR, disjuntores)"
          theme={currentTheme}
        />

        {/* Card de Ações Disponíveis */}
        <View style={[styles.actionCard, { 
          backgroundColor: currentTheme.cardBg, 
          borderColor: currentTheme.cardBorder 
        }]}>
          <Text style={[styles.actionTitle, { color: currentTheme.text }]}>
            Ações Disponíveis
          </Text>
          
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { 
                  backgroundColor: currentTheme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={() => alert('Baixando relatório...')}
            >
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="download" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                <Text style={styles.primaryButtonText}>Baixar Relatório</Text>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                { 
                  borderColor: currentTheme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={() => alert('Reprocessando projeto...')}
            >
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="refresh" size={18} color={currentTheme.primary} style={{ marginRight: 8 }} />
                <Text style={[styles.secondaryButtonText, { color: currentTheme.primary }]}>
                  Reprocessar
                </Text>
              </View>
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
    paddingBottom: 100, // Espaço para tab bar flutuante
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
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    marginBottom: 16,
  },
  actionCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
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