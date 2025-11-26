import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MetodoPagamento = ({ icon, titulo, exemplo, onClick, isSelected, theme }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.paymentMethod,
          { 
            backgroundColor: theme.cardBg,
            borderColor: theme.cardBorder,
            opacity: pressed ? 0.8 : 1 
          }
        ]}
        onPress={onClick}
      >
        {/* Indicador de seleção */}
        <View style={styles.radioContainer}>
          <View style={[
            styles.radioButton,
            { 
              borderColor: isSelected ? theme.primary : theme.textSecondary,
              backgroundColor: isSelected ? theme.primary : 'transparent'
            }
          ]}>
            {isSelected && (
              <View style={[styles.radioInner, { backgroundColor: '#ffffff' }]} />
            )}
          </View>
        </View>

        {/* Ícone do método */}
        <View style={styles.iconContainer}>
          <Ionicons 
            name={icon} 
            size={20} 
            color={theme.primary} 
          />
        </View>

        {/* Informações do método */}
        <View style={styles.infoContainer}>
          <Text style={[styles.title, { color: theme.text }]}>{titulo}</Text>
          <Text style={[styles.example, { color: theme.textSecondary }]}>
            {exemplo}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 8,
  },
  radioContainer: {
    marginRight: 16,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  example: {
    fontSize: 14,
  },
});

export default MetodoPagamento;