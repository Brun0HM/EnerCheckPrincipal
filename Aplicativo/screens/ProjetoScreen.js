import React, { useEffect, useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  useColorScheme,
  Pressable
  // Image, // Comentado temporariamente até implementar upload de imagem
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InfoGeralContainer } from '../components/InfoGeralContainer';
import { ContainerChecagem } from '../components/ContainerChecagem';

export default function ProjetoScreen() {
  const [analise, setAnalise] = useState('');
  // const [imagem, setImagem] = useState(null); // Comentado temporariamente
  // const [tipo, setTipo] = useState(''); // Comentado temporariamente
  const colorScheme = useColorScheme();

  // Estados para comentários (baseado no DashboardProjeto.jsx original)
  const [comentarioGeral, setComentarioGeral] = useState("");
  const [comentConform, setComentConform] = useState("");
  const [comentInstalacao, setComentInstalacao] = useState("");

  // Pontuações dos diferentes aspectos do projeto (valores de exemplo)
  const pontuacaoGeral = 10;
  const pontuacaoConformidade = 90;
  const pontuacaoInstalacao = 50;

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

  // Funções para trocar comentários baseado nas pontuações (do DashboardProjeto.jsx original)
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
    // Carregar dados salvos no AsyncStorage (equivalente ao localStorage)
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
      // const imagemData = await AsyncStorage.getItem("Imagem"); // Comentado temporariamente
      // const tipoData = await AsyncStorage.getItem("Formato"); // Comentado temporariamente

      if (analiseData) setAnalise(analiseData);
      // if (imagemData) setImagem(imagemData); // Comentado temporariamente
      // if (tipoData) setTipo(tipoData); // Comentado temporariamente

      console.log('Dados carregados:', { analiseData });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Dashboard do Projeto</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Análise detalhada de conformidade e instalação elétrica
          </Text>
        </View>

        {/* Seção de Informações Gerais (baseado no layout original) */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <InfoGeralContainer
              topico="Pontuação Geral"
              iconeTopico="speedometer-outline"
              pontuacaoGeral={pontuacaoGeral}
              corNumero="danger"
              comentario={comentarioGeral}
              theme={theme}
            />
          </View>

          <View style={styles.infoRow}>
            <InfoGeralContainer
              topico="Conformidade NBR"
              iconeTopico="shield-checkmark-outline"
              pontuacaoGeral={pontuacaoConformidade}
              corNumero="success"
              comentario={comentConform}
              theme={theme}
            />
          </View>

          <View style={styles.infoRow}>
            <InfoGeralContainer
              topico="Instalação"
              iconeTopico="construct-outline"
              pontuacaoGeral={pontuacaoInstalacao}
              corNumero="warning"
              comentario={comentInstalacao}
              theme={theme}
            />
          </View>
        </View>

        {/* Comentado temporariamente - Imagem do projeto
        {imagem && (
          <View style={[styles.imageContainer, { 
            backgroundColor: theme.cardBg, 
            borderColor: theme.cardBorder 
          }]}>
            <Text style={[styles.imageTitle, { color: theme.text }]}>
              Projeto Analisado
            </Text>
            <Image 
              source={{ uri: imagem }} 
              style={styles.projectImage}
              resizeMode="contain"
            />
            <Text style={[styles.imageFormat, { color: theme.textSecondary }]}>
              Formato: {tipo || 'Não especificado'}
            </Text>
          </View>
        )}
        */}

        {/* Análise Detalhada */}
        <ContainerChecagem
          categoria="Circuitos de Força"
          descricao="Análise dos circuitos de força e dimensionamento"
          theme={theme}
        />

        <ContainerChecagem
          categoria="Proteção e Segurança"
          descricao="Verificação de dispositivos de proteção (DR, disjuntores)"
          theme={theme}
        />

        {/* Card de Ações Disponíveis */}
        <View style={[styles.actionCard, { 
          backgroundColor: theme.cardBg, 
          borderColor: theme.cardBorder 
        }]}>
          <Text style={[styles.actionTitle, { color: theme.text }]}>
            Ações Disponíveis
          </Text>
          
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { 
                  backgroundColor: theme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={() => alert('Baixando relatório...')}
            >
              <Text style={styles.primaryButtonText}>📄 Baixar Relatório</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                { 
                  borderColor: theme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={() => alert('Reprocessando projeto...')}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>
                🔄 Reprocessar
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Debug: Mostrar dados da análise se existir */}
        {analise && (
          <View style={[styles.debugContainer, { 
            backgroundColor: theme.cardBg, 
            borderColor: theme.cardBorder 
          }]}>
            <Text style={[styles.debugTitle, { color: theme.text }]}>
              Dados da Análise:
            </Text>
            <Text style={[styles.debugText, { color: theme.textSecondary }]}>
              {typeof analise === 'string' ? analise.substring(0, 200) + '...' : 'Dados carregados'}
            </Text>
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

  // Seção de Informações Gerais
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    marginBottom: 16,
  },

  // Card de Ações
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

  // Debug Container
  debugContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 14,
    lineHeight: 20,
  },

  /* Comentado temporariamente - Estilos da imagem
  imageContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  projectImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  imageFormat: {
    fontSize: 14,
  },
  */
});