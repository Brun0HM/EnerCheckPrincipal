import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ContainerCircuito from './ContainerCircuito';

export const ContainerChecagem = ({ categoria, descricao, theme }) => {
  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      {/* Cabeçalho da seção */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
          <Ionicons name="hardware-chip-outline" size={20} color="#ffffff" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.categoria, { color: theme.text }]}>{categoria}</Text>
          <Text style={[styles.descricao, { color: theme.textSecondary }]}>{descricao}</Text>
        </View>
      </View>

      {/* Lista de circuitos */}
      <View style={styles.circuitsList}>
        <ContainerCircuito
          icone="bi-check2-circle"
          estado="text-success"
          topico="Circuito de iluminação - Sala"
          result="Dimensionamento adequado conforme NBR 5410"
          theme={theme}
        />

        <ContainerCircuito
          icone="bi-x-circle"
          estado="text-danger"
          topico="Circuito de Tomadas - Cozinha"
          result="Sobrecarga detectada - Redimensionar condutor"
          theme={theme}
        />

        <ContainerCircuito
          icone="bi-check2-circle"
          estado="text-success"
          topico="Circuito de Ar Condicionado"
          result="Proteção adequada instalada"
          theme={theme}
        />

        <ContainerCircuito
          icone="bi-x-circle"
          estado="text-danger"
          topico="Circuito de Chuveiro"
          result="DR inadequado para a potência"
          theme={theme}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  categoria: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  descricao: {
    fontSize: 14,
  },
  circuitsList: {
    marginTop: 8,
  },
});