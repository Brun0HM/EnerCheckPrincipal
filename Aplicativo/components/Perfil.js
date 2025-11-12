import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

const Perfil = ({ theme }) => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSalvar = () => {
    alert('Alterações salvas com sucesso!');
  };

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Informações Pessoais
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Atualize suas informações de perfil
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>
            Nome Completo
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="Seu nome completo"
            placeholderTextColor={theme.textSecondary}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Email</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="seu@email.com"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Empresa</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="Nome da Empresa"
            placeholderTextColor={theme.textSecondary}
            value={empresa}
            onChangeText={setEmpresa}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Telefone</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="(00)00000-0000"
            placeholderTextColor={theme.textSecondary}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
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
        onPress={handleSalvar}
      >
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </Pressable>
    </View>
  );
};

export default Perfil;

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