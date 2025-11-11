// Importa o criador de abas (Bottom Tabs) do React Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importa o container principal de navegação do React Navigation
import { NavigationContainer } from "@react-navigation/native";



// Importa o enableScreens do react-native-screens para melhorar performance
import { enableScreens } from "react-native-screens";

// Importa as telas
import GeralScreen from "./screens/GeralScreen";
import ProjetoScreen from "./screens/ProjetoScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from "./screens/LoginScreen";


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
            name="Geral"
            component={GeralScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="grid-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Projetos"
            component={ProjetoScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="folder-open-outline" size={size} color={color} />
              ),
            }}
          />
             <Tab.Screen
            name="Configurações"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="grid-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
