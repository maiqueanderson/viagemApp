import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import "react-native-gesture-handler";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "./components/HomeScreen";
import ParaGastar from "./components/ParaGastar";
import CriarViagem from "./components/CriarViagem";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
         />
        <Tab.Screen 
        name="ParaGastar" 
        component={ParaGastar} 
        options={{
          tabBarLabel: 'Viagens',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wallet-travel" color={color} size={26} />
          ),
        }}
        />
      </Tab.Navigator>
      
    </NavigationContainer>
    
  );
}
