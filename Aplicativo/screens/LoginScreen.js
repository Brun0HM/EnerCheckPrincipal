import React, { useState } from 'react';
import { 
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useColorScheme,
  Alert
} from 'react-native';
import { authAPI } from '../api/Auth';

export default function LoginScreen({ navigation, setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();

  // Tema igual ao usado em GeralScreen
  const themes = {
    light: {
      bg: '#ffffff',
      text: '#131313',
      textSecondary: '#606060',
      primary: '#0D6EFD',
      cardBg: '#ffffff',
      cardBorder: '#e0e0e0',
      inputBg: '#f8f9fa',
      inputBorder: '#ced4da',
    },
    dark: {
      bg: '#131313',
      text: '#ffffff',
      textSecondary: '#b8bcc8',
      primary: '#0D6EFD',
      cardBg: '#2a2a2a',
      cardBorder: '#3a3a3a',
      inputBg: '#2d2d2d',
      inputBorder: '#555555',
    }
  };

  const theme = themes[colorScheme] || themes.light;

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu email.');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Por favor, digite um email válido.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Erro', 'Por favor, digite sua senha.');
      return;
    }

    setIsLoading(true);

    try {
      const credentials = {
        email: email.trim(),
        senha: password,
      };

      console.log('Tentando fazer login...');
      const result = await authAPI.login(credentials);
      
      console.log('Login realizado:', result);
      
      if (result.token) {
        console.log('Token recebido:', result.token);
      }

      Alert.alert(
        'Sucesso', 
        `Login realizado com sucesso!${rememberMe ? ' (Lembrar ativado)' : ''}`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (setIsAuthenticated) {
                setIsAuthenticated(true);
              }
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Erro no login:', error);
      
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.errors) {
  
        const firstError = Object.values(error.errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      } else if (error.status === 401) {
        errorMessage = 'Email ou senha incorretos.';
      } else if (error.status === 400) {
        errorMessage = 'Dados inválidos. Verifique email e senha.';
      }
      
      Alert.alert('Erro no Login', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>EnerCheck</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Faça login em sua conta
          </Text>
        </View>

        {/* Card de Login */}
        <View style={[styles.card, { 
          backgroundColor: theme.cardBg, 
          borderColor: theme.cardBorder 
        }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Login</Text>
          <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
            Digite suas credenciais para acessar a sua conta
          </Text>

          {/* Campo Usuário */}
          <Text style={[styles.label, { color: theme.textSecondary }]}>Usuário</Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: theme.inputBg, 
                borderColor: theme.inputBorder, 
                color: theme.text 
              }
            ]}
            placeholder="Digite seu email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail} 
            keyboardType="email-address"
            autoCapitalize="none" 
            editable={!isLoading} 
          />

          {/* Campo Senha */}
          <Text style={[styles.label, { color: theme.textSecondary }]}>Senha</Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: theme.inputBg, 
                borderColor: theme.inputBorder, 
                color: theme.text 
              }
            ]}
            placeholder="Digite sua senha"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Lembrar de mim + Esqueceu senha */}
          <View style={styles.rowBetween}>
            <Pressable
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[
                  styles.checkbox,
                  { 
                    borderColor: theme.inputBorder,
                    backgroundColor: rememberMe ? theme.primary : 'transparent'
                  }
                ]}
              >
                {rememberMe && <Text style={styles.checkboxCheck}>✓</Text>}
              </View>
              <Text style={[styles.rememberText, { color: theme.textSecondary }]}>
                Lembrar de mim
              </Text>
            </Pressable>

            <Pressable onPress={() => Alert.alert('Aviso', 'Função em desenvolvimento')}>
              <Text style={[styles.forgotPassword, { color: theme.primary }]}>
                Esqueceu a senha?
              </Text>
            </Pressable>
          </View>

          {/* Botão de Login */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              { 
                backgroundColor: theme.primary,
                opacity: pressed ? 0.8 : 1 
              }
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.primaryButtonText}> {isLoading ? 'Entrando...' : 'Entrar'}</Text>
          </Pressable>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Não tem uma conta?
          </Text>
          <Pressable onPress={() => navigation?.navigate?.('Register')}
                    style={styles.loginLinkContainer}>
            <Text style={[styles.footerLink, { color: theme.primary }]}> Criar conta</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center', 
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center', 
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '900',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCheck: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
  rememberText: {
    fontSize: 14,
    marginLeft: 8,
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
