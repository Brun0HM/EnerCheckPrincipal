import React, { useEffect, useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  Pressable,
  RefreshControl,
  ActivityIndicator,
 Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InfoGeralContainer } from '../components/InfoGeralContainer';
import { ContainerChecagem } from '../components/ContainerChecagem';
import { useTheme } from '../contexts/ThemeContext'; 
import { Ionicons } from '@expo/vector-icons';
import { projetosAPI } from '../api/Projetos';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import * as Print from 'expo-print'; 

export default function ProjetoScreen() {
  const { theme, isLoaded } = useTheme();
  const route = useRoute();
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [analise, setAnalise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estados para comentários
  const [conformidadeGeral, setConformidadeGeral] = useState('');

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
        console.log('Nenhum projeto selecionado');
        setProjetoSelecionado(null);
        setIsLoading(false);
        return;
      }

      // Buscar detalhes do projeto pelo ID
      const projeto = await projetosAPI.getProjetoById(projetoId);

      if (projeto) {
        setProjetoSelecionado(projeto);
        console.log('Projeto carregado:', projeto.nome);

        // Parse da análise categorizada
        if (projeto.analise) {
          const parsedAnalise = JSON.parse(projeto.analise);
          setAnalise(parsedAnalise);
          console.log('Análise carregada:', parsedAnalise);
        } else {
          setAnalise(null);
          console.log('Nenhuma análise encontrada para o projeto.');
        }
      } else {
        console.log('Projeto não encontrado com ID:', projetoId);
        setProjetoSelecionado(null);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do projeto:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do projeto.');
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



  const handleDownloadPDF = async () => {
    try {
      if (!analise) {
        Alert.alert('Erro', 'Nenhuma análise disponível para gerar o relatório.');
        return;
      }

      // Formatar a análise em HTML
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #0D6EFD; }
              h2 { color: #333; }
              p { margin: 5px 0; }
              .categoria { margin-top: 20px; }
              .conformidades, .naoConformidades { margin-left: 20px; }
            </style>
          </head>
          <body>
            <h1>Relatório de Análise</h1>
            ${analise.analiseCategorizada.map(categoria => `
              <div class="categoria">
                <h2>${categoria.categoria} (${categoria.percentualConformidade}%)</h2>
                <h3>Conformidades:</h3>
                <div class="conformidades">
                  ${categoria.conformidades.map(c => `
                    <p><strong>${c.item}:</strong> ${c.observacao}</p>
                  `).join('')}
                </div>
                <h3>Não Conformidades ou Verificar:</h3>
                <div class="naoConformidades">
                  ${categoria.naoConformidadesOuVerificar.map(nc => `
                    <p><strong>${nc.item}:</strong> ${nc.observacao}</p>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </body>
        </html>
      `;

      // Gerar o PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Exibir mensagem de sucesso
      Alert.alert('Relatório Gerado', `O relatório foi salvo em: ${uri}`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      Alert.alert('Erro', 'Não foi possível gerar o relatório.');
    }
  };

  const handleReprocessar = async () => {
    try {
      if (!imagemSalva) {
        Alert.alert('Erro', 'Nenhuma imagem foi salva para reprocessar.');
        return;
      }
  
      setCarregando(true);
  
      // Criar FormData com a imagem salva
      const formData = new FormData();
      formData.append('arquivo', {
        uri: `data:${tipoSalvo};base64,${imagemSalva}`,
        type: tipoSalvo,
        name: nomeSalvo || 'planta.jpg',
      });
  
      // Reenviar para a API
      const novaAnalise = await projetosAPI.postProjetoAnalisar(projetoId, formData);
  
      // Atualizar a análise na tela
      setAnalise(novaAnalise);
      Alert.alert('Sucesso', 'A análise foi reprocessada com sucesso!');
    } catch (error) {
      console.error('Erro ao reprocessar análise:', error);
      Alert.alert('Erro', 'Não foi possível reprocessar a análise.');
    } finally {
      setCarregando(false);
    }
  };

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDados();
    setRefreshing(false);
  };

  // Funções para trocar comentários baseado nas pontuações
  useEffect(() => {
    if (analise?.analiseCategorizada) {
      const totalConformidade = analise.analiseCategorizada.reduce(
        (acc, categoria) => acc + categoria.percentualConformidade,
        0
      );
      const mediaConformidade =
        analise.analiseCategorizada.length > 0
          ? totalConformidade / analise.analiseCategorizada.length
          : 0;

      if (mediaConformidade >= 90) {
        setConformidadeGeral('Alta Conformidade');
      } else if (mediaConformidade >= 50) {
        setConformidadeGeral('Conformidade Moderada');
      } else {
        setConformidadeGeral('Baixa Conformidade');
      }
    }
  }, [analise]);

  useFocusEffect(
    React.useCallback(() => {
      fetchDados();
    }, [route.params])
  );


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
          <View>
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

                 {/* Informações Gerais */}
          <View style={styles.infoSection}>
          {analise?.analiseCategorizada?.map((categoria, index) => (
              <InfoGeralContainer
                key={index}
                topico={categoria.categoria}
                iconeTopico="analytics-outline"
                pontuacaoGeral={categoria.percentualConformidade}
                corNumero={
                  categoria.percentualConformidade >= 70
                    ? 'success'
                    : categoria.percentualConformidade >= 50
                    ? 'warning'
                    : 'danger'
                }
                comentario={`Conformidade geral: ${categoria.percentualConformidade}%`}
                theme={currentTheme}
              />
            ))}

            {/* Checagem Detalhada */}
            {analise?.analiseCategorizada?.map((categoria, index) => (
              <ContainerChecagem
                key={index}
                categoria={categoria.categoria}
                descricao={`Conformidade geral: ${categoria.percentualConformidade}%`}
                theme={currentTheme}
              />
            ))}
          </View>

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
                  onPress={() => handleDownloadPDF(analise)}
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
                  onPress={handleReprocessar}
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
          </View>
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