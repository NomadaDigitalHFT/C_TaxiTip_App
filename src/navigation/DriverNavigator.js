import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverHomeScreen from "./../screens/driver/DriverHomeScreen";
import GalleryCards from "./../screens/driver/GalleryCards";
import DriverTripDescriptionScreen from "./../screens/driver/DriverTripDescriptionScreen";
import DriverStartTrip from "./../screens/driver/DriverStartTrip";

const Stack = createStackNavigator();

const DriverNavigator = () => (
  <Stack.Navigator initialRouteName="DriverHomeScreen" screenOptions={{ headerShown: false }}>
    {/* Pantallas del flujo del conductor */}
    <Stack.Screen name="DriverHomeScreen" component={DriverHomeScreen} />
    <Stack.Screen name="GalleryCards" component={GalleryCards} />
    <Stack.Screen name="DriverTripDescriptionScreen" component={DriverTripDescriptionScreen}/>
    <Stack.Screen name="DriverStartTrip" component={DriverStartTrip} />
  </Stack.Navigator>
);

export default DriverNavigator;
