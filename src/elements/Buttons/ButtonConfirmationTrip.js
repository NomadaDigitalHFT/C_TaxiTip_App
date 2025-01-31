import React from "react";
import { Alert, Button } from "react-native";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ButtonConfirmationTrip = ({ requestId, onRemoveCard }) => {
  const auth = getAuth();
  const db = getFirestore();

  const handleAcceptTrip = async () => {
    const driver = auth.currentUser;

    if (!driver) {
      Alert.alert("Error", "No estás autenticado.");
      return;
    }

    try {
      // Actualizar el estado del viaje en Firestore
      await updateDoc(doc(db, "requests", requestId), {
        status: "pending",
        assignedDriver: driver.uid,
      });

      // Remover la tarjeta de la lista para otros conductores
      onRemoveCard(requestId);

      Alert.alert("Esperando confirmación del usuario.");
    } catch (error) {
      console.error("Error al aceptar viaje:", error);
      Alert.alert("Error", "No se pudo aceptar la solicitud.");
    }
  };

  return <Button title="Aceptar" onPress={handleAcceptTrip} />;
};

export default ButtonConfirmationTrip;



/* Archivo: ButtonConfirmationTrip.js */
/*
es qui donde desarrollaremos el siguiente paso de la aplicación, que es la confirmacion de la solicitud de viaje. 

este Button debe lanzar una mensaje de confirmacion al usuario, para que este pueda aceptar o rechazar la solicitud de viaje. ya que en la alerta que le sale al Usuario ya se mostaran los datos mas concretos como precio de la tip, distancia y tiempo estimado de llegada. (este paso implicará que debe crear una nueva pantalla en la app del usuario en UserConfirmationScreen.js donde muestra los mas un boton de aceptar y otro de rechazar.)

Por otro lado debe quitar la DiverCard.js de la lista para que otros conductores no puedan verla.

y se mmantiene e espera de que el usuario acepte o rechace la solicitud de viaje. si no lo Hace en un tiempo determinado, la solicitud se cancela automaticamente. este minuto puede de 1 minuto. y se borra de la lista enviando un mensaje al conductor de que la solicitud ha sido cancelada. y al usuario que la solicitud ha sido cancelada por falta de respuesta.

*/
// ButtonConfirmationTrip.js hay que hacer que cuando el conductor acepte el UserCards.js vea una pantalla que le indique que "Esperando confirmación del usuario." (Esto hará que solo pueda acertar una a la vez)  también hay que pensar que el UserConfirmationScreen.js esta en al app del usario no del conductor pro lo que recivira la informacion a traves de Firebase. 