import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

const DriverTripDescriptionScreen = ({ route, navigation }) => {
  const { userCardsId } = route.params || {};
  const db = getFirestore();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userCardsId) {
      console.error("❌ Error: userCardsId es undefined. No se puede continuar.");
      Alert.alert("Error", "No se encontró la solicitud. Regresando...");
      navigation.goBack();
      return;
    }

    const requestRef = doc(db, "userCards", userCardsId);
    const unsubscribe = onSnapshot(requestRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setTripData(docSnapshot.data());
      } else {
        Alert.alert("Error", "La solicitud ya no existe.");
        navigation.goBack();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userCardsId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esperando confirmación del usuario</Text>
      {tripData ? (
        <View style={styles.infoContainer}>
          <Text>📍 Origen: {tripData.lastLocation?.address || "N/A"}</Text>
          <Text>🎯 Destino: {tripData.dropoffLocation?.address || "N/A"}</Text>
          <Text>⏳ Tiempo Estimado: {tripData.estimatedTime || "N/A"} min</Text>
          <Text>💰 Tarifa: {tripData.fare ? `${tripData.fare}€` : "No especificada"}</Text>
          <Text>🚖 Ubicación del Conductor: {tripData.driverLocation ? `${tripData.driverLocation.latitude}, ${tripData.driverLocation.longitude}` : "No disponible"}</Text>
        </View>
      ) : (
        <Text>No hay datos disponibles.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 15,
    alignItems: "center",
  },
});

export default DriverTripDescriptionScreen;



