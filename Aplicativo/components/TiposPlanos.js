import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TiposPlanos = ({ icon, title, descricao, preco, itens, theme, onSelect }) => {
  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      {/* Ícone do plano */}
      <View style={[styles.iconContainer, { backgroundColor: theme.bg }]}>
        <Ionicons 
          name={icon} 
          size={24} 
          color={theme.primary} 
        />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {/* Cabeçalho do plano */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {descricao}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: theme.text }]}>{preco}</Text>
            <Text style={[styles.period, { color: theme.textSecondary }]}>/mês</Text>
          </View>
        </View>

        {/* Lista de benefícios */}
        <View style={styles.benefitsList}>
          {itens.map((item, index) => (
            <View key={index} style={styles.benefitItem}>
              <Ionicons 
                name="checkmark-circle" 
                size={16} 
                color={theme.primary} 
                style={styles.checkIcon}
              />
              <Text style={[styles.benefitText, { color: theme.text }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Botão de ação */}
        <Pressable
          style={({ pressed }) => [
            styles.selectButton,
            { 
              backgroundColor: theme.primary,
              opacity: pressed ? 0.8 : 1 
            }
          ]}
          onPress={() => onSelect && onSelect(title)}
        >
          <Text style={styles.selectButtonText}>Escolher {title}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    margin: 8,
    minHeight: 500,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    alignSelf: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    minHeight: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  benefitsList: {
    flex: 1,
    justifyContent: 'flex-start',
    minHeight: 225,
    maxHeight: 225,
    paddingVertical: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  checkIcon: {
    marginRight: 8,
    flexShrink: 0,
  },
  benefitText: {
    fontSize: 14,
    flex: 1,
  },
  selectButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TiposPlanos;