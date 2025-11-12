import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CreditCardForm = ({ theme, onPayment }) => {
  const [formData, setFormData] = useState({
    nomeCard: '',
    numeroCard: '',
    validadeCard: '',
    cvvCard: '',
    cpfCard: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCPF = (value) => {
    let formatted = value.replace(/\D/g, '');
    if (formatted.length <= 11) {
      formatted = formatted.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return formatted;
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handlePayment = () => {
    Alert.alert(
        'Pagamento Confirmado',
        'Assinatura ativada com sucesso! Redirecionando para o dashboard...',
        [{ 
          text: 'OK', 
          onPress: () => {
            console.log('💳 Pagamento com cartão confirmado');
            onPayment && onPayment();
          }
        }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Dados do Cartão
      </Text>

      {/* Nome no Cartão */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Nome no Cartão</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder,
            color: theme.text 
          }]}
          placeholder="Nome como está no cartão"
          placeholderTextColor={theme.textSecondary}
          value={formData.nomeCard}
          onChangeText={(value) => handleInputChange('nomeCard', value)}
        />
      </View>

      {/* Número do Cartão */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Número do cartão</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder,
            color: theme.text 
          }]}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          maxLength={19}
          value={formatCardNumber(formData.numeroCard)}
          onChangeText={(value) => handleInputChange('numeroCard', value.replace(/\s/g, ''))}
        />
      </View>

      {/* Validade e CVV */}
      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={[styles.label, { color: theme.text }]}>Validade</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="MM/AA"
            placeholderTextColor={theme.textSecondary}
            maxLength={5}
            value={formData.validadeCard}
            onChangeText={(value) => {
              let formatted = value.replace(/\D/g, '');
              if (formatted.length >= 2) {
                formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
              }
              handleInputChange('validadeCard', formatted);
            }}
          />
        </View>

        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={[styles.label, { color: theme.text }]}>CVV</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text 
            }]}
            placeholder="123"
            placeholderTextColor={theme.textSecondary}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            value={formData.cvvCard}
            onChangeText={(value) => handleInputChange('cvvCard', value)}
          />
        </View>
      </View>

      {/* CPF do Titular */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.text }]}>CPF do titular</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder,
            color: theme.text 
          }]}
          placeholder="000.000.000-00"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          maxLength={14}
          value={formatCPF(formData.cpfCard)}
          onChangeText={(value) => handleInputChange('cpfCard', value.replace(/\D/g, ''))}
        />
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

      {/* Segurança */}
      <View style={styles.securityInfo}>
        <Ionicons name="lock-closed" size={16} color={theme.text} />
        <Text style={[styles.securityText, { color: theme.text }]}>
          Pagamento 100% seguro e criptografado
        </Text>
      </View>

      {/* Botão de Pagamento */}
      <Pressable
        style={({ pressed }) => [
          styles.payButton,
          { 
            backgroundColor: theme.primary,
            opacity: pressed ? 0.8 : 1 
          }
        ]}
        onPress={handlePayment}
      >
        <Text style={styles.payButtonText}>Confirmar Pagamento</Text>
      </Pressable>

      {/* Termos */}
      <Text style={[styles.terms, { color: theme.textSecondary }]}>
        Ao confirmar você concorda com nossos{' '}
        <Text style={{ color: theme.primary }}>Termos de Serviço</Text> e{' '}
        <Text style={{ color: theme.primary }}>Políticas de Privacidade</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  securityText: {
    fontSize: 14,
    marginLeft: 8,
  },
  payButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default CreditCardForm;