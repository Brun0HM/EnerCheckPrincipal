import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';

const Notificacoes = ({ theme }) => {
  const [emailNotif, setEmailNotif] = useState(false);
  const [projetoNotif, setProjetoNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  const handleSalvar = () => {
    alert('Preferências salvas com sucesso!');
  };

  const NotificationOption = ({ title, description, value, onValueChange }) => (
    <View style={styles.optionContainer}>
      <View style={styles.optionText}>
        <Text style={[styles.optionTitle, { color: theme.text }]}>
          {title}
        </Text>
        <Text style={[styles.optionDesc, { color: theme.textSecondary }]}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: theme.inputBorder, true: theme.primary }}
        thumbColor={value ? '#ffffff' : theme.textSecondary}
      />
    </View>
  );

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Preferências de Notificação
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Escolha como deseja receber notificações
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <NotificationOption
          title="Notificação por Email"
          description="Receba atualizações por email"
          value={emailNotif}
          onValueChange={setEmailNotif}
        />

        <NotificationOption
          title="Atualizações de Projetos"
          description="Notificações sobre status dos projetos"
          value={projetoNotif}
          onValueChange={setProjetoNotif}
        />

        <NotificationOption
          title="Emails de Marketing"
          description="Novidades e promoções"
          value={marketingNotif}
          onValueChange={setMarketingNotif}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          { 
            backgroundColor: theme.primary,
            opacity: pressed ? 0.8 : 1 
          }
        ]}
        onPress={handleSalvar}
      >
        <Text style={styles.saveButtonText}>Salvar Preferências</Text>
      </Pressable>
    </View>
  );
};

export default Notificacoes;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
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
  optionsContainer: {
    gap: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
  },
  saveButton: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});