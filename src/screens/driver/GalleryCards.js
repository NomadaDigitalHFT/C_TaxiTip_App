import React, { useState, useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import DriverCard from "./../../components/driver/DriverCard";
import { db } from "./../../firebase/firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ListContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const GalleryCards = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userCardsCollection = collection(db, "userCards");
    const q = query(userCardsCollection, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
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

          setRequests(newRequests);
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

  const handleRemoveCard = (requestId) => {
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <ListContainer>
      <FlatList 
        data={requests} 
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <DriverCard 
            data={item} 
            onRemove={() => handleRemoveCard(item.id)} 
          />
        )} 
      />
    </ListContainer>
  );
};

export default GalleryCards;


