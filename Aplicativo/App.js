// Importa o criador de abas (Bottom Tabs) do React Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importa o container principal de navegação do React Navigation
import { NavigationContainer } from "@react-navigation/native";

// Importa componentes React-Native
import { Text } from "react-native";

// Importa o enableScreens do react-native-screens para melhorar performance
import { enableScreens } from "react-native-screens";

// Importa as telas
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//Ativa otimizações de telas nativas
enableScreens();

//Cria o componente de navegação por abas (Tab Navigator)
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // É o provedor que gerencia o estado da navegação
    <GestureHandlerRootView>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false, //Oculta o cabeçalho superior
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "#666",
            tabBarHideOnKeyboard: true,
            animation: "shift",
          }}
        >
          <Tab.Screen
            name="Home" //Nome da rota
            component={HomeScreen} // Tela associada a rota
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size * 0.8, color }}>🤖</Text>
              ),
            }}
          />

          <Tab.Screen
            name="Perfil" //Nome da rota
            component={ProfileScreen} // Tela associada a rota
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size * 0.8, color }}>👤</Text>
              ),
            }}
          />

          <Tab.Screen
            name="Configurações" //Nome da rota
            component={SettingsScreen} // Tela associada a rota
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size * 0.8, color }}>⚙️</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
