import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CardStatusProjetoDashboard from "../components/CardStatusProjetoDashboard";
import ProjetosRecentes from "../components/ProjetosRecentes";
import { useTheme } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { projetosAPI } from "../api/Projetos";

export default function GeralScreen({ route }) {
  const { theme, isLoaded } = useTheme();
  const navigation = useNavigation();
  const [projetos, setProjetos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProjetos = async () => {
    try {
      setIsLoading(true);
      console.log("Carregando projetos...");
      const projetosData = await projetosAPI.getMeusProjetos();

      // Normalizar projetos para garantir que todos tenham um campo 'id'
      const projetosNormalizados = projetosData.map((p, index) => ({
        ...p,
        id: p.id || p.projetoId || p.ProjetoId || p._id || index,
      }));

      setProjetos(projetosNormalizados);
      console.log(
        "Projetos carregados:",
        projetosNormalizados.length,
        "projetos"
      );
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Recarregar dados sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      fetchProjetos();

      return () => {
        console.log("📱 GeralScreen perdeu foco");
      };
    }, [])
  );

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProjetos();
    setRefreshing(false);
  };

  // Estatísticas dos projetos
  const totalProjetos = projetos.length;

  // Projetos aprovados
  const projetosAprovados = projetos.filter((p) => {
    const status = p.status?.toLowerCase().trim() || "";
    return (
      status === "aprovado" || status === "concluído" || status === "concluido"
    );
  }).length;

  const projetosPendentes = projetos.filter((p) => {
    const status = p.status?.toLowerCase().trim() || "";
    return (
      status === "pendente" ||
      status === "em análise" ||
      status === "em_analise" ||
      status === ""
    );
  }).length;

  // Porcentagem de aprovação
  const porcentagemAprovados =
    totalProjetos > 0
      ? ((projetosAprovados / totalProjetos) * 100).toFixed(2)
      : 0;

  // Projetos criados no último mês
  const hoje = new Date();
  const umMesAtras = new Date(
    hoje.getFullYear(),
    hoje.getMonth() - 1,
    hoje.getDate()
  );
  const projetosUltimoMes = projetos.filter(
    (p) => new Date(p.dataInicio) >= umMesAtras
  ).length;

  // Projetos recentes
  const projetosRecentes = projetos
    .sort((a, b) => new Date(b.dataInicio) - new Date(a.dataInicio))
    .slice(0, 3);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando tema...</Text>
      </View>
    );
  }

  // Cores diretas baseadas no tema
  const currentTheme = {
    bg: theme === "light" ? "#ffffff" : "#131313",
    text: theme === "light" ? "#131313" : "#ffffff",
    textSecondary: theme === "light" ? "#606060" : "#b8bcc8",
    primary: "#0D6EFD",
    cardBg: theme === "light" ? "#ffffff" : "#2a2a2a",
    cardBorder: theme === "light" ? "#e0e0e0" : "#3a3a3a",
  };

  const handleProjetoPress = async (projeto) => {
    try {
      // Normalizar ID - tentar múltiplas variações
      const projetoId =
        projeto.id || projeto.projetoId || projeto.ProjetoId || projeto._id;

      if (!projetoId) {
        console.error("Projeto sem ID:", projeto);
        return;
      }

      await AsyncStorage.setItem("projetoSelecionadoId", projetoId.toString());
      console.log("✅ Projeto selecionado:", projetoId, projeto.nome);
      navigation.navigate("Projetos", { projetoId: projetoId });
    } catch (error) {
      console.error("Erro ao selecionar projeto:", error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentTheme.bg }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={currentTheme.primary}
            colors={[currentTheme.primary]}
          />
        }
      >
        {/* Cabeçalho da página */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            Dashboard
          </Text>
          <Text
            style={[styles.subtitle, { color: currentTheme.textSecondary }]}
          >
            Gerencie seus projetos elétricos e verificações de conformidade
          </Text>
        </View>

        {/* Cards de Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <Pressable
              style={styles.statusCardWrapper}
              onPress={() => navigation.navigate("ProjetosTotaisScreen")}
            >
              <CardStatusProjetoDashboard
                status="Projetos Totais"
                iconeStatus="bi bi-file-earmark-text"
                num={totalProjetos.toString()}
                desc={`+${projetosUltimoMes} no último mês`}
                theme={currentTheme}
              />
            </Pressable>

            <Pressable
              style={styles.statusCardWrapper}
              onPress={() =>
                navigation.navigate("ProjetosTotaisScreen", {
                  filtro: "aprovado",
                })
              }
            >
              <CardStatusProjetoDashboard
                status="Aprovados"
                iconeStatus="bi bi-check2-circle"
                num={projetosAprovados.toString()}
                desc={`${porcentagemAprovados}% de aprovação`}
                theme={currentTheme}
              />
            </Pressable>
          </View>

          <View style={styles.statusRow}>
            <Pressable
              style={styles.statusCardWrapper}
              onPress={() =>
                navigation.navigate("ProjetosTotaisScreen", {
                  filtro: "pendente",
                })
              }
            >
              <CardStatusProjetoDashboard
                status="Pendentes"
                iconeStatus="bi bi-exclamation-triangle"
                num={projetosPendentes.toString()}
                desc="Aguardando revisão"
                theme={currentTheme}
              />
            </Pressable>

            <View style={styles.statusCardWrapper}>
              <CardStatusProjetoDashboard
                status="Economia"
                iconeStatus="bi bi-graph-up"
                num={`R$ ${(totalProjetos * 2250).toLocaleString("pt-BR")}`}
                desc="Em custos evitados"
                theme={currentTheme}
              />
            </View>
          </View>
        </View>

        {/* Projetos Recentes */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.cardBorder,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>
              Projetos Recentes
            </Text>
            <Text
              style={[
                styles.cardSubtitle,
                { color: currentTheme.textSecondary },
              ]}
            >
              Seus últimos projetos verificados
            </Text>
          </View>

          {projetosRecentes.length > 0 ? (
            projetosRecentes.map((projeto, index) => (
              <Pressable
                key={projeto.id || index}
                onPress={() => handleProjetoPress(projeto)}
              >
                <ProjetosRecentes
                  nomeProjeto={projeto.nome}
                  tempoProjeto={new Date(projeto.dataInicio).toLocaleDateString(
                    "pt-BR"
                  )}
                  statusProjeto={projeto.status || "pendente"}
                  theme={currentTheme}
                />
              </Pressable>
            ))
          ) : (
            <Text
              style={[styles.emptyText, { color: currentTheme.textSecondary }]}
            >
              Nenhum projeto encontrado. Crie seu primeiro projeto!
            </Text>
          )}
        </View>

        {/* Cards de Ação */}
        <View style={styles.actionContainer}>
          {/* Card Novo Projeto */}
          <View
            style={[
              styles.actionCard,
              {
                backgroundColor: currentTheme.cardBg,
                borderColor: currentTheme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.actionTitle, { color: currentTheme.text }]}>
              Novo Projeto
            </Text>
            <Text
              style={[
                styles.actionSubtitle,
                { color: currentTheme.textSecondary },
              ]}
            >
              Faça upload de um novo projeto para verificação
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: currentTheme.primary,
                  borderColor: currentTheme.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={() => navigation.navigate("CreateProjetoScreen")}
            >
              <Text style={styles.primaryButtonText}>Fazer Upload</Text>
            </Pressable>
          </View>

          {/* Card Relatórios */}
          <View
            style={[
              styles.actionCard,
              {
                backgroundColor: currentTheme.cardBg,
                borderColor: currentTheme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.actionTitle, { color: currentTheme.text }]}>
              Relatórios
            </Text>
            <Text
              style={[
                styles.actionSubtitle,
                { color: currentTheme.textSecondary },
              ]}
            >
              Visualize relatórios detalhados de conformidade
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.outlineButton,
                {
                  borderColor: currentTheme.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.outlineButtonText,
                  { color: currentTheme.primary },
                ]}
              >
                Ver Relatórios
              </Text>
            </Pressable>
          </View>
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  statusCardWrapper: {
    flex: 1,
    maxWidth: "48.5%",
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: 20,
  },
  actionContainer: {
    flexDirection: "column",
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  actionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  primaryButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  outlineButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
