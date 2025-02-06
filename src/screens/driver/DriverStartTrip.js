import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import DriverTravelDetails from "./../../components/common/DriverTravelDetails";

const DriverStartTrip = () => {
  const route = useRoute();
  const { tripData } = route.params; // 🔥 RECIBIMOS LOS DATOS AQUÍ

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚖 DriverStartTrip</Text>
      {tripData ? (
        <DriverTravelDetails tripData={tripData} />
      ) : (
        <Text>Cargando detalles del viaje...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

export default DriverStartTrip;




// Tenemos que en la App del usuario no sale la userCard.js con los datos para que el conductor pueda tomar la decisión y el Botón  ButtonConfirmationTrip.js que Aceptará el Viaje y ahora estás esperando confirmación del usuario. Mientras en la app del usuario se aUserTripProgressScreen.js   pasa a la siguiente pantalla donde puede confirmar la tarifa y aceptar o cancelar si cancela, buttonCancelCards.js desaparece el servicio del db y avisa al Usuario que "Su solicitud ha sido cancelada". Pero si acepta el usuario pasa a la Siguiente pantalla UserMapViewScreen.js.. En el caso de los usuarios que ha Aceptado el Viaje, se detiene en Esperando la confirmación del Usuario DriverTripDescriptionScreen.js y queda esperando detalles del viaje. Pero es aquí donde al cambiar de estado en db debería de avanzar a  DriverStartTrip.js donde se mostrará los detalles del viaje final con un boton donde se pueda llamar al usuario (con un link de WhatsApp) y un botón que será un link de google que permita abrir Google Maps de conductor para no cargar más gastos a TaxiTip (Que te parece este Idea..) como siempre empecemos con un trabajo de razonamiento y optimización del proyecto sujetándonos a la línea de Aplicación que venimos desarrollando. Dame tu consejo profesional y siempre con miras a un proyecto de potencial escalable que aspira a que todos los participantes, tanto Usuario como conductor puedan manejarse de manera rápida, fluida, e independiente.


///1️⃣ Revisar e implementar correctamente UserCard.js en la app del usuario.
// 2️⃣ Añadir un listener en DriverTripDescriptionScreen.js para detectar cambios en el estado de Firebase y avanzar automáticamente a DriverStartTrip.js.
// 3️⃣ Implementar los botones de comunicación rápida (WhatsApp y Google Maps) en DriverStartTrip.js.
// 4️⃣ Verificar la lógica de cancelación en buttonCancelCards.js y asegurarse de que el conductor reciba una notificación inmediata cuando el usuario cancele.