import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #ccc;
`;

const FooterButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.Text`
  font-size: 12px;
  color: #333;
`;

const Footer = () => {
  const navigation = useNavigation();

  return (
    <FooterContainer>
      {/* Home Button */}
      <FooterButton onPress={() => navigation.navigate('DriverHomeScreen')}>
        <Ionicons name="home" size={24} color="#007BFF" />
        <FooterText>Home</FooterText>
      </FooterButton>

      {/* Center Action Button */}
      <FooterButton onPress={() => console.log('Center Action Pressed')}>
        <Ionicons name="add-circle" size={36} color="#007BFF" />
      </FooterButton>

      {/* History Button */}
      <FooterButton onPress={() => navigation.navigate('DriverHistoryScreen')}>
        <Ionicons name="time" size={24} color="#007BFF" />
        <FooterText>Historial</FooterText>
      </FooterButton>
    </FooterContainer>
  );
};

export default Footer;

// Usage in DriverHomeScreen.js
// Place the following line at the bottom of the return in DriverHomeScreen component
// <Footer />