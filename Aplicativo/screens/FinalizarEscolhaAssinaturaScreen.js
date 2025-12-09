import React, { useEffect, useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute} from '@react-navigation/native';
import ResumoPedido from '../components/ResumoPedido';
import MetodoPagamento from '../components/MetodoPagamento';
import CreditCardForm from '../components/CreditCardForm';
import Pix from '../components/Pix';
import Boleto from '../components/Boleto';
import { useTheme } from '../contexts/ThemeContext';
import { Alert } from 'react-native';
import {planosAPI} from '../api/Planos.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usuariosAPI } from '../api/Usuarios';
import authAPI from '../api/Auth';

export default function FinalizarEscolhaAssinaturaScreen({setIsAuthenticated }) {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  
  const [activeCard, setActiveCard] = useState(false);
  const [activeBoleto, setActiveBoleto] = useState(false);
  const [activePix, setActivePix] = useState(false);
  const [planData, setPlanData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        // Pegar dados dos params ou AsyncStorage
        let token = route.params?.userToken || await AsyncStorage.getItem('userToken');
        let user = route.params?.userData;
        let planFromParams = route.params?.planData;
        
        if (!user) {
          const userDataString = await AsyncStorage.getItem('userData');
          if (userDataString) user = JSON.parse(userDataString);
        }

        console.log('Dados recebidos:');
        console.log('Usuário:', user?.email);
        console.log('Plano ID:', planFromParams?.planoId);

      
        if (planFromParams?.planoId) {
          console.log('Buscando dados completos do plano...');
          
          const planoCompleto = await planosAPI.getPlanoById(token, planFromParams.planoId);
          
          // Merge dados dos params com dados da API
          const planDataCompleto = {
            ...planFromParams,
            ...planoCompleto,
            title: planFromParams.title || planoCompleto.nome,
            itens: planFromParams.itens // Manter itens do params (já relacionados)
          };
          
          setPlanData(planDataCompleto);
          console.log('Dados do plano completos:', planDataCompleto);
        } else {
          setPlanData(planFromParams);
        }

        // Configurar autenticação
        if (token) authAPI.setAuthToken(token);
        
        setUserToken(token);
        setUserData(user);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        Alert.alert('Erro', 'Erro ao carregar dados.', [
          { text: 'Voltar', onPress: () => navigation.goBack() }
        ]);
      }
    };

    loadData();
  }, []);
  

  
  // Cores diretas baseadas no tema
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



  const handlePaymentSuccess = async () => {
    try {
      console.log('Processando pagamento...');
      console.log('Plano:', planData?.nome);
      console.log('Usuário:', userData?.email);

      console.log('Vinculando plano ao usuário...');
      await usuariosAPI.vincularPlano(planData.planoId);
      console.log('Plano vinculado ao usuário');

      Alert.alert(
        'Pagamento Realizado! 🎉',
        `Seu plano ${planData.title} foi ativado com sucesso!`,
        [{
          text: 'Começar a Usar',
          onPress: async () => {
            if (setIsAuthenticated) {
              // Primeiro acesso
              setIsAuthenticated(true);
            } else {
            console.log('✅ Atualizando dados e voltando ao Dashboard...');
            
            // 1. Atualizar dados no AsyncStorage
            const updatedUser = await usuariosAPI.getUserByToken();
            await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
            console.log('✅ Dados atualizados');
            
            // 2. Voltar ao Dashboard
            // Usa getParent() para acessar o TabNavigator
            const tabNavigator = navigation.getParent();
            
            // Vai para a tab Geral
            tabNavigator?.navigate('Geral', {
              reload: true,
              timestamp: Date.now()
            });
            
            // Remove todas as telas do stack atual (volta para raiz do stack)
            navigation.popToTop();
          }
        }
      }]
    );

    } catch (error) {
      console.error('Erro no pagamento:', error);
      Alert.alert('Erro', 'Erro ao processar pagamento. Tente novamente.');
    }
  };

  const handleActiveCard = () => {
    setActiveCard(true);
    setActiveBoleto(false);
    setActivePix(false);
  };

  const handleActiveBoleto = () => {
    setActiveBoleto(true);
    setActiveCard(false);
    setActivePix(false);
  };

  const handleActivePix = () => {
    setActivePix(true);
    setActiveBoleto(false);
    setActiveCard(false);
  };
  const getTokenStatus = () => {
    if (!userData) return '';
    return `Logado como: ${userData.email}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            Finalize a sua Assinatura
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
            Complete os dados de pagamento para começar a usar o EnerCheck
          </Text>
            {userData && (
            <Text style={[styles.userStatus, { color: currentTheme.primary }]}>
              {getTokenStatus()}
            </Text>
          )}
        </View>

        {/* Layout Principal */}
        <View style={styles.mainContent}>
          {/* Seção de Pagamento */}
          <View style={[styles.paymentSection, { 
            backgroundColor: currentTheme.cardBg, 
            borderColor: currentTheme.cardBorder 
          }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
                Informações de Pagamento
              </Text>
              <Text style={[styles.sectionSubtitle, { color: currentTheme.textSecondary }]}>
                Escolha o método de pagamento e preencha os dados
              </Text>
            </View>

            {/* Métodos de Pagamento */}
            <Text style={[styles.methodsTitle, { color: currentTheme.text }]}>
              Método de pagamento
            </Text>

            <MetodoPagamento
              icon="card"
              titulo="Cartão de Crédito"
              exemplo="Elo, Visa, Mastercard"
              onClick={handleActiveCard}
              isSelected={activeCard}
              theme={currentTheme}
            />

            <MetodoPagamento
              icon="phone-portrait"
              titulo="PIX"
              exemplo="Pagamento Instantâneo"
              onClick={handleActivePix}
              isSelected={activePix}
              theme={currentTheme}
            />

            <MetodoPagamento
              icon="document-text"
              titulo="Boleto Bancário"
              exemplo="Vencimento em três dias úteis"
              onClick={handleActiveBoleto}
              isSelected={activeBoleto}
              theme={currentTheme}
            />

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: currentTheme.text }]} />

            {/* Formulários de Pagamento */}
            {activeCard && (
              <CreditCardForm 
                theme={currentTheme} 
                onPayment={handlePaymentSuccess}
              />
            )}

            {activePix && (
              <Pix 
                theme={currentTheme} 
                onPayment={handlePaymentSuccess}
              />
            )}

            {activeBoleto && (
              <Boleto 
                theme={currentTheme} 
                onPayment={handlePaymentSuccess}
              />
            )}
          </View>

          {/* Resumo do Pedido */}
          <View style={styles.summarySection}>
            <ResumoPedido 
              theme={currentTheme} 
              planData={planData}
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
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
  mainContent: {
    flexDirection: 'column',
    gap: 16,
  },
  paymentSection: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  methodsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  divider: {
    height: 2,
    marginVertical: 20,
  },
  summarySection: {
    // Para layouts maiores, pode ser posicionado ao lado
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
  },
});