import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";

const DriverTripDescriptionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const db = getFirestore();
  const { requestId } = route.params;
  const [tripData, setTripData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // Tiempo de espera de 60 segundos

  useEffect(() => {
    if (!requestId) {
      Alert.alert("Error", "No se recibió el ID del viaje.");
      navigation.goBack();
      return;
    }
  
    const requestRef = doc(db, "userCards", requestId);
  
    console.log("📡 Escuchando cambios en Firestore para requestId:", requestId);
  
    const unsubscribe = onSnapshot(requestRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTripData(data);
  
        console.log("📡 Estado actual en Firestore:", data.status);
  
        // Detener el temporizador si el estado cambia a "confirmed"
        if (data.status === "confirmed") {
          console.log("✅ Estado confirmado, navegando a DriverStartTrip...");
          clearInterval(countdown);  // Detiene el temporizador
          navigation.navigate("DriverStartTrip", { requestId, tripData: data });
        }
      } else {
        console.error("❌ No se encontró la solicitud en Firestore.");
        Alert.alert("Error", "No se encontró la solicitud en Firestore.");
        navigation.goBack();
      }
    });
  
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleTimeout();
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => {
      unsubscribe();
      clearInterval(countdown);
    };
  }, [requestId]);
  

  const handleTimeout = async () => {
    console.log("⏳ Tiempo agotado, cancelando viaje...");
    const requestRef = doc(db, "userCards", requestId);
    await updateDoc(requestRef, { status: "cancelled" });
    Alert.alert("⏳ El usuario no confirmó a tiempo. Viaje cancelado.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕐 Esperando Confirmación del Usuario...</Text>
      <Text style={styles.timer}>Tiempo restante: {timeLeft}s</Text>
      <Text>{tripData ? `Destino: ${tripData.lastLocation?.address}` : "Cargando..."}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  timer: { fontSize: 18, color: "red", fontWeight: "bold" },
});

export default DriverTripDescriptionScreen;





