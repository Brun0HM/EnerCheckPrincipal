import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import usuariosAPI from "../api/Usuarios";

const Perfil = ({ theme, userData, onUserUpdate }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [crea, setCrea] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [originalData, setOriginalData] = useState({
    nomeCompleto: "",
    email: "",
    empresa: "",
    numeroCrea:"",
  });

  useEffect(() => {
    if (userData) {
      const nome = userData.nomeCompleto || "";
      const emailUser = userData.email || "";
      const empresaUser = userData.empresa || "";
      const numeroCrea = userData.numeroCrea || "";

      setNomeCompleto(nome);
      setEmail(emailUser);
      setEmpresa(empresaUser);
      setCrea(numeroCrea)

      // Salvar dados originais
      setOriginalData({
        nomeCompleto: nome,
        email: emailUser,
        empresa: empresaUser,
        numeroCrea: numeroCrea
      });

      console.log("📋 Dados do usuário carregados no Perfil:", {
        nome,
        email: emailUser,
        empresa: empresaUser,
        numeroCrea,
      });
    }
  }, [userData]);

  // Verificar se houve alterações nos dados
  const hasChanges = useMemo(() => {
    const changed =
      nomeCompleto !== originalData.nomeCompleto ||
      email !== originalData.email ||
      empresa !== originalData.empresa;

    console.log("🔍 Verificando mudanças:", {
      hasChanges: changed,
      nomeCompleto: {
        atual: nomeCompleto,
        original: originalData.nomeCompleto,
        mudou: nomeCompleto !== originalData.nomeCompleto,
      },
      email: {
        atual: email,
        original: originalData.email,
        mudou: email !== originalData.email,
      },
      empresa: {
        atual: empresa,
        original: originalData.empresa,
        mudou: empresa !== originalData.empresa,
      },
      crea: {
        atual: crea,
        original: originalData.numeroCrea,
        mudou: crea !== originalData.numeroCrea,
      },
    });

    return changed;
  }, [nomeCompleto, email, empresa, crea, originalData]);

  // Validação de email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // Validação do CREA
  const validarCrea = (crea) => {
    const regex = /^\d{6}$/; // CREA deve ter exatamente 6 dígitos
    return regex.test(crea); // Retorna true se for válido
  };

  const handleSalvar = async () => {
    // Validações
    if (!nomeCompleto.trim()) {
      Alert.alert("Erro", "Nome completo é obrigatório");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Email é obrigatório");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "Email inválido");
      return;
    }

    if (!crea.trim()) {
      Alert.alert("Erro", "Número CREA é obrigatório");
      return;
    }
    if (!validarCrea(crea)) {
      Alert.alert("Erro", "Número CREA inválido. Deve conter exatamente 6 dígitos.");
      return;
    }
  

    if (!userData?.numeroCrea) {
      Alert.alert("Erro", "Número CREA não encontrado");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Salvando alterações do usuário...");
      console.log("ID do usuário:", userData.id);
      console.log("Dados a atualizar:", {
        nomeCompleto,
        email,
        empresa,
        numeroCrea,
      });

      // Preparar dados para atualização (ordem conforme documentação)
      const dadosAtualizados = {
        email: email.trim(),
        nomeCompleto: nomeCompleto.trim(),
        numeroCrea: crea.trim(),
        empresa: empresa.trim(),
      };

      console.log(
        "📦 Dados enviados para API:",
        JSON.stringify(dadosAtualizados, null, 2)
      );

      // Chamar API para atualizar
      const response = await usuariosAPI.updateUsuarioMe(dadosAtualizados);

      console.log(
        "✅ Usuário atualizado com sucesso:",
        JSON.stringify(response, null, 2)
      );

      // Atualizar dados originais após sucesso
      setOriginalData({
        nomeCompleto: nomeCompleto.trim(),
        email: email.trim(),
        empresa: empresa.trim(),
        numeroCrea: crea.trim(),
      });

      Alert.alert("Sucesso", "Alterações salvas com sucesso!");

      // Notificar componente pai para recarregar dados
      if (onUserUpdate) {
        console.log("Recarregando dados do usuário...");
        onUserUpdate();
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);

      let mensagemErro = "Não foi possível salvar as alterações";

      if (error.message === "Network Error" || !error.response) {
        mensagemErro =
          "Erro de conexão. Verifique sua internet e tente novamente.";
      } else if (error?.response?.status === 400) {
        mensagemErro = "Dados inválidos. Verifique os campos.";
        console.error(
          "Detalhes erro 400:",
          JSON.stringify(error.response.data, null, 2)
        );
      } else if (error?.response?.status === 409) {
        mensagemErro = "Email já está em uso por outro usuário.";
      } else if (error?.response?.status === 401) {
        mensagemErro = "Sessão expirada. Faça login novamente.";
      } else if (error?.response?.data?.message) {
        mensagemErro = error.response.data.message;
      }

      Alert.alert("Erro", mensagemErro);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.cardBg,
          borderColor: theme.cardBorder,
        },
      ]}
    >
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
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="Seu nome completo"
            placeholderTextColor={theme.textSecondary}
            value={nomeCompleto}
            onChangeText={(text) => {
              console.log("👤 Nome mudando para:", text);
              setNomeCompleto(text);
            }}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="seu@email.com"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={(text) => {
              console.log("Email mudando para:", text);
              setEmail(text);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Empresa</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="Nome da Empresa"
            placeholderTextColor={theme.textSecondary}
            value={empresa}
            onChangeText={(text) => {
              console.log(
                "Empresa mudando de:",
                `"${empresa}"`,
                "para:",
                `"${text}"`
              );
              setEmpresa(text);
            }}
            editable={!isLoading}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Crea</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="Número Crea"
            placeholderTextColor={theme.textSecondary}
            value={crea}
            onChangeText={(text) => {
              console.log(
                "Crea mudando de:",
                `"${crea}"`,
                "para:",
                `"${text}"`
              );
              setCrea(text);
            }}
            keyboardType="numeric" 
            maxLength={6} 
            editable={!isLoading}
          />
        </View>
      </View>

      {hasChanges ? (
        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            {
              backgroundColor: theme.primary,
              opacity: pressed || isLoading ? 0.8 : 1,
            },
          ]}
          onPress={handleSalvar}
          disabled={isLoading}
          
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          )}
        </Pressable>
      ) : (
        <View
          style={[
            styles.noChangesContainer,
            { backgroundColor: theme.inputBg },
          ]}
        >
          <Text style={[styles.noChangesText, { color: theme.textSecondary }]}>
            Nenhuma alteração detectada
          </Text>
        </View>
      )}
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
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
    fontWeight: "bold",
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
    fontWeight: "600",
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
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  noChangesContainer: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  noChangesText: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
