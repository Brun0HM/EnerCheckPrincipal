import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PerguntasFrequentes = ({ title, descricao, theme }) => {
  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        {descricao}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    margin: 8,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default PerguntasFrequentes;