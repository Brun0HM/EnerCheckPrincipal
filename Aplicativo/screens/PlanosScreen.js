import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TiposPlanos from '../components/TiposPlanos';
import PerguntasFrequentes from '../components/PerguntasFrequentes';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function PlanosScreen() {
  const { theme, isLoaded } = useTheme();
    const navigation = useNavigation();

  console.log('📱 PlanosScreen renderizada - tema:', theme);

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

  const handleSelectPlan = (planName) => {
    let planData = {};
    
    switch (planName) {
      case 'Básico':
        planData = {
          title: 'Básico',
          preco: 'R$49',
          itens: [
            "Até 10 projetos",
            "Conformidade NBR 5410",
            "Relatórios em PDF",
            "Suporte por email",
            "Histórico de 30 dias",
          ]
        };
        break;
        
      case 'Pro':
        planData = {
          title: 'Pro',
          preco: 'R$149',
          itens: [
            "Até 50 projetos",
            "Conformidade NBR 5410",
            "Relatórios personalizados",
            "Suporte prioritário",
            "Histórico ilimitado",
            "API de integração",
          ]
        };
        break;
        
      case 'Empresas':
        planData = {
          title: 'Empresas',
          preco: 'R$399',
          itens: [
            "Projetos ilimitados",
            "Conformidade NBR 5410",
            "Relatórios white-label",
            "Suporte dedicado 24/7",
            "API completa",
            "Treinamento personalizado",
            "SLA garantido",
          ]
        };
        break;
        
      default:
        planData = {
          title: 'Básico',
          preco: 'R$49',
          itens: [
            "Até 10 projetos",
            "Conformidade NBR 5410",
            "Relatórios em PDF",
            "Suporte por email",
            "Histórico de 30 dias",
          ]
        };
    }

    console.log('📦 Dados do plano sendo enviados:', planData);

    // Navegar para a tela de finalização
    navigation.navigate('FinalizarEscolhaAssinatura', { 
      planData: planData
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho Principal */}
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

        {/* Seção de Planos */}
        <View style={styles.plansSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plansContainer}
          >
            <TiposPlanos
              icon="star-outline"
              title="Básico"
              descricao="Ideal para profissionais autônomos"
              preco="R$49"
              itens={[
                "Até 10 projetos",
                "Conformidade NBR 5410",
                "Relatórios em PDF",
                "Suporte por email",
                "Histórico de 30 dias",
              ]}
              theme={currentTheme}
              onSelect={handleSelectPlan}
            />

            <TiposPlanos
              icon="people-outline"
              title="Pro"
              descricao="Para pequenas e médias empresas"
              preco="R$149"
              itens={[
                "Até 50 projetos",
                "Conformidade NBR 5410",
                "Relatórios personalizados",
                "Suporte prioritário",
                "Histórico ilimitado",
                "API de integração",
              ]}
              theme={currentTheme}
              onSelect={handleSelectPlan}
            />

            <TiposPlanos
              icon="trophy-outline"
              title="Empresas"
              descricao="Para grandes organizações"
              preco="R$399"
              itens={[
                "Projetos ilimitados",
                "Conformidade NBR 5410",
                "Relatórios white-label",
                "Suporte dedicado 24/7",
                "API completa",
                "Treinamento personalizado",
                "SLA garantido",
              ]}
              theme={currentTheme}
              onSelect={handleSelectPlan}
            />
          </ScrollView>
        </View>

        {/* Seção FAQ */}
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