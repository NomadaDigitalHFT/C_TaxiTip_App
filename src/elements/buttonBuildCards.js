import React from "react";
import { Button, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ButtonBuildCards = ({ address, location }) => {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  const saveUserCard = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Usuario no autenticado. Intenta iniciar sesión nuevamente.");
      return;
    }

    if (!location || !location.coords) {
      Alert.alert("Error", "Ubicación no disponible.");
      return;
    }

    try {
      // Documento con UID del usuario
      const userDocRef = doc(db, "userCards", user.uid);

      const newCard = {
        id: user.uid,
        number: `N°${String(Date.now()).slice(-5)}`, // Genera un número basado en timestamp
        name: user.displayName || "Usuario",
        phone: user.phoneNumber || "",
        createdAt: new Date().toISOString(),
        lastLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: address,
        },
      };

      // Guardar los datos en Firestore
      await setDoc(userDocRef, newCard, { merge: true });

      Alert.alert("Ubicación guardada", "Tu dirección ha sido guardada en userCards.");
      navigation.navigate("ConfirmationScreen", { userName: newCard.name, userAddress: address });

    } catch (error) {
      console.error("Error guardando la tarjeta:", error);
      Alert.alert("Error", "No se pudo guardar la tarjeta.");
    }
  };

  return <Button title="Confirmar ubicación" onPress={saveUserCard} />;
};

export default ButtonBuildCards;
