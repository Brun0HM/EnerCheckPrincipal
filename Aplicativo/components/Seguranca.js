import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  ActivityIndicator, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard, 
  ScrollView 
} from 'react-native';
import authAPI from '../api/Auth';

const Seguranca = ({ theme, userData }) => {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAlterarSenha = async () => {
    // Validação: verificar se userData tem email
    if (!userData?.email) {
      Alert.alert('Erro', 'Não foi possível identificar o email do usuário');
      return;
    }

    // Validações básicas
    if (!senhaAtual.trim()) {
      Alert.alert('Erro', 'Digite sua senha atual');
      return;
    }

    if (!novaSenha.trim()) {
      Alert.alert('Erro', 'Digite uma nova senha');
      return;
    }

    if (!confirmarSenha.trim()) {
      Alert.alert('Erro', 'Confirme sua nova senha');
      return;
    }

    // Verificar se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'A nova senha e a confirmação não coincidem');
      return;
    }

    // Verificar se a nova senha é diferente da atual
    if (senhaAtual === novaSenha) {
      Alert.alert('Erro', 'A nova senha deve ser diferente da senha atual');
      return;
    }

    // Validar força da senha
    const forcaSenha = validarForcaSenha(novaSenha);
    if (!forcaSenha.valida) {
      let mensagem = 'A senha deve conter:\n';
      if (!forcaSenha.tamanhoMinimo) mensagem += '• Mínimo de 8 caracteres\n';
      if (!forcaSenha.temMaiuscula) mensagem += '• Pelo menos uma letra maiúscula\n';
      if (!forcaSenha.temMinuscula) mensagem += '• Pelo menos uma letra minúscula\n';
      if (!forcaSenha.temNumero) mensagem += '• Pelo menos um número\n';
      if (!forcaSenha.temCaractereEspecial) mensagem += '• Pelo menos um caractere especial\n';
      
      Alert.alert('Senha Fraca', mensagem);
      return;
    }

    setIsLoading(true);

    try {

      console.log('Email do usuário:', userData.email);
      // Chamar API do Identity para alterar senha
      // Passa o email atual, senha atual e nova senha
      await authAPI.changePassword(userData.email, senhaAtual, novaSenha);

      // Limpar campos após sucesso
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');

      Alert.alert(
        'Sucesso! ',
        'Senha alterada com sucesso! Sua nova senha já está ativa.',
        [
          {
            text: 'OK',
            onPress: () => console.log('Senha alterada com sucesso')
          }
        ]
      );

    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      
      let mensagemErro = 'Não foi possível alterar a senha';
      
      // Tratar erros específicos do Identity
      if (error?.response?.status === 400) {
        const errorMessage = error.response.data?.message || '';
        if (errorMessage.includes('password') && errorMessage.includes('incorrect')) {
          mensagemErro = 'Senha atual incorreta';
        } else if (errorMessage.includes('requirements')) {
          mensagemErro = 'A nova senha não atende aos requisitos de segurança';
        } else {
          mensagemErro = error.response.data?.message || 'Dados inválidos';
        }
      } else if (error?.response?.status === 401) {
        mensagemErro = 'Senha atual incorreta. Verifique e tente novamente.';
      } else if (error?.response?.data?.message) {
        mensagemErro = error.response.data.message;
      }

      Alert.alert('Erro ', mensagemErro);
      
    } finally {
      setIsLoading(false);
    }
  };

  const validarForcaSenha = (senha) => {
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    const tamanhoMinimo = senha.length >= 8;

    return {
      valida: temMaiuscula && temMinuscula && temNumero && temCaractereEspecial && tamanhoMinimo,
      temMaiuscula,
      temMinuscula,
      temNumero,
      temCaractereEspecial,
      tamanhoMinimo
    };
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.cardBg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Alterar Senha</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Mantenha sua conta segura com uma senha forte
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Senha Atual</Text>
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
                editable={!isLoading}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Nova Senha</Text>
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
                editable={!isLoading}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                Mínimo 8 caracteres, com maiúsculas, minúsculas, números e caracteres especiais
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Confirmar Nova Senha</Text>
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
                editable={!isLoading}
                autoCapitalize="none"
                returnKeyType="done"
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              { 
                backgroundColor: theme.primary,
                opacity: pressed || isLoading ? 0.8 : 1 
              }
            ]}
            onPress={handleAlterarSenha}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>Alterar Senha</Text>
            )}
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Seguranca;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});