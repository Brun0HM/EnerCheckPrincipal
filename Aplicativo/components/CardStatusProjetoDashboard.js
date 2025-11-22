import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CardStatusProjetoDashboard = ({ status, iconeStatus, num, desc, theme }) => {
  // Mapear ícones Bootstrap para Ionicons
  const getIconName = (bootstrapIcon) => {
    const iconMap = {
      'bi bi-file-earmark-text': 'document-text-outline',
      'bi bi-check2-circle': 'checkmark-circle-outline',
      'bi bi-exclamation-triangle': 'warning-outline',
      'bi bi-graph-up': 'trending-up-outline',
    };
    return iconMap[bootstrapIcon] || 'document-outline';
  };

  return (
    <View style={[styles.card, { 
      backgroundColor: theme.cardBg,
      borderColor: theme.cardBorder 
    }]}>
      <View style={styles.header}>
        <Ionicons 
          name={getIconName(iconeStatus)} 
          size={20} 
          color={theme.primary} 
        />
        <Text style={[styles.status, { color: theme.text }]}>{status}</Text>
      </View>
      
      <Text style={[styles.number, { color: theme.text }]}>{num}</Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
  },
});

export default CardStatusProjetoDashboard;