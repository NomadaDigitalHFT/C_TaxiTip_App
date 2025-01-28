import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/contexts/UserContext"; // Contexto del usuario
import { DriverProvider } from "./src/contexts/DriverContext"; // Contexto del conductor
import RootStack from "./src/navigation/RootStack"; // Importa el navegador raíz
// import { auth, db } from "./../TaxiTip_App/src/firebase/firebaseConfig";

// console.log("📡 Firebase Auth:", auth);
// console.log("📡 Firestore:", db);


const App = () => {
  return (
    <UserProvider>
      <DriverProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </DriverProvider>
    </UserProvider>
  );
};

export default App;
