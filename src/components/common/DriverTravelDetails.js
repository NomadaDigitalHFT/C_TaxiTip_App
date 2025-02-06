import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DriverTravelDetails = ({ tripData }) => {
  if (!tripData) {
    return <Text>Cargando detalles del viaje...</Text>;
  }

  return (
    <View style={styles.infoContainer}>
      <Text>📍 Origen (Usuario): {tripData.lastLocation?.address || "N/A"}</Text>
      <Text>🎯 Destino (Conductor): {tripData.driverLocation ? `${tripData.driverLocation.latitude}, ${tripData.driverLocation.longitude}` : "No disponible"}</Text>
      <Text>⏳ Tiempo Estimado: {tripData.estimatedTime || "N/A"} min</Text>
      <Text>💰 Tarifa: {(tripData.distance * 1.40 + 2).toFixed(2) || "No especificada"}€</Text>
      <Text>🚖 Ubicación en Tiempo Real del Conductor: {tripData.driverLocation?.latitude}, {tripData.driverLocation?.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: { backgroundColor: "#fff", padding: 15, borderRadius: 10, elevation: 3, marginTop: 10 },
});

export default DriverTravelDetails;

