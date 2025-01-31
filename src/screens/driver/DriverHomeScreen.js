import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import GalleryCards from "./GalleryCards";
import DriverFooter from "./../../components/common/DriverFooter";

const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;

const Header = styled.View`
  padding: 20px;
  background-color: #007bff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const ToggleButton = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${props => (props.available ? "#28a745" : "#dc3545")};
`;

const ToggleButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

const DriverHomeScreen = ({ navigation }) => {
  const [isAvailable, setIsAvailable] = useState(false);

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <Container>
      <Header>
        <HeaderText>
          Modo: {isAvailable ? "Disponible" : "No Disponible"}
        </HeaderText>
        <ToggleButton available={isAvailable} onPress={toggleAvailability}>
          <ToggleButtonText>
            {isAvailable ? "No Disponible" : "Disponible"}
          </ToggleButtonText>
        </ToggleButton>
      </Header>

      {isAvailable ? (
        <GalleryCards navigation={navigation} />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Activa el modo disponible para ver las solicitudes.
        </Text>
      )}

      <DriverFooter />
    </Container>
  );
};

export default DriverHomeScreen;
