import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContainerCircuito = ({ icone, estado, topico, result, theme }) => {
  const getIconColor = (estado) => {
    switch (estado) {
      case "text-success":
        return "#22c55e";
      case "text-danger":
        return "#ef4444";
      case "text-warning":
        return "#eab308";
      default:
        return theme.textSecondary;
    }
  };

  const getIconName = (icone) => {
    switch (icone) {
      case "bi-check2-circle":
        return "checkmark-circle";
      case "bi-x-circle":
        return "close-circle";
      case "bi-exclamation-triangle":
        return "warning";
      default:
        return "help-circle";
    }
  };

  return (
    <View style={[styles.container, { borderBottomColor: theme.cardBorder }]}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={getIconName(icone)} 
          size={20} 
          color={getIconColor(estado)} 
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={[styles.topico, { color: theme.text }]}>{topico}</Text>
        <Text style={[styles.result, { color: theme.textSecondary }]}>{result}</Text>
      </View>
    </View>
  );
};

export default ContainerCircuito;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  topico: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  result: {
    fontSize: 14,
    lineHeight: 20,
  },
});