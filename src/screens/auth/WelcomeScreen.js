import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  const handleNavigation = (role) => {
    navigation.navigate("AuthNavigator", { role });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icons/Moneda_taxitip.png")} style={styles.profileImage} />
      <Text style={styles.title}>¡Bienvenido a TaxiTip!</Text>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={() => handleNavigation("usuario")}>
          <Text style={styles.buttonText}>Usuario</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation("conductor")}>
          <Text style={styles.buttonText}>Conductor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, margin: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  button: { backgroundColor: "#4682b4", padding: 15, borderRadius: 8, width: "40%", alignItems: "center" },
  buttonText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
});

export default WelcomeScreen;




