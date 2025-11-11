import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CardStatusProjetoDashboard = ({ status, iconeStatus, num, desc, theme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
      <View style={styles.content}>
        {/* Cabeçalho com título e ícone */}
        <View style={styles.header}>
          <Text style={[styles.statusText, { color: theme.text }]}>{status}</Text>
          <Ionicons name={iconeStatus} size={20} color={theme.textSecondary} />
        </View>

        {/* Valor principal */}
        <View style={styles.numberRow}>
          <Text style={[styles.number, { color: theme.text }]}>{num}</Text>
        </View>

        {/* Descrição adicional */}
        <View style={styles.descRow}>
          <Text style={[styles.desc, { color: theme.textSecondary }]}>{desc}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  descRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  desc: {
    fontSize: 12,
  },
});