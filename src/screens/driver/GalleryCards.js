import React, { useState, useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import DriverCard from "./../../components/driver/DriverCard";
import { db } from "./../../firebase/firebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

const ListContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const GalleryCards = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userCardsCollection = collection(db, "userCards");

    const unsubscribe = onSnapshot(
      userCardsCollection,
      (snapshot) => {
        if (snapshot.empty) {
          setRequests([]);
          setLoading(false);
          return;
        }

        try {
          const newRequests = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // 🔹 Ordenar correctamente de la más antigua a la más reciente
          const sortedRequests = newRequests
            .filter(req => req.createdAt) // Asegurar que tienen fecha
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); 

          setRequests(sortedRequests);
          setLoading(false);
        } catch (error) {
          console.error("Error procesando solicitudes:", error);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error al escuchar Firestore:", error);
        Alert.alert("Error", "No se pudo obtener las solicitudes.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAccept = async (ticket) => {
    try {
      await updateDoc(doc(db, "userCards", ticket.id), { status: "accepted" });
      setRequests((prev) => prev.filter((req) => req.id !== ticket.id));
      navigation.navigate("DriverTicketScreen", { ticket });
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      Alert.alert("Error", "No se pudo aceptar la solicitud.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <ListContainer>
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DriverCard data={item} onAccept={() => handleAccept(item)} />}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No hay solicitudes disponibles.</Text>
      )}
    </ListContainer>
  );
};

export default GalleryCards;
