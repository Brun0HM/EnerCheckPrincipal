import React, { useState } from 'react';
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
import { CommonActions } from '@react-navigation/native';

export default function FinalizarEscolhaAssinaturaScreen({setIsAuthenticated }) {
  const { theme, isLoaded } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  
  // Recebe dados do plano selecionado
  const planData = route.params?.planData || {
    title: "Básico",
    preco: "R$49",
    itens: [
      "Até 10 projetos",
      "Conformidade NBR 5410", 
      "Relatórios em PDF",
      "Suporte por email",
      "Histórico de 30 dias"
    ]
  };

  
  const [activeCard, setActiveCard] = useState(false);
  const [activeBoleto, setActiveBoleto] = useState(false);
  const [activePix, setActivePix] = useState(false);

 

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
    inputBg: theme === 'light' ? '#f8f9fa' : '#2d2d2d',
    inputBorder: theme === 'light' ? '#ced4da' : '#555555',
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

  const handlePaymentSuccess = () => {
    Alert.alert('Sucesso!', 'Pagamento realizado com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          if (setIsAuthenticated) {
            // Novo usuário - autentica e vai para app principal
            setIsAuthenticated(true);
          } else {
            // Usuário já logado - reseta o stack e vai para Geral
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Geral' }],
              })
            );
          }
        }
      }
    ]);
    console.log('✅ Pagamento realizado com sucesso!');
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