import React, { useEffect, useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InfoGeralContainer } from '../components/InfoGeralContainer';
import { ContainerChecagem } from '../components/ContainerChecagem';
import { useTheme } from '../contexts/ThemeContext'; 
import { Ionicons } from '@expo/vector-icons';
import { projetosAPI } from '../api/Projetos';
import { useFocusEffect, useRoute } from '@react-navigation/native';

export default function ProjetoScreen() {
  const { theme, isLoaded } = useTheme();
  const route = useRoute();
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [analise, setAnalise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estados para comentários
  const [comentarioGeral, setComentarioGeral] = useState("");
  const [comentConform, setComentConform] = useState("");
  const [comentInstalacao, setComentInstalacao] = useState("");

  // Pontuações dos diferentes aspectos do projeto (valores fake)
  const pontuacaoGeral = 10;
  const pontuacaoConformidade = 90;
  const pontuacaoInstalacao = 50;

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

  const fetchDados = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 ProjetoScreen - Carregando dados...');
      
      // Verificar se foi passado um projetoId via route params
      const projetoIdRoute = route.params?.projetoId;
      
      // Caso tenha sido passado via params, salvar no AsyncStorage
      if (projetoIdRoute) {
        await AsyncStorage.setItem('projetoSelecionadoId', projetoIdRoute.toString());
        console.log('Projeto recebido via params:', projetoIdRoute);
      }
      
      // Buscar ID do projeto selecionado do AsyncStorage
      const projetoId = await AsyncStorage.getItem('projetoSelecionadoId');
      
      if (!projetoId) {
        console.log('⚠️ Nenhum projeto selecionado');
        setProjetoSelecionado(null);
        setIsLoading(false);
        return;
      }
      
      // Buscar todos os projetos e encontrar o selecionado
      const projetosData = await projetosAPI.getMeusProjetos();
      
      // Normalizar projetos (garantir que todos tenham ID)
      const projetosNormalizados = projetosData.map((p, index) => ({
        ...p,
        id: p.id || p.projetoId || p.ProjetoId || index,
      }));
      
      const projetoEncontrado = projetosNormalizados.find(
        p => p.id.toString() === projetoId.toString()
      );
      
      if (projetoEncontrado) {
        setProjetoSelecionado(projetoEncontrado);
        console.log('Projeto carregado:', projetoEncontrado.nome);
      } else {
        console.log('Projeto não encontrado com ID:', projetoId);
        setProjetoSelecionado(null);
      }
      
      // Carregar análise do AsyncStorage (quando houver)
      const analiseData = await AsyncStorage.getItem("Analise");
      if (analiseData) {
        const parsedAnalise = JSON.parse(analiseData);
        setAnalise(parsedAnalise);
        console.log('Análise carregada:', parsedAnalise);
      }
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setProjetoSelecionado(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Recarregar dados sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      console.log('📱 ProjetoScreen ganhou foco - Recarregando dados...');
      fetchDados();
      
      return () => {
        console.log('📱 ProjetoScreen perdeu foco');
      };
    }, [route.params])
  );

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDados();
    setRefreshing(false);
  };

  // Funções para trocar comentários baseado nas pontuações
  useEffect(() => {
    if (pontuacaoGeral <= 20) {
      setComentarioGeral("Erros críticos a serem revisados");
    } else if (pontuacaoGeral <= 50) {
      setComentarioGeral("Razoável, ajustes necessários");
    } else if (pontuacaoGeral >= 90) {
      setComentarioGeral("Excelente conformidade");
    } else if (pontuacaoGeral >= 70) {
      setComentarioGeral("Conformidade padrão, há pontos a melhorar");
    }
  }, [pontuacaoGeral]);

  useEffect(() => {
    if (pontuacaoConformidade <= 20) {
      setComentConform("Erros críticos a serem revisados");
    } else if (pontuacaoConformidade <= 50) {
      setComentConform("Razoável, ajustes necessários");
    } else if (pontuacaoConformidade >= 90) {
      setComentConform("Excelente conformidade");
    } else if (pontuacaoConformidade >= 70) {
      setComentConform("Conformidade padrão, há pontos a melhorar");
    }
  }, [pontuacaoConformidade]);

  useEffect(() => {
    if (pontuacaoInstalacao <= 30) {
      setComentInstalacao("Erros críticos a serem revisados");
    } else if (pontuacaoInstalacao <= 50) {
      setComentInstalacao("Razoável, ajustes necessários");
    } else if (pontuacaoInstalacao >= 90) {
      setComentInstalacao("Excelente conformidade");
    } else if (pontuacaoInstalacao >= 70) {
      setComentInstalacao("Conformidade padrão, há pontos a melhorar");
    }
  }, [pontuacaoInstalacao]);

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D6EFD" />
        <Text>Carregando tema...</Text>
      </View>
    );
  }

  // Tela quando nenhum projeto está selecionado
  if (!isLoading && !projetoSelecionado) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="folder-open-outline" size={80} color={currentTheme.textSecondary} />
          <Text style={[styles.emptyStateTitle, { color: currentTheme.text }]}>
            Nenhum Projeto Selecionado
          </Text>
          <Text style={[styles.emptyStateSubtitle, { color: currentTheme.textSecondary }]}>
            Selecione um projeto na tela inicial para visualizar seus detalhes
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={currentTheme.primary}
            colors={[currentTheme.primary]}
          />
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={currentTheme.primary} />
            <Text style={[styles.loadingText, { color: currentTheme.textSecondary }]}>
              Carregando projeto...
            </Text>
          </View>
        ) : (
          <>
            {/* Cabeçalho com informações do projeto */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: currentTheme.text }]}>
                {projetoSelecionado?.nome || 'Dashboard do Projeto'}
              </Text>
              <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
                Análise detalhada de conformidade e instalação elétrica
              </Text>
                    {/* Descrição do projeto */}
              {projetoSelecionado?.descricao && (
                <Text style={[styles.description, { color: currentTheme.text }]}>
                Descrição do projeto: {projetoSelecionado.descricao}
                </Text>
              )}
              {projetoSelecionado && (
                <Text style={[styles.projetoInfo, { color: currentTheme.textSecondary }]}>
                  ID: {projetoSelecionado.id} • Criado em{' '}
                  {new Date(projetoSelecionado.dataInicio || projetoSelecionado.dataCriacao).toLocaleDateString('pt-BR')}
                </Text>
              )}
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
          </>
        )}
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
    marginBottom: 4,
  },
  projetoInfo: {
    fontSize: 12,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
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