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


const hasMinLength = (s) => s?.length >= 8;
const hasUpper = (s) => /[A-Z]/.test(s || '');
const hasLower = (s) => /[a-z]/.test(s || '');
const hasNumber = (s) => /[0-9]/.test(s || '');

const senhaForte = (s) => hasMinLength(s) && hasUpper(s) && hasLower(s) && hasNumber(s);

export default function RegisterScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [receberAtualizacoes, setReceberAtualizacoes] = useState(false);

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
      success: '#00c851',
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
      success: '#00c851',
      fail: '#dc3545',
    },
  };

  const theme = themes[colorScheme] || themes.light;

  const checks = useMemo(() => ({
    length: hasMinLength(senha),
    upper: hasUpper(senha),
    lower: hasLower(senha),
    number: hasNumber(senha),
  }), [senha]);

  const handleRegister = () => {
    if (!nome || !sobrenome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!senhaForte(senha)) {
      Alert.alert(
        'Senha Fraca',
        'A senha deve ter ao menos 8 caracteres, incluir letra maiúscula, minúscula e número.'
      );
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    if (!aceitoTermos) {
      Alert.alert('Aviso', 'Você deve aceitar os termos e condições.');
      return;
    }
    Alert.alert('Cadastro realizado!', `Bem-vindo(a), ${nome}!`);
  navigation.navigate('Planos');
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
          <Text style={[styles.cardTitle, { color: theme.text }]}>Cadastro</Text>
          <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
            Preencha os dados abaixo para criar sua conta.
          </Text>

          <View style={styles.row}>
            <Input label="Nome" value={nome} onChangeText={setNome} placeholder="Digite seu nome" theme={theme} style={{ flex: 1, marginRight: 8 }} />
            <Input label="Sobrenome" value={sobrenome} onChangeText={setSobrenome} placeholder="Seu sobrenome" theme={theme} style={{ flex: 1, marginLeft: 8 }} />
          </View>

          <Input label="E-mail" value={email} onChangeText={setEmail} placeholder="Digite seu e-mail" keyboardType="email-address" theme={theme} />
          <Input label="Empresa" value={empresa} onChangeText={setEmpresa} placeholder="Digite o nome da empresa(opcional)" theme={theme} />

          <Input label="Senha" value={senha} onChangeText={setSenha} placeholder="Digite sua senha" secureTextEntry theme={theme} />

          {/* Linha de força da senha (horizontal, colorida) */}
          <View style={[styles.passwordStrengthContainer]}>
            <PasswordStrength checks={checks} theme={theme} />
          </View>

          <Input label="Confirmar senha" value={confirmarSenha} onChangeText={setConfirmarSenha} placeholder="Confirme sua senha" secureTextEntry theme={theme} />

          <Checkbox label="Aceito os termos e condições" checked={aceitoTermos} onPress={() => setAceitoTermos(!aceitoTermos)} theme={theme} />
          <Checkbox label="Quero receber atualizações sobre novos recursos" checked={receberAtualizacoes} onPress={() => setReceberAtualizacoes(!receberAtualizacoes)} theme={theme} />

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: theme.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={handleRegister}
          >
            <Text style={styles.primaryButtonText}>Cadastrar</Text>
          </Pressable>

            <Pressable
                    onPress={() => navigation?.navigate?.('Login')}
                    style={styles.loginLinkContainer}
                    >               
                <Text style={[styles.link, { color: theme.primary }]}>
                         Já tenho uma conta
                </Text>
            </Pressable>

        </View>
      </ScrollView>
    </View>
  );
}

/* Componentes auxiliares */
const Input = ({ label, theme, style, ...props }) => (
  <View style={[{ marginBottom: 16 }, style]}>
    <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: theme.inputBg,
          borderColor: theme.inputBorder,
          color: theme.text,
        },
      ]}
      placeholderTextColor={theme.textSecondary}
      {...props}
    />
  </View>
);

const Checkbox = ({ label, checked, onPress, theme }) => (
  <Pressable style={styles.checkboxContainer} onPress={onPress}>
    <View
      style={[
        styles.checkbox,
        {
          borderColor: theme.inputBorder,
          backgroundColor: checked ? theme.primary : 'transparent',
        },
      ]}
    >
      {checked && <Text style={styles.checkboxCheck}>✓</Text>}
    </View>
    <Text style={[styles.checkboxLabel, { color: theme.textSecondary }]}>{label}</Text>
  </Pressable>
);

/* Indicador horizontal de força da senha */
const PasswordStrength = ({ checks, theme }) => {
  const items = [
    { ok: checks.length, label: '8+ caracteres' },
    { ok: checks.upper, label: 'Maiúscula' },
    { ok: checks.lower, label: 'Minúscula' },
    { ok: checks.number, label: 'Número' },
  ];

  return (
    <View style={styles.strengthRow}>
      {items.map((item, i) => (
        <Text
          key={i}
          style={{
            color: item.ok ? theme.success : theme.fail,
            fontSize: 13,
            fontWeight: '600',
            marginRight: 12,
          }}
        >
          {item.label}
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
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
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
    dflexShrink: 1 
  },
  primaryButton: { 
    marginTop: 12, 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  primaryButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  link: { 
    marginTop: 16, 
    fontSize: 14, 
    textAlign: 'center', 
    fontWeight: '600' 
  },
  loginLinkContainer: { 
    alignItems: 'center', 
    marginTop: 12 
},

  passwordStrengthContainer: { 
    marginTop: -8, 
    marginBottom: 12 
},
  strengthRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginTop: 4 
},
});
