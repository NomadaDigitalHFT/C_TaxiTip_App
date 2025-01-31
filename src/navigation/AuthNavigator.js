import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/auth/AuthScreen";

const Stack = createStackNavigator();

const AuthNavigator = ({ route }) => {
  const { role } = route.params || {};

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        initialParams={{ role }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;





