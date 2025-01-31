import React from "react";
import { Button, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ButtonCancelCards = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  const cancelRequest = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Usuario no autenticado. Intenta iniciar sesión nuevamente.");
      return;
    }

    try {
      const userDocRef = doc(db, "userCards", user.uid);
      await deleteDoc(userDocRef);

      Alert.alert("Cancelado", "Tu solicitud ha sido cancelada.");
      navigation.reset({
        index: 0,
        routes: [{ name: "UserHomeScreen" }],
      });

    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
      Alert.alert("Error", "No se pudo cancelar la solicitud.");
    }
  };

  return <Button title="Cancelar" color="red" onPress={cancelRequest} />;
};

export default ButtonCancelCards;
