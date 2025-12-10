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
    const getUserData = async () => {
      try {
        let token = route.params?.userToken || await AsyncStorage.getItem('userToken');
        let user = route.params?.userData;
        
        if (!user) {
          const userDataString = await AsyncStorage.getItem('userData');
          if (userDataString) user = JSON.parse(userDataString);
        }
        
        console.log('Usuário carregado:', user?.email || 'N/A');
        setUserToken(token);
        setUserData(user);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };
    
    getUserData();
  }, []);

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        console.log('Buscando planos...');
        
        const planosData = await planosAPI.getAllPlanos();
     
        
        setPlanos(planosData);
        console.log('Planos carregados:', planosData.length);
        
      } catch (error) {
        console.error('Erro ao carregar planos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os planos.');
        setPlanos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanos();
  }, []);


 
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

  
  const getIconePorNome = (nomePlano) => {
    const iconesMap = {
      'Básico': 'star-outline',
      'Pro': 'people-outline',
      'Empresas': 'trophy-outline'
    };
    return iconesMap[nomePlano] || 'star-outline';
  };


  const getDescricaoPorNome = (nomePlano) => {
    const descMap = {
      'Básico': 'Ideal para profissionais autônomos',
      'Pro': 'Para pequenas e médias empresas',
      'Empresas': 'Para grandes organizações'
    };
    return descMap[nomePlano] || 'Plano personalizado';
  };

  if (!isLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }


  const currentTheme = {
    bg: theme === 'light' ? '#ffffff' : '#131313',
    text: theme === 'light' ? '#131313' : '#ffffff',
    textSecondary: theme === 'light' ? '#606060' : '#b8bcc8',
    primary: '#0D6EFD',
    cardBg: theme === 'light' ? '#ffffff' : '#2a2a2a',
    cardBorder: theme === 'light' ? '#e0e0e0' : '#3a3a3a',
  };


  const handleSelectPlan = (planName) => {
    try {
      console.log('Plano selecionado:', planName);
      
      const planoSelecionado = planos.find(plano => plano.nome === planName);
      
      if (!planoSelecionado) {
        Alert.alert('Erro', 'Plano não encontrado');
        return;
      }

      // Preparar dados do plano para enviar
      const planData = {
        planoId: planoSelecionado.planoId,
        title: planName,
        nome: planoSelecionado.nome,
        preco: `R$${planoSelecionado.preco?.toFixed(2).replace('.', ',')}`,
        precoNumerico: planoSelecionado.preco,
        quantidadeReq: planoSelecionado.quantidadeReq,
        quantidadeUsers: planoSelecionado.quantidadeUsers,
        itens: getItensPorNome(planName) // Relacionar itens pelo nome
      };

      console.log('Dados do plano sendo enviados:', planData);

      navigation.navigate('FinalizarEscolhaAssinatura', { 
        planData: planData,
        userToken: userToken,
        userData: userData
      });

    } catch (error) {
      console.error('Erro ao selecionar plano:', error);
      Alert.alert('Erro', 'Erro ao selecionar plano. Tente novamente.');
    }
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: currentTheme.primary }]}>
            <Text style={styles.badgeText}>Planos Flexíveis</Text>
          </View>
          
          <Text style={[styles.mainTitle, { color: currentTheme.text }]}>
            Escolha o plano ideal{'\n'}
            para seu <Text style={{ color: currentTheme.primary }}>negócio</Text>
          </Text>
          
          <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
            Desde profissionais autônomos até grandes empresas, temos a solução 
            perfeita para suas necessidades de verificação de projetos elétricos.
          </Text>
        </View>


        <View style={styles.plansSection}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plansContainer}
          >
            {planos.map((plano, index) => (
              <TiposPlanos
                key={plano.planoId || index}
                icon={getIconePorNome(plano.nome)}
                title={plano.nome}
                descricao={getDescricaoPorNome(plano.nome)}
                preco={`R$${plano.preco?.toFixed(2).replace('.', ',')}`}
                itens={getItensPorNome(plano.nome)}
                theme={currentTheme}
                onSelect={handleSelectPlan} 
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.faqSection}>
          <Text style={[styles.faqTitle, { color: currentTheme.text }]}>
            Perguntas Frequentes
          </Text>
          <Text style={[styles.faqSubtitle, { color: currentTheme.textSecondary }]}>
            Tire suas dúvidas sobre nossos planos e funcionalidades
          </Text>

          <View style={styles.faqGrid}>
            <PerguntasFrequentes
              title="Como funciona o teste grátis?"
              descricao="O plano Básico inclui 7 dias de teste gratuito com acesso completo a todas as funcionalidades. Não é necessário cartão de crédito para começar."
              theme={currentTheme}
            />

            <PerguntasFrequentes
              title="Posso mudar de plano a qualquer momento?"
              descricao="Sim, você pode alterar seu plano a qualquer momento. As mudanças são aplicadas imediatamente e você paga apenas a diferença proporcional."
              theme={currentTheme}
            />

            <PerguntasFrequentes
              title="Os relatórios seguem as normas brasileiras?"
              descricao="Sim, nossa IA é treinada especificamente para verificar conformidade com a NBR 5410 e outras normas técnicas brasileiras relevantes."
              theme={currentTheme}
            />

            <PerguntasFrequentes
              title="Há suporte técnico disponível?"
              descricao="Todos os planos incluem suporte técnico. O plano Pro tem suporte prioritário e o plano Empresas inclui suporte dedicado 24/7."
              theme={currentTheme}
            />
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
});