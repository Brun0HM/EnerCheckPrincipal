import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useColorScheme,
  Alert,
} from 'react-native';
import { usuariosAPI } from '../api/Usuarios';
import { authAPI } from '../api/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const hasMinLength = (s) => s?.length >= 8;
const hasUpper = (s) => /[A-Z]/.test(s || '');
const hasLower = (s) => /[a-z]/.test(s || '');
const hasNumber = (s) => /[0-9]/.test(s || '');
const hasSpecialChar = (s) => /[!@#$%^&*(),.?":{}|<>]/.test(s || '');

const senhaForte = (s) => hasMinLength(s) && hasUpper(s) && hasLower(s) && hasNumber(s) && hasSpecialChar(s);

// Validação do CREA (6 dígitos)
const validarCrea = (crea) => {
  const creaRegex = /^\d{6}$/;
  return creaRegex.test(crea);
};

// Validação do email
const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

  export default function RegisterScreen({ navigation }) {
    const colorScheme = useColorScheme();

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [numeroCrea, setNumeroCrea] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [aceitoTermos, setAceitoTermos] = useState(false);
    const [receberAtualizacoes, setReceberAtualizacoes] = useState(false);
    const [errors, setErrors] = useState({})

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
      success: '#22c55e',
      fail: '#dc3545',
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
      success: '#22c55e',
      fail: '#dc3545',
    },
  };

  const theme = themes[colorScheme] || themes.light;

  const checks = useMemo(() => ({
    length: hasMinLength(senha),
    upper: hasUpper(senha),
    lower: hasLower(senha),
    number: hasNumber(senha),
    special: hasSpecialChar(senha),
  }), [senha]);

  // Validação completa do formulário
  const validarFormulario = () => {
    const novosErros = {};

    // Nome completo
    if (!nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    } else if (nome.trim().length < 2) {
      novosErros.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Sobrenome
    if (!sobrenome.trim()) {
      novosErros.sobrenome = 'Sobrenome é obrigatório';
    }

    // Email
    if (!email.trim()) {
      novosErros.email = 'Email é obrigatório';
    } else if (!validarEmail(email)) {
      novosErros.email = 'Email inválido';
    }

    // CREA obrigatório
    if (!numeroCrea.trim()) {
      novosErros.numeroCrea = 'O CREA é obrigatório';
    } else if (!validarCrea(numeroCrea)) {
      novosErros.numeroCrea = 'CREA inválido. Deve conter 6 dígitos';
    }

    // Senha
    if (!senha) {
      novosErros.senha = 'Senha é obrigatória';
    } else if (!senhaForte(senha)) {
      novosErros.senha = 'A senha precisa ter 8+ caracteres, maiúscula, minúscula, número e caractere especial';
    }

    // Confirmar senha
    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem';
    }

    // Termos
    if (!aceitoTermos) {
      novosErros.aceitoTermos = 'Você deve aceitar os termos e condições';
    }

    return novosErros;
  };

  const handleRegister = async () => {
    try {
      // 1. Criar usuário
      const userData = {
        email: email.trim(),
        senha: senha,
        nomeCompleto: `${nome.trim()} ${sobrenome.trim()}`,
        numeroCrea: numeroCrea.trim(),
        empresa: empresa.trim() || "",
        userReq: 0,
      };

      console.log('📤 Dados para registro:', userData);

      console.log('📝 Criando usuário...');
      const registerResult = await usuariosAPI.createCliente(userData);
      console.log('Usuário criado com sucesso:', registerResult);
      
      // 2. Fazer login
      console.log('Fazendo login...');
      const loginResult = await authAPI.login(userData.email, senha);
      
      // 3. Salvar dados
      const token = loginResult.token || loginResult.accessToken;
      if (!token) {
        throw new Error('Token não foi retornado pela API');
      }
      
      console.log('Token recebido:', token.substring(0, 50) + '...');
      const user = loginResult.user || {
        email: userData.email,
        nomeCompleto: userData.nomeCompleto,
        numeroCrea: userData.numeroCrea,
        empresa: userData.empresa,
      };

      try {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        console.log('✅ Dados salvos no AsyncStorage');
      } catch (storageError) {
        console.error(' Erro ao salvar no AsyncStorage:', storageError);
        throw new Error('Erro ao salvar dados localmente');
      }
  
      Alert.alert(
        'Cadastro Realizado! 🎉', 
        `Bem-vindo(a), ${nome}! Sua conta foi criada com sucesso.`,
        [{
          text: 'Escolher Plano',
          onPress: () => {
            navigation.navigate('Planos', {
              userToken: token,
              userData: user
            });
          }
        }]
      );
  
    } catch (error) {
      console.error(' ERRO NO PROCESSO DE REGISTRO:');
      console.error('Erro completo:', error);
      console.error('Resposta da API:', error?.response?.data);
      
      // Mensagem de erro mais específica
      let errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
      
      if (error?.message === 'Token não foi retornado pela API') {
        errorMessage = 'Erro na autenticação. Tente fazer login manualmente.';
      } else if (error?.message?.includes('AsyncStorage')) {
        errorMessage = 'Erro ao salvar dados. Tente novamente.';
      } else if (error?.response?.status === 400) {
        errorMessage = 'Dados inválidos. Verifique as informações.';
      } else if (error?.response?.status === 409) {
        errorMessage = 'Este email já está cadastrado. Faça login.';
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Alert.alert('Erro no Cadastro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const podeEnviar = () => {
    return (
      nome.trim() &&
      sobrenome.trim() &&
      email.trim() &&
      numeroCrea.trim() &&
      senha &&
      confirmarSenha &&
      aceitoTermos &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>EnerCheck</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Crie sua conta</Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>Criar conta</Text>
          <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
            Preencha os dados abaixo para criar sua conta
          </Text>

          {/* Nome e Sobrenome */}
          <View style={styles.row}>
            <Input 
              label="Nome *" 
              value={nome} 
              onChangeText={setNome} 
              placeholder="Nome Completo" 
              theme={theme} 
              style={{ flex: 1, marginRight: 8 }}
              error={errors.nome}
            />
            <Input 
              label="Sobrenome *" 
              value={sobrenome} 
              onChangeText={setSobrenome} 
              placeholder="Sobrenome" 
              theme={theme} 
              style={{ flex: 1, marginLeft: 8 }}
              error={errors.sobrenome}
            />
          </View>

          {/* Email */}
          <Input 
            label="Email *" 
            value={email} 
            onChangeText={setEmail} 
            placeholder="meu@email.com" 
            keyboardType="email-address" 
            theme={theme}
            error={errors.email}
          />

          {/* Empresa (opcional) */}
          <Input 
            label="Empresa (opcional)" 
            value={empresa} 
            onChangeText={setEmpresa} 
            placeholder="Sua empresa" 
            theme={theme}
          />

          {/* CREA obrigatório */}
          <Input 
            label="CREA *" 
            value={numeroCrea} 
            onChangeText={setNumeroCrea} 
            placeholder="Apenas números" 
            keyboardType="numeric"
            maxLength={6}
            theme={theme}
            error={errors.numeroCrea}
          />

          {/* Senha */}
          <Input 
            label="Senha *" 
            value={senha} 
            onChangeText={setSenha} 
            placeholder="Senha (min. 8 caracteres)" 
            secureTextEntry 
            theme={theme}
            error={errors.senha}
          />

          {/* Indicador de força da senha */}
          {senha && (
            <View style={styles.passwordStrengthContainer}>
              <Text style={[styles.strengthLabel, { color: theme.textSecondary }]}>
                Força da senha:
              </Text>
              <PasswordStrength checks={checks} theme={theme} />
            </View>
          )}

          {/* Confirmar senha */}
          <Input 
            label="Confirmar senha *" 
            value={confirmarSenha} 
            onChangeText={setConfirmarSenha} 
            placeholder="Confirme sua senha" 
            secureTextEntry 
            theme={theme}
            error={errors.confirmarSenha}
          />

          {/* Checkbox termos */}
          <Checkbox 
            label={
              <Text>
                Aceito os{' '}
                <Text style={{ color: theme.primary, textDecorationLine: 'underline' }}>
                  termos e condições
                </Text>
                {' *'}
              </Text>
            }
            checked={aceitoTermos} 
            onPress={() => setAceitoTermos(!aceitoTermos)} 
            theme={theme}
            error={errors.aceitoTermos}
          />

          {/* Checkbox atualizações */}
          <Checkbox 
            label="Quero receber atualizações sobre novos recursos e melhorias" 
            checked={receberAtualizacoes} 
            onPress={() => setReceberAtualizacoes(!receberAtualizacoes)} 
            theme={theme}
          />

          {/* Link para login */}
          <Pressable
            onPress={() => navigation?.navigate?.('Login')}
            style={styles.loginLinkContainer}
          >               
            <Text style={[styles.link, { color: theme.primary }]}>
              Já tenho uma conta
            </Text>
          </Pressable>

          {/* Botão de cadastro */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: podeEnviar() ? theme.primary : theme.textSecondary,
                opacity: pressed && podeEnviar() ? 0.85 : 1,
              },
            ]}
            onPress={handleRegister}
            disabled={!podeEnviar()}
          >
            <Text style={[styles.primaryButtonText, { 
              color: '#ffffff',
              opacity: podeEnviar() ? 1 : 0.6 
            }]}>
              {!podeEnviar() && Object.keys(errors).length > 0
                ? 'Corrija os erros acima'
                : podeEnviar()
                ? 'Criar conta'
                : 'Preencha todos os campos obrigatórios'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}


/* Componente Input com suporte a erro */
const Input = ({ label, theme, style, error, ...props }) => (
  <View style={[{ marginBottom: 16 }, style]}>
    <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: theme.inputBg,
          borderColor: error ? theme.fail : theme.inputBorder,
          color: theme.text,
        },
      ]}
      placeholderTextColor={theme.textSecondary}
      {...props}
    />
    {error && (
      <Text style={[styles.errorText, { color: theme.fail }]}>
        {error}
      </Text>
    )}
  </View>
);

/* Componente Checkbox com suporte a erro */
const Checkbox = ({ label, checked, onPress, theme, error }) => (
  <View style={{ marginBottom: 12 }}>
    <Pressable style={styles.checkboxContainer} onPress={onPress}>
      <View
        style={[
          styles.checkbox,
          {
            borderColor: error ? theme.fail : (checked ? theme.primary : theme.inputBorder),
            backgroundColor: checked ? theme.primary : 'transparent',
          },
        ]}
      >
        {checked && <Text style={styles.checkboxCheck}>✓</Text>}
      </View>
      <Text style={[styles.checkboxLabel, { color: theme.text }]}>
        {typeof label === 'string' ? label : label}
      </Text>
    </Pressable>
    {error && (
      <Text style={[styles.errorText, { color: theme.fail, marginLeft: 28 }]}>
        {error}
      </Text>
    )}
  </View>
);

/* Indicador de força da senha */
const PasswordStrength = ({ checks, theme }) => {
  const items = [
    { ok: checks.length, label: '8+ caracteres' },
    { ok: checks.upper, label: 'Maiúscula' },
    { ok: checks.lower, label: 'Minúscula' },
    { ok: checks.number, label: 'Número' },
    { ok: checks.special, label: 'Especial' },
  ];

  return (
    <View style={styles.strengthRow}>
      {items.map((item, i) => (
        <Text
          key={i}
          style={{
            color: item.ok ? theme.success : theme.fail,
            fontSize: 12,
            fontWeight: '600',
            marginRight: 12,
            marginTop: 2,
          }}
        >
          {item.ok ? '✓' : '✗'} {item.label}
        </Text>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 36, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginTop: 24 
  },
  subtitle: { fontSize: 16 },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: '100%',
    maxWidth: 410,
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  cardSubtitle: { 
    fontSize: 14, 
    marginBottom: 20 
  },
  row: { 
    flexDirection: 'row', 
    marginBottom: 8 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 6 
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCheck: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 13 
  },
  checkboxLabel: { 
    fontSize: 14, 
    marginLeft: 8, 
    flexShrink: 1 
  },
  primaryButton: { 
    marginTop: 12, 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  primaryButtonText: { 
    fontSize: 16, 
    fontWeight: '600' 
  },
  link: { 
    fontSize: 14, 
    textAlign: 'center', 
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loginLinkContainer: { 
    alignItems: 'center', 
    marginTop: 12,
    marginBottom: 12,
  },
  passwordStrengthContainer: { 
    marginTop: -8, 
    marginBottom: 12 
  },
  strengthLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  strengthRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },

});