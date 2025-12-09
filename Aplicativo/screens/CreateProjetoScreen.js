import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { projetosAPI } from '../api/Projetos';
import { useTheme } from '../contexts/ThemeContext';
import { usuariosAPI } from '../api/Usuarios';

export default function CreateProjetoScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const currentTheme = {
    bg: theme === 'light' ? '#ffffff' : '#131313',
    text: theme === 'light' ? '#131313' : '#ffffff',
    textSecondary: theme === 'light' ? '#606060' : '#b8bcc8',
    primary: '#0D6EFD',
    cardBg: theme === 'light' ? '#ffffff' : '#2a2a2a',
    cardBorder: theme === 'light' ? '#e0e0e0' : '#3a3a3a',
    inputBg: theme === 'light' ? '#f9f9f9' : '#1e1e1e',
    inputBorder: theme === 'light' ? '#dcdcdc' : '#3a3a3a',
  };

  const handleCreateProjeto = async () => {
    if (!nome.trim() || !descricao.trim()) {
      Alert.alert('Erro', 'O nome e a descrição do projeto são obrigatórios!');
      return;
    }
  
    try {
      // Verificar se o usuário possui um plano ativo e requisições disponíveis
      const userData = await usuariosAPI.getUserByToken();
      if (!userData.plano || !userData.planoAtivo) {
        Alert.alert('Erro', 'Você não possui um plano ativo. Adquira um plano para criar projetos.');
        return;
      }
      if (userData.useReq === 0) {
        Alert.alert('Erro', 'Você não possui requisições suficientes para criar um projeto.');
        return;
      }
  
      // Criar o projeto
      const response = await projetosAPI.postProjetos(nome, descricao);
      const projetoId = response.ProjetoId; // Supondo que o ID do projeto está na resposta
      Alert.alert('Sucesso', 'Projeto criado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('UploadProjetoScreen', { projetoId }),
        },
      ]);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      Alert.alert('Erro', 'Não foi possível criar o projeto. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.primary,
              color: currentTheme.text,
            },
          ]}
        >
          <Text style={[styles.title, { color: currentTheme.text }]}>
            Insira as informações do seu projeto
          </Text>

          {/* Campos para nome e descrição */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: currentTheme.text }]}>Nome do Projeto</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: currentTheme.inputBg,
                    borderColor:  currentTheme.inputBorder,
                    color: currentTheme.text,
                  },
                ]}
                placeholder="Digite o nome do projeto"
                placeholderTextColor={currentTheme.textSecondary}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: currentTheme.text }]}>Descrição do Projeto</Text>
              <TextInput
                style={[
                  styles.textarea,
                  {
                    backgroundColor: currentTheme.inputBg,
                    borderColor: currentTheme.inputBorder,
                    color: currentTheme.text,
                  },
                ]}
                placeholder="Digite uma descrição para o projeto"
                placeholderTextColor={currentTheme.textSecondary}
                value={descricao}
                onChangeText={setDescricao}
                multiline
              />
            </View>
          </View>

          {/* Botão Criar Projeto */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: currentTheme.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={handleCreateProjeto}
          >
            <Text style={styles.buttonText}>Criar Projeto</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      card: {
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      form: {
        width: '100%',
      },
      inputGroup: {
        marginBottom: 16,
      },
      label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
      },
      textarea: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        height: 100,
        textAlignVertical: 'top',
      },
      button: {
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});