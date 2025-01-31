import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverHomeScreen from "../screens/driver/DriverHomeScreen";
import GalleryCards from "../screens/driver/GalleryCards";

const Stack = createStackNavigator();

const DriverNavigator = () => (
  <Stack.Navigator initialRouteName="DriverHomeScreen" screenOptions={{ headerShown: false }}>
    {/* Pantallas del flujo del conductor */}
    <Stack.Screen name="DriverHomeScreen" component={DriverHomeScreen} />
    <Stack.Screen name="GalleryCards" component={GalleryCards} />
  </Stack.Navigator>
);

export default DriverNavigator;

