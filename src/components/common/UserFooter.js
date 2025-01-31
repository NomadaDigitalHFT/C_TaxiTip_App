import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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

const FooterButton = styled(TouchableOpacity)`
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
      <FooterButton onPress={() => navigation.navigate('UserHome')}>
        <Ionicons name="home" size={24} color="#007BFF" />
        <FooterText>Home</FooterText>
      </FooterButton>

      {/* Action Button (Center) */}
      <FooterButton onPress={() => console.log('Center Action Pressed')}>
        <Ionicons name="add-circle" size={36} color="#007BFF" />
      </FooterButton>

      {/* Settings Button */}
      <FooterButton onPress={() => navigation.navigate('SettingsScreen')}>
        <Ionicons name="settings" size={24} color="#007BFF" />
        <FooterText>Configuración</FooterText>
      </FooterButton>
    </FooterContainer>
  );
};

export default Footer;
