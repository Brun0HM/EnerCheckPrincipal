import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Assinaturas = ({ theme, userData, navigation }) => {

   if (!userData) {
    return (
      <View style={[styles.container, { 
        backgroundColor: theme.cardBg, 
        borderColor: theme.cardBorder 
      }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Carregando dados da assinatura...
        </Text>
      </View>
    );
  }

   const plano = userData.plano;
  const temPlano = plano && plano !== null;

  const handleAlterarPlano = () => {
    navigation.navigate('Planos');
    
  };

  const handleCancelarAssinatura = () => {
    alert('Deseja realmente cancelar a assinatura?');
  };

  const handleEditarCartao = () => {
    alert('Navegando para edição do cartão...');
  };

  const PaymentHistory = ({ valor, data, status }) => (
    <View style={[styles.paymentItem, { borderColor: theme.cardBorder }]}>
      <View>
        <Text style={[styles.paymentValue, { color: theme.text }]}>
          R$ {valor}
        </Text>
        <Text style={[styles.paymentDate, { color: theme.textSecondary }]}>
          {data}
        </Text>
      </View>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
         {temPlano ? 'Plano Atual' : 'Nenhum Plano Ativo'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
         {temPlano ? 'Gerencie sua assinatura e método de pagamento' : 'Escolha um plano para começar'}
        </Text>
      </View>

      {/* Plano Atual */}
      <View style={[styles.planContainer, { borderColor: theme.cardBorder }]}>
        <View style={styles.planHeader}>
          <View>
            <Text style={[styles.planName, { color: theme.text }]}>
               Plano {plano.nome}
            </Text>
            <Text style={[styles.planPrice, { color: theme.text }]}>
                R$ {plano.preco?.toFixed(2).replace('.', ',')}/mês
            </Text>
          </View>
          {/* <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Ativo</Text>
          </View> */}
        </View>

        <Text style={[styles.nextBilling, { color: theme.textSecondary }]}>
          Próxima cobrança: 15 de Fevereiro, 2025
        </Text>

        <View style={styles.planButtons}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              { 
                backgroundColor: theme.primary,
                opacity: pressed ? 0.8 : 1 
              }
            ]}
            onPress={handleAlterarPlano}
          >
            <Text style={styles.primaryButtonText}>Alterar Plano</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.dangerButton,
              { opacity: pressed ? 0.8 : 1 }
            ]}
            onPress={handleCancelarAssinatura}
          >
            <Text style={styles.dangerButtonText}>Cancelar Assinatura</Text>
          </Pressable>
        </View>
      </View>

      {/* Método de Pagamento */}
      <View style={styles.paymentSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Método de Pagamento
        </Text>

        <View style={[styles.cardContainer, { borderColor: theme.cardBorder }]}>
          <View style={styles.cardInfo}>
            <View style={styles.cardDetails}>
              <Ionicons name="card-outline" size={20} color={theme.textSecondary} />
              <View style={styles.cardText}>
                <Text style={[styles.cardNumber, { color: theme.text }]}>
                  •••• •••• •••• 4242
                </Text>
                <Text style={[styles.cardExpiry, { color: theme.textSecondary }]}>
                  Expira em 12/2026
                </Text>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.editButton,
                { 
                  borderColor: theme.textSecondary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={handleEditarCartao}
            >
              <Text style={[styles.editButtonText, { color: theme.text }]}>
                Editar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Histórico de Pagamentos */}
      <View style={styles.historySection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Histórico de Pagamentos
        </Text>
        
        <View style={styles.historyList}>
          <PaymentHistory valor={plano.preco?.toFixed(2).replace('.', ',')} data="15 Jan 2025" status="Pago" />
          <PaymentHistory valor={plano.preco?.toFixed(2).replace('.', ',')} data="15 Dez 2024" status="Pago" />
          <PaymentHistory valor={plano.preco?.toFixed(2).replace('.', ',')} data="15 Nov 2024" status="Pago" />
        </View>
      </View>
    </View>
  );
};

export default Assinaturas;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },

  // Plano Atual
  planContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 16,
  },
  activeBadge: {
    backgroundColor: 'rgba(13, 110, 253, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeText: {
    color: '#0D6EFD',
    fontWeight: '600',
  },
  nextBilling: {
    marginBottom: 16,
  },
  planButtons: {
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dc3545',
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
  },

  // Método de Pagamento
  paymentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    marginLeft: 12,
  },
  cardNumber: {
    fontSize: 16,
    marginBottom: 2,
  },
  cardExpiry: {
    fontSize: 14,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  editButtonText: {
    fontWeight: '600',
  },

  // Histórico
  historySection: {},
  historyList: {
    gap: 12,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  paymentDate: {
    fontSize: 14,
  },
  statusBadge: {
    backgroundColor: 'rgba(164, 248, 164, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: '#008528',
    fontSize: 12,
    fontWeight: '600',
  },
});