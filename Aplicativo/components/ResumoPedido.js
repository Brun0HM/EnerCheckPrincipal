import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResumoPedido = ({ theme, planData }) => {
  const { title = "Básico", preco = "R$49", itens = [] } = planData || {};

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      <Text style={[styles.title, { color: theme.text }]}>Resumo do Pedido</Text>
      
      <View style={styles.planInfo}>
        <View style={styles.priceRow}>
          <Text style={[styles.planName, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.planPrice, { color: theme.text }]}>{preco}</Text>
        </View>
        <Text style={[styles.period, { color: theme.textSecondary }]}>por mês</Text>
        
        <View style={[styles.badge, { backgroundColor: theme.primary + '20' }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>
            7 dias grátis
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

      <Text style={[styles.resourcesTitle, { color: theme.text }]}>
        Recursos inclusos:
      </Text>

      <View style={styles.resourcesList}>
        {itens.map((item, index) => (
          <View key={index} style={styles.resourceItem}>
            <Ionicons 
              name="checkmark" 
              size={16} 
              color={theme.primary} 
              style={styles.checkIcon}
            />
            <Text style={[styles.resourceText, { color: theme.text }]}>
              {item}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: theme.text }]}>Subtotal:</Text>
          <Text style={[styles.totalValue, { color: theme.text }]}>R$00.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: theme.text }]}>Desconto:</Text>
          <Text style={[styles.totalValue, { color: theme.text }]}>R$00.00</Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

      <View style={styles.finalTotal}>
        <Text style={[styles.finalTotalLabel, { color: theme.text }]}>Total</Text>
        <Text style={[styles.finalTotalValue, { color: theme.text }]}>R$00.00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 16,
    padding: 16,
    margin: 8,
    minHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  planInfo: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 14,
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  resourcesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  resourcesList: {
    marginBottom: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 8,
  },
  resourceText: {
    fontSize: 14,
    flex: 1,
  },
  totalsSection: {
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 14,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  finalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  finalTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ResumoPedido;