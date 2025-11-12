import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Pix = ({ theme, onPayment }) => {
  const handlePixPayment = () => {
    Alert.alert(
      'QR Code Gerado',
      'Pago com sucesso!',
      [{ text: 'OK', onPress: () => onPayment && onPayment() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="phone-portrait" size={48} color={theme.primary} />
      </View>

      <Text style={[styles.title, { color: theme.text }]}>
        Pagamento Via Pix
      </Text>

      <Text style={[styles.description, { color: theme.textSecondary }]}>
        Após confirmar, você receberá um QR Code para realizar o pagamento instantaneamente
      </Text>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

      {/* Segurança */}
      <View style={styles.securityInfo}>
        <Ionicons name="lock-closed" size={16} color={theme.text} />
        <Text style={[styles.securityText, { color: theme.text }]}>
          Pagamento 100% seguro e criptografado
        </Text>
      </View>

      {/* Botão PIX */}
      <Pressable
        style={({ pressed }) => [
          styles.pixButton,
          { 
            backgroundColor: theme.primary,
            opacity: pressed ? 0.8 : 1 
          }
        ]}
        onPress={handlePixPayment}
      >
        <Text style={styles.pixButtonText}>Gerar QR Code PIX</Text>
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
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '100%',
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
  pixButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  pixButtonText: {
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

export default Pix;