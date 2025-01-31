import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "styled-components/native";
import { DriverProvider } from "./src/contexts/DriverContext";
import RootStack from "./src/navigation/RootStack";
import theme from "./src/styles/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DriverProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </DriverProvider>
  );
}
