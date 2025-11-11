import React, { useState } from 'react';
import { 
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useColorScheme,
  Alert
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      Alert.alert('Sucesso', `Login bem-sucedido!${rememberMe ? ' (Lembrar ativado)' : ''}`);
      // navigation.navigate('GeralScreen');
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
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
            placeholder="Digite seu usuário"
            placeholderTextColor={theme.textSecondary}
            value={username}
            onChangeText={setUsername}
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
          >
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </Pressable>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Não tem uma conta?
          </Text>
          <Pressable onPress={() => Alert.alert('Cadastro', 'Função em desenvolvimento')}>
            <Text style={[styles.footerLink, { color: theme.primary }]}> Criar conta</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
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
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
