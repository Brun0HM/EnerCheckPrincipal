import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>⚙️ Tela de Configurações</Text>
      <View style={styles.espaco}>
        <Text style={styles.butao}>Planos</Text>
        <Text style={styles.butao}>Perfil</Text>
        <Text style={styles.butao}>Aplicativo</Text>
      </View>
    </SafeAreaView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  butao: {
    fontSize: 16,
    color: "#666",
    backgroundColor: "#DDD",
    padding: 20,
    borderRadius: 10,
    width: "70%",
    textAlign: "center",
    minWidth: 250,
  },
  espaco: {
    gap: 15,
    alignItems: "center",
    width: "100%",
  },
});
