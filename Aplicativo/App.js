import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

// Importa as telas
import GeralScreen from "./screens/GeralScreen";
import ProjetoScreen from "./screens/ProjetoScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PlanosScreen from "./screens/PlanosScreen";
import FinalizarEscolhaAssinaturaScreen from "./screens/FinalizarEscolhaAssinaturaScreen";

// Importa o Context Provider
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

enableScreens();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

// Temas customizados
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0D6EFD',
    background: '#ffffff',
    card: '#ffffff',
    text: '#131313',
    border: '#e0e0e0',
    notification: '#0D6EFD',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#0D6EFD',
    background: '#131313',
    card: '#2a2a2a',
    text: '#ffffff',
    border: '#3a3a3a',
    notification: '#0D6EFD',
  },
};

// Componente do botão (dentro do Provider)
const ThemeToggleButton = ({ colors }) => {
  const { theme, toggleTheme, isManualTheme } = useTheme();

  return (
    <View style={styles.themeButtonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.themeButton,
          {
            borderColor: colors.border,
            backgroundColor: isManualTheme ? colors.primary : 'transparent',
            opacity: pressed ? 0.8 : 1,
          }
        ]}
        onPress={toggleTheme}
      >
        <Ionicons
          name={theme === 'light' ? 'moon' : 'sunny'}
          size={20}
          color={isManualTheme ? '#ffffff' : colors.text}
        />
      </Pressable>
      {!isManualTheme && (
        <View style={styles.autoIndicator}>
          <View style={[styles.autoDot, { backgroundColor: colors.primary }]} />
        </View>
      )}
    </View>
  );
};

// Stack Navigator para Settings (inclui SettingsScreen e PlanosScreen)
const SettingsStack = () => {
  const { theme } = useTheme();
  const navigationTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: navigationTheme.colors.card,
          borderBottomColor: navigationTheme.colors.border,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerTitleStyle: {
          color: navigationTheme.colors.text,
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerTintColor: navigationTheme.colors.text,
        headerRight: () => (
          <ThemeToggleButton colors={navigationTheme.colors} />
        ),
      }}
    >
      <Stack.Screen 
        name="SettingsMain" 
        component={SettingsScreen}
        options={{ 
          title: 'Configurações',
          headerShown: false // Vai usar o header do Tab
        }}
      />
      <Stack.Screen 
        name="Planos" 
        component={PlanosScreen}
        options={{ 
          title: 'Planos',
          headerShown: true // Mostra header próprio
        }}
      />
      <Stack.Screen 
  name="FinalizarEscolhaAssinatura" 
  component={FinalizarEscolhaAssinaturaScreen}
  options={{ 
    title: 'Finalizar Assinatura',
    headerShown: true 
  }}
/>
    </Stack.Navigator>
  );
};

// Navegador principal (dentro do Provider)
const AppNavigator = () => {
  const { theme, isLoaded } = useTheme();

  console.log('🚀 AppNavigator - tema:', theme, 'carregado:', isLoaded);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const navigationTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerTitle: route.name,
          headerStyle: {
            backgroundColor: navigationTheme.colors.card,
            borderBottomColor: navigationTheme.colors.border,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          headerTitleStyle: {
            color: navigationTheme.colors.text,
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => (
            <ThemeToggleButton colors={navigationTheme.colors} />
          ),
          tabBarActiveTintColor: navigationTheme.colors.primary,
          tabBarInactiveTintColor: theme === 'light' ? "#666" : "#888",
          tabBarStyle: {
            backgroundColor: navigationTheme.colors.card,
            borderTopColor: navigationTheme.colors.border,
            borderTopWidth: 1,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            height: 70,
            paddingBottom: 12,
            paddingTop: 8,
            marginBottom: 10,
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: -2,
            marginBottom: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
          tabBarHideOnKeyboard: true,
          animation: "shift",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Geral') iconName = 'speedometer-outline';
            else if (route.name === 'Projetos') iconName = 'folder-open-outline';
            else if (route.name === 'Configurações') iconName = 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Geral" component={GeralScreen} />
        <Tab.Screen name="Projetos" component={ProjetoScreen} />
        <Tab.Screen 
          name="Configurações" 
          component={SettingsStack} 
          options={{
            headerShown: false // O Stack vai gerenciar o header
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// App principal com Provider
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  themeButtonContainer: {
    marginRight: 16,
    position: 'relative',
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  autoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});