import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";
import DriverNavigator from "./DriverNavigator";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
      {/* Pantalla inicial para elegir el rol */}
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

      {/* Flujo de autenticación con initialParams */}
      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
        initialParams={{ role: "usuario" }} // Parámetro predeterminado
      />

      {/* Flujo del usuario
      <Stack.Screen name="UserNavigator" component={UserNavigator} /> */}

      {/* Flujo del conductor */}
      <Stack.Screen name="DriverNavigator" component={DriverNavigator} />
    </Stack.Navigator>
  );
}

export default RootStack;

