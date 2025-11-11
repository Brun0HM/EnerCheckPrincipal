import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

const Seguranca = ({ theme }) => {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleAlterarSenha = () => {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Senha alterada com sucesso!');
  };

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Alterar Senha
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Mantenha sua conta segura com uma senha forte
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>
            Senha Atual
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="Digite sua senha atual"
            placeholderTextColor={theme.textSecondary}
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            secureTextEntry
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>
            Nova Senha
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="Digite sua nova senha"
            placeholderTextColor={theme.textSecondary}
            value={novaSenha}
            onChangeText={setNovaSenha}
            secureTextEntry
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>
            Confirmar Nova Senha
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="Confirme sua nova senha"
            placeholderTextColor={theme.textSecondary}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          { 
            backgroundColor: theme.primary,
            opacity: pressed ? 0.8 : 1 
          }
        ]}
        onPress={handleAlterarSenha}
      >
        <Text style={styles.saveButtonText}>Alterar Senha</Text>
      </Pressable>
    </View>
  );
};

export default Seguranca;

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
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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