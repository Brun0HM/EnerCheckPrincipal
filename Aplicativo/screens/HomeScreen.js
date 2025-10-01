// Importa utilitários do React Native
import { StyleSheet } from "react-native";

// Importa SafeAreaView, que garante que o conteúdo não fique
// escondido em áreas "não seguras" (como o notch do iPhone)
import { SafeAreaView } from "react-native-safe-area-context";

// Importa componentes do Reanimated (para animações)
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// Importa TouchableOpacity do Gesture Handler (botão com gesto nativo)
import { TouchableOpacity } from "react-native-gesture-handler";

// Componente principal da tela Home
export default function HomeScreen() {
  // useSharedValue: cria um valor animado (neste caso, escala do texto)
  const scale = useSharedValue(1);

  // Define a animação: o texto "pulsando" (aumenta/diminui o tamanho)
  scale.value = withRepeat(
    withSequence(
      withTiming(1.2, { duration: 800 }), // aumenta
      withTiming(1, { duration: 800 }) // volta ao normal
    ),
    -1, // repete infinitamente
    true
  );

  // Cria um estilo animado que aplica a escala definida acima
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    // SafeAreaView mantém conteúdo dentro da área visível
    <SafeAreaView style={styles.container}>
      {/* Texto animado com efeito de pulsar */}
      <Animated.Text style={[styles.text, animatedStyle]}>
        🏠 Bem-vindo à Home!
      </Animated.Text>

      {/* Botão interativo usando Gesture Handler */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Você clicou no botão!")}
      >
        <Animated.Text style={styles.buttonText}>Clique aqui 👆</Animated.Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 18 },
});
