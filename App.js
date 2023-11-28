import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import HomeScreen from "./components/HomeScreen";
import CriarViagem from "./components/CriarViagem";
import Historic from "./components/Historic";

const Tab = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(0, 99, 152)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(205, 229, 255)",
    onPrimaryContainer: "rgb(0, 29, 50)",
    secondary: "rgb(0, 100, 147)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(202, 230, 255)",
    onSecondaryContainer: "rgb(0, 30, 48)",
    tertiary: "rgb(0, 103, 130)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(187, 233, 255)",
    onTertiaryContainer: "rgb(0, 31, 41)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 252, 255)",
    onBackground: "rgb(26, 28, 30)",
    surface: "rgb(252, 252, 255)",
    onSurface: "rgb(26, 28, 30)",
    surfaceVariant: "rgb(222, 227, 235)",
    onSurfaceVariant: "rgb(66, 71, 78)",
    outline: "rgb(114, 120, 126)",
    outlineVariant: "rgb(194, 199, 206)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 48, 51)",
    inverseOnSurface: "rgb(240, 240, 244)",
    inversePrimary: "rgb(148, 204, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 244, 250)",
      level2: "rgb(232, 240, 247)",
      level3: "rgb(224, 235, 244)",
      level4: "rgb(222, 234, 243)",
      level5: "rgb(217, 231, 241)",
    },
    surfaceDisabled: "rgba(26, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
    backdrop: "rgba(43, 49, 55, 0.4)",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="CriarViagem"
            component={CriarViagem}
            options={{
              tabBarLabel: "Nova Viagem",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="plus-box"
                  color={color}
                  size={26}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Historic"
            component={Historic}
            options={{
              tabBarLabel: "Historico",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="book-open-variant"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
