import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { projetosAPI } from "../api/Projetos";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProjetosTotaisScreen() {
  const { theme, isLoaded } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [projetos, setProjetos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Receber filtro via params (pendente ou aprovado)
  const filtroStatus = route.params?.filtro || null;

  const currentTheme = {
    bg: theme === "light" ? "#ffffff" : "#131313",
    text: theme === "light" ? "#131313" : "#ffffff",
    textSecondary: theme === "light" ? "#606060" : "#b8bcc8",
    primary: "#0D6EFD",
    cardBg: theme === "light" ? "#ffffff" : "#2a2a2a",
    cardBorder: theme === "light" ? "#e0e0e0" : "#3a3a3a",
    inputBg: theme === "light" ? "#f9f9f9" : "#1e1e1e",
    inputBorder: theme === "light" ? "#dcdcdc" : "#3a3a3a",
    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545",
  };

  const fetchProjetos = async () => {
    try {
      setIsLoading(true);
      console.log("🔄 Carregando todos os projetos...");
      const projetosData = await projetosAPI.getMeusProjetos();

      // Normalizar projetos para garantir que todos tenham um ID
      const projetosNormalizados = projetosData.map((projeto, index) => {
        // Tentar pegar o ID de diferentes campos possíveis
        const id =
          projeto.id ||
          projeto.projetoId ||
          projeto.ProjetoId ||
          projeto._id ||
          index;

        return {
          ...projeto,
          id, // Garantir que sempre há um campo 'id'
        };
      });

      setProjetos(projetosNormalizados);
    } catch (error) {
      console.error("❌ Erro ao carregar projetos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProjetos();
    }, [])
  );

  // Filtrar projetos por nome e status
  const filteredProjetos = useMemo(() => {
    let resultado = projetos;

    // Aplicar filtro de status se houver
    if (filtroStatus) {
      if (filtroStatus === "pendente") {
        resultado = resultado.filter((projeto) => {
          const status = projeto.status?.toLowerCase().trim() || "";
          return (
            status === "pendente" ||
            status === "em análise" ||
            status === "em_analise" ||
            status === ""
          );
        });
      } else if (filtroStatus === "aprovado") {
        resultado = resultado.filter((projeto) => {
          const status = projeto.status?.toLowerCase().trim() || "";
          return (
            status === "aprovado" ||
            status === "concluído" ||
            status === "concluido"
          );
        });
      }
    }

    // Aplicar filtro de busca por nome
    if (searchQuery.trim()) {
      resultado = resultado.filter((projeto) =>
        projeto?.nome?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return resultado;
  }, [projetos, searchQuery, filtroStatus]);

  // Paginação
  const paginatedProjetos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjetos.slice(startIndex, endIndex);
  }, [filteredProjetos, currentPage]);

  const totalPages = Math.ceil(filteredProjetos.length / itemsPerPage);

  const handleProjetoPress = async (projeto) => {
    try {
      if (!projeto.id) {
        console.error("❌ Projeto sem ID:", projeto);
        return;
      }

      // Salvar ID do projeto selecionado no AsyncStorage
      await AsyncStorage.setItem("projetoSelecionadoId", projeto.id.toString());
      console.log("✅ Projeto selecionado:", projeto.id, projeto.nome);

      // Navegar para ProjetoScreen
      navigation.navigate("Projetos", { projetoId: projeto.id });
    } catch (error) {
      console.error("❌ Erro ao selecionar projeto:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "aprovado":
      case "concluído":
        return currentTheme.success;
      case "pendente":
      case "em análise":
        return currentTheme.warning;
      case "reprovado":
        return currentTheme.danger;
      default:
        return currentTheme.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "aprovado":
      case "concluído":
        return "checkmark-circle";
      case "pendente":
      case "em análise":
        return "time";
      case "reprovado":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const renderProjetoItem = ({ item }) => {
    // Garantir valores padrão
    const nome = item?.nome || "Projeto sem nome";
    const data =
      item?.dataInicio || item?.dataCriacao || new Date().toISOString();
    const status = item?.status || "pendente";
    const descricao = item?.descricao || "";

    return (
      <Pressable
        style={({ pressed }) => [
          styles.projetoCard,
          {
            backgroundColor: currentTheme.cardBg,
            borderColor: currentTheme.cardBorder,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={() => handleProjetoPress(item)}
      >
        <View style={styles.projetoHeader}>
          <View style={styles.projetoInfo}>
            <Text
              style={[styles.projetoNome, { color: currentTheme.text }]}
              numberOfLines={1}
            >
              {nome}
            </Text>
            <Text
              style={[
                styles.projetoData,
                { color: currentTheme.textSecondary },
              ]}
            >
              {new Date(data).toLocaleDateString("pt-BR")}
            </Text>
            {descricao ? (
              <Text
                style={[
                  styles.projetoDescricao,
                  { color: currentTheme.textSecondary },
                ]}
                numberOfLines={2}
              >
                {descricao}
              </Text>
            ) : null}
          </View>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(status) + "20" },
              ]}
            >
              <Ionicons
                name={getStatusIcon(status)}
                size={16}
                color={getStatusColor(status)}
              />
              <Text
                style={[styles.statusText, { color: getStatusColor(status) }]}
              >
                {status}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={currentTheme.textSecondary}
            />
          </View>
        </View>
      </Pressable>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        <Pressable
          style={[
            styles.paginationButton,
            {
              backgroundColor:
                currentPage === 1 ? currentTheme.inputBg : currentTheme.primary,
              borderColor: currentTheme.inputBorder,
            },
          ]}
          onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={currentPage === 1 ? currentTheme.textSecondary : "#ffffff"}
          />
        </Pressable>

        <Text style={[styles.paginationText, { color: currentTheme.text }]}>
          Página {currentPage} de {totalPages}
        </Text>

        <Pressable
          style={[
            styles.paginationButton,
            {
              backgroundColor:
                currentPage === totalPages
                  ? currentTheme.inputBg
                  : currentTheme.primary,
              borderColor: currentTheme.inputBorder,
            },
          ]}
          onPress={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color={
              currentPage === totalPages
                ? currentTheme.textSecondary
                : "#ffffff"
            }
          />
        </Pressable>
      </View>
    );
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D6EFD" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Título dinâmico baseado no filtro
  const getTitulo = () => {
    if (filtroStatus === "pendente") return "Projetos Pendentes";
    if (filtroStatus === "aprovado") return "Projetos Aprovados";
    return "Todos os Projetos";
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentTheme.bg }]}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={currentTheme.text} />
        </Pressable>
        <View style={styles.headerTextContainer}>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            {getTitulo()}
          </Text>
          <Text
            style={[styles.subtitle, { color: currentTheme.textSecondary }]}
          >
            {filteredProjetos.length}{" "}
            {filteredProjetos.length === 1 ? "projeto" : "projetos"}
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={currentTheme.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: currentTheme.inputBg,
              borderColor: currentTheme.inputBorder,
              color: currentTheme.text,
            },
          ]}
          placeholder="Buscar por nome do projeto..."
          placeholderTextColor={currentTheme.textSecondary}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setCurrentPage(1); // Resetar página ao buscar
          }}
        />
        {searchQuery ? (
          <Pressable
            style={styles.clearButton}
            onPress={() => setSearchQuery("")}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={currentTheme.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={currentTheme.primary} />
          <Text
            style={[styles.loadingText, { color: currentTheme.textSecondary }]}
          >
            Carregando projetos...
          </Text>
        </View>
      ) : filteredProjetos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="folder-open-outline"
            size={80}
            color={currentTheme.textSecondary}
          />
          <Text style={[styles.emptyText, { color: currentTheme.text }]}>
            {searchQuery
              ? "Nenhum projeto encontrado"
              : filtroStatus
              ? `Nenhum projeto ${filtroStatus}`
              : "Nenhum projeto cadastrado"}
          </Text>
          <Text
            style={[styles.emptySubtext, { color: currentTheme.textSecondary }]}
          >
            {searchQuery
              ? "Tente buscar por outro nome"
              : "Crie seu primeiro projeto para começar"}
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={paginatedProjetos}
            renderItem={renderProjetoItem}
            keyExtractor={(item) =>
              item.id?.toString() || Math.random().toString()
            }
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          {renderPagination()}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 32,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingLeft: 44,
    paddingRight: 44,
    fontSize: 16,
  },
  clearButton: {
    position: "absolute",
    right: 32,
    padding: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  projetoCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projetoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  projetoInfo: {
    flex: 1,
    marginRight: 12,
  },
  projetoNome: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  projetoData: {
    fontSize: 14,
    marginBottom: 4,
  },
  projetoDescricao: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  statusContainer: {
    alignItems: "flex-end",
    gap: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 16,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationText: {
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
