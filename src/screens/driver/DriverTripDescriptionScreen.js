import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import DriverFooter from "./../../components/common/DriverFooter";

const DriverTripDescriptionScreen = () => {
  const route = useRoute();
  const { requestId } = route.params;
  const db = getFirestore();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (!requestId) return;

    console.log("📡 Escuchando datos de Firestore para requestId:", requestId);

    const requestRef = doc(db, "userCards", requestId);
    const unsubscribe = onSnapshot(requestRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTripData(data);
      } else {
        console.error("❌ Error: No se encontró la solicitud.");
      }
    });

    return () => unsubscribe();
  }, [requestId]);

  // Función para calcular la tarifa Tip (km * 1.40€ + 2€)
  const calcularTarifa = (distanciaKm) => {
    return distanciaKm ? (distanciaKm * 1.40 + 2).toFixed(2) : "No especificada";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Viaje</Text>
      {tripData ? (
        <View style={styles.infoContainer}>

          {/* 1️⃣ Origen (Ubicación del Usuario) */}
          <Text>📍 Origen (Usuario): {tripData.lastLocation?.address || "N/A"}</Text>

          {/* 2️⃣ Destino (Ubicación del Conductor cuando aceptó el viaje) */}
          <Text>🎯 Destino (Conductor): {tripData.driverLocation ? `${tripData.driverLocation.latitude}, ${tripData.driverLocation.longitude}` : "No disponible"}</Text>

          {/* 3️⃣ Tiempo Estimado */}
          <Text>⏳ Tiempo Estimado: {tripData.estimatedTime || "N/A"} min</Text>

          {/* 4️⃣ Tarifa Tip */}
          <Text>💰 Tarifa: {calcularTarifa(tripData.distance)}€</Text>

          {/* 5️⃣ Ubicación en Tiempo Real del Conductor */}
          <Text>🚖 Ubicación del Conductor en tiempo real: {tripData.driverLocation ? `${tripData.driverLocation.latitude}, ${tripData.driverLocation.longitude}` : "No disponible"}</Text>

        </View>
      ) : (
        <Text>Cargando datos del viaje...</Text>
      )}
      <DriverFooter />
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
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
});

export default DriverTripDescriptionScreen;



//bien podemos organizarlos para que salgan por orden el la pantalla
// 1- Origen o Usuario / posicion del usuario al  seleccionar su ubicación.
// 2- Destino o Canductor / Posicion del conductor desde el momento que selecciona Aceptar.
// 3- Tiempo Estimado minutos que tadará el conductor hasta llegar al Ususario.
// 4-Tarifa (llamada Tip) distancia  tripData.fare
// 5- Ubicación del conductor en tiempo real. Este dato ya lo hemos recogido en el paso anterior con el numero 2.


// ¡Sí, se entiende perfectamente! Ahora organizaremos los datos en DriverTripDescriptionScreen.js siguiendo el orden correcto para que la información fluya de manera lógica y sea más intuitiva para el usuario.

// Nuevo Orden de Información en Pantalla
// Ubicación inicial del usuario cuando solicita el viaje.
// 1️⃣ 📍 (Usuario): Geo Localización del usuario 

// Ubicación inicial del conductor  cuando solicita el viaje.
// Fuente: tripData.lastLocation?.address
// 2️⃣ 🚖 (Conductor): Geo Localización del conductor 

// Ubicación del conductor en el momento en que acepta el viaje.
// Fuente: tripData.driverLocation.latitude, tripData.driverLocation.longitude
// 3️⃣ ⏳ Tiempo Estimado:

// Tiempo que tardará el conductor en llegar al usuario.
// Fuente: tripData.estimatedTime
// 4️⃣ 💰 Tarifa (Tip):

// Calculada como: (distancia en km * 1.40€) + 2€
// Fuente: tripData.fare
// 5️⃣ 🚖 Ubicación en Tiempo Real del Conductor:

// Se actualiza constantemente mientras el conductor está en camino.
// Fuente: tripData.driverLocation.latitude, tripData.driverLocation.longitude
