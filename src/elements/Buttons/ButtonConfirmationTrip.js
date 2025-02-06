import React, { useState } from "react";
import { Alert, Button, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as Location from "expo-location";

const ButtonConfirmationTrip = ({ userCardsId, onRemoveCard }) => {
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();
  const [isWaiting, setIsWaiting] = useState(false);

  const handleAcceptTrip = async () => {
    const driver = auth.currentUser;
    if (!driver) {
      Alert.alert("Error", "No estás autenticado.");
      return;
    }

    try {
      console.log("Intentando obtener ubicación del conductor...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Error", "Permiso de ubicación denegado.");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      const driverLocation = {
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      };

      console.log("Ubicación obtenida:", driverLocation);

      if (!userCardsId) {
        Alert.alert("Error", "No se encontró el ID de la solicitud.");
        return;
      }

      const requestRef = doc(db, "userCards", userCardsId);
      const requestSnap = await getDoc(requestRef);

      if (!requestSnap.exists()) {
        Alert.alert("Error", "La solicitud ya no está disponible.");
        return;
      }

      console.log("Actualizando Firestore con userCardsId:", userCardsId);

      await updateDoc(requestRef, {
        assignedDriver: driver.uid,
        driverLocation: driverLocation,
        status: "fare_confirmed",
      });

      console.log("Solicitud aceptada y Firestore actualizado.");

      onRemoveCard(userCardsId);
      setIsWaiting(true);
      Alert.alert("🚖 Has aceptado el viaje. Esperando confirmación del usuario.");

      navigation.navigate("DriverTripDescriptionScreen", { requestId: userCardsId });
    } catch (error) {
      console.error("Error al aceptar viaje:", error);
      Alert.alert("Error", `No se pudo aceptar la solicitud: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={isWaiting ? "Esperando Confirmación..." : "Aceptar Viaje"}
        onPress={handleAcceptTrip}
        color={isWaiting ? "#FFA500" : "#008000"}
        disabled={isWaiting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
});

export default ButtonConfirmationTrip;

