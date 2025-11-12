import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
// import { analisarPlanta } from '../services/enerCheckIa'; // Descomente quando implementar

export default function UploadProjetoScreen() {
  const { theme, isLoaded } = useTheme();
  const navigation = useNavigation();

  const fileTypes = ["JPG", "PNG", "JPEG", "PDF"];

  const [nome, setNome] = useState();
  const [erro, setErro] = useState();
  const [carregando, setCarregando] = useState(false);
  const [dataArquivo, setDataArquivo] = useState(null);
  const [resposta, setResposta] = useState([]);
  const [tipo, setTipo] = useState("");



  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando tema...</Text>
      </View>
    );
  }

  // Cores diretas baseadas no tema
  const currentTheme = {
    bg: theme === 'light' ? '#ffffff' : '#131313',
    text: theme === 'light' ? '#131313' : '#ffffff',
    textSecondary: theme === 'light' ? '#606060' : '#b8bcc8',
    primary: '#0D6EFD',
    cardBg: theme === 'light' ? '#ffffff' : '#2a2a2a',
    cardBorder: theme === 'light' ? '#e0e0e0' : '#3a3a3a',
    success: '#28a745',
    danger: '#dc3545',
  };

  // Equivalente ao fileToBase64 do web
  const fileToBase64 = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Erro ao converter arquivo para base64:', error);
      return null;
    }
  };

  const handleAnalisePlanta = async (imagem, tipo) => {
    setCarregando(true);
    setErro("");

    try {
      // Simulação da análise (substitua pela implementação real)
      // const response = await analisarPlanta(imagem, tipo);
      
      // Simulação por agora
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockResponse = { resultado: "Análise simulada concluída" };
      
      setResposta(mockResponse);
      await AsyncStorage.setItem("Analise", JSON.stringify(mockResponse));
    } catch (error) {
      setErro("Houve um erro ao analisar a planta: " + error);
      console.log(erro);
    } finally {
      setCarregando(false);
    }
  };

  const handleFileChange = async () => {
    try {
      // Usar DocumentPicker para selecionar arquivo
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: false,
      });

      if (!result.canceled && result.assets[0]) {
        const arquivo = result.assets[0];
        const data = await fileToBase64(arquivo.uri);
        
        if (data) {
          await AsyncStorage.setItem("Imagem", data);
          setNome(arquivo.name);
          
          // Determinar tipo baseado no MIME type
          if (data.startsWith("data:image/jpg") || data.startsWith("data:image/jpeg")) {
            setTipo("image/jpeg");
          } else if (data.startsWith("data:application/pdf")) {
            setTipo("application/pdf");
          } else if (data.startsWith("data:image/png")) {
            setTipo("image/png");
          }
          
          await AsyncStorage.setItem("Formato", tipo);
          setDataArquivo(data.split(",")[1]);
        }
      }
    } catch (error) {
      console.error('Erro ao selecionar arquivo:', error);
      setErro('Erro ao selecionar arquivo');
    }
  };

  // Carregar imagem do AsyncStorage
  const [imagem, setImagem] = useState('');
  
  useEffect(() => {
    const loadImagem = async () => {
      try {
        const savedImage = await AsyncStorage.getItem("Imagem");
        if (savedImage) {
          setImagem(savedImage);
        }
      } catch (error) {
        console.error('Erro ao carregar imagem:', error);
      }
    };
    
    loadImagem();
  }, []);

  useEffect(() => {
    console.log("Array na página de upload: ", resposta);
    console.log("Tipo de Imagem Inserida: ", tipo);
    console.log("Imagem inserida: ", dataArquivo, " Nome: ", nome);
  }, [resposta, tipo, dataArquivo, nome]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.7 : 1 }
            ]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons 
              name="arrow-back" 
              size={32} 
              color={currentTheme.primary} 
            />
          </Pressable>
          <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
            EnerCheckAI
          </Text>
        </View>

        {/* Upload Container */}
        <View style={[styles.uploadContainer, { 
          backgroundColor: currentTheme.primary + '40',
          borderColor: currentTheme.primary 
        }]}>
          <Ionicons 
            name="cloud-upload-outline" 
            size={64} 
            color={currentTheme.primary} 
          />

          <View style={styles.uploadContent}>
            <Text style={[styles.uploadTitle, { color: currentTheme.text }]}>
              Arraste & solte arquivos aqui
            </Text>
            
            <Text style={[styles.supportedFormats, { color: currentTheme.textSecondary }]}>
              Formatos suportados: {fileTypes.join(", ")}
            </Text>
            
            <Pressable
              style={({ pressed }) => [
                styles.selectButton,
                { 
                  backgroundColor: currentTheme.primary,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
              onPress={handleFileChange}
            >
              <Text style={styles.selectButtonText}>Clique aqui</Text>
            </Pressable>
          </View>

          {/* Nome do arquivo selecionado */}
          {nome && (
            <View style={[styles.selectedFile, { 
              backgroundColor: currentTheme.primary + '40',
              borderColor: currentTheme.primary 
            }]}>
              <Text style={[styles.fileName, { color: currentTheme.primary }]}>
                {nome || "Nenhum arquivo selecionado"}
              </Text>
            </View>
          )}
        </View>

        {/* Preview da Imagem */}
        {imagem && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: imagem }} 
              style={styles.previewImage}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Botão Analisar */}
        <Pressable
          style={({ pressed }) => [
            styles.analyzeButton,
            { 
              backgroundColor: currentTheme.primary,
              opacity: (pressed || carregando) ? 0.6 : 1 
            }
          ]}
          onPress={() => handleAnalisePlanta(dataArquivo, tipo)}
          disabled={carregando}
        >
          <Text style={styles.analyzeButtonText}>
            {!carregando ? "Analisar Planta" : "Carregando análise..."}
          </Text>
        </Pressable>

        {/* Loading Spinner */}
        {carregando && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={currentTheme.primary} />
          </View>
        )}

        {/* Mensagem de Sucesso/Erro */}
        {erro === "" && !carregando && resposta.length > 0 ? (
          <View style={[styles.successContainer, { 
            backgroundColor: currentTheme.success + '20',
            borderColor: currentTheme.success 
          }]}>
            <Text style={[styles.successText, { color: currentTheme.success }]}>
              Análise concluída com sucesso!
            </Text>
          </View>
        ) : erro ? (
          <View style={[styles.errorContainer, { 
            backgroundColor: currentTheme.danger + '20',
            borderColor: currentTheme.danger 
          }]}>
            <Text style={[styles.errorText, { color: currentTheme.danger }]}>
              Ops! Houve um erro! verifique as informações e tente novamente
            </Text>
          </View>
        ) : null}
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  uploadContainer: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadContent: {
    alignItems: 'center',
    gap: 8,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  supportedFormats: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 8,
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  selectedFile: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 16,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  previewImage: {
    width: '100%',
    height: 300,
    maxWidth: 400,
    maxHeight: 400,
  },
  analyzeButton: {
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  analyzeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  successContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  successText: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorContainer: {
    marginVertical: 8,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
});