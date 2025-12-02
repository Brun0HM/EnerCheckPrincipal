import React, { useEffect, useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TiposPlanos from '../components/TiposPlanos';
import PerguntasFrequentes from '../components/PerguntasFrequentes';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { planosAPI } from '../api/Planos';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlanosScreen() {
  const { theme, isLoaded } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [planos, setPlanos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        setIsLoading(true);
        console.log('📤 Buscando planos da API...');
        
        const planosData = await planosAPI.getAllPlanos();
        console.log('✅ Planos carregados:', planosData?.length || 0);
        
        if (Array.isArray(planosData)) {
          const planosAtivos = planosData.filter(plano => plano.ativo);
          setPlanos(planosAtivos);
          console.log('📋 Planos ativos:', planosAtivos.length);
        } else {
          console.warn('⚠️ Planos recebidos não são um array:', typeof planosData);
          setPlanos([]);
        }
        
      } catch (error) {
        console.error('❌ Erro ao carregar planos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os planos. Verifique sua conexão.');
        setPlanos([]); // ✅ Array vazio em caso de erro
      } finally {
        setIsLoading(false);
      }
    };

    // ✅ Só buscar planos quando componente montar
    fetchPlanos();
  }, []);

  // ✅ Função para obter itens por nome do plano
  const getItensPorNome = (nomePlano) => {
    const itensMap = {
      'Básico': [
        "Até 10 projetos",
        "Conformidade NBR 5410", 
        "Relatórios em PDF",
        "Suporte por email",
        "Histórico de 30 dias",
      ],
      'Pro': [
        "Até 50 projetos",
        "Conformidade NBR 5410",
        "Relatórios personalizados", 
        "Suporte prioritário",
        "Histórico ilimitado",
        "API de integração",
      ],
      'Empresas': [
        "Projetos ilimitados",
        "Conformidade NBR 5410",
        "Relatórios white-label",
        "Suporte dedicado 24/7",
        "API completa", 
        "Treinamento personalizado",
        "SLA garantido",
      ]
    };

    return itensMap[nomePlano] || [
      "Funcionalidades básicas",
      "Suporte padrão"
    ];
  };

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Carregando tema...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Carregando planos...</Text>
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

  // ✅ CORRIGIDO: handleSelectPlan
  const handleSelectPlan = async (planoSelecionado) => {
    try {
      console.log('📦 Plano selecionado:', planoSelecionado);
      console.log('🔐 Token disponível:', userToken ? 'Sim' : 'Não');
      console.log('👤 Dados do usuário:', userData ? JSON.stringify(userData) : 'Vazio');

      const planData = {
        planoId: planoSelecionado.planoId, 
        title: planoSelecionado.nome,
        preco: `R$${planoSelecionado.preco?.toFixed(2).replace('.', ',')}`,
        precoNumerico: planoSelecionado.preco,
        quantidadeReq: planoSelecionado.quantidadeReq,
        quantidadeUsers: planoSelecionado.quantidadeUsers,
        itens: getItensPorNome(planoSelecionado.nome),
      };

      console.log('🚀 Dados sendo enviados:', {
        planData,
        userToken: userToken ? 'Presente' : 'Ausente',
        userData: userData ? 'Presente' : 'Ausente'
      });

      // ✅ Navegar passando token e userData separadamente
      navigation.navigate('FinalizarEscolhaAssinatura', { 
        planData: planData,
        userToken: userToken,
        userData: userData
      });

    } catch (error) {
      console.error('❌ Erro ao selecionar plano:', error);
      Alert.alert('Erro', 'Erro ao selecionar plano. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ✅ Debug info no topo (remover depois) */}
        {__DEV__ && (
          <View style={{ padding: 10, backgroundColor: 'rgba(0,0,255,0.1)', margin: 10 }}>
            <Text>🔐 Token: {userToken ? 'Presente' : 'Ausente'}</Text>
            <Text>👤 User: {userData ? JSON.stringify(userData).substring(0, 50) + '...' : 'Vazio'}</Text>
          </View>
        )}
        
        <TiposPlanos 
          theme={theme}
          planos={planos}
          onSelectPlan={handleSelectPlan}
        />
        <PerguntasFrequentes theme={theme} />
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

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },

  // Plans Section
  plansSection: {
    marginBottom: 48,
  },
  plansContainer: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },

  // FAQ Section
  faqSection: {
    marginBottom: 24,
  },
  faqTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  faqSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  faqGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  // Debug
  debugContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  debugText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});