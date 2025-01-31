/* Archivo: Alertas.js */
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import styled from "styled-components/native";
import theme from "../styles/theme";

const Alertas = ({ message, type = "success", visible = false }) => {
  const translateY = useSharedValue(-100);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 500 });
    } else {
      translateY.value = withDelay(2000, withTiming(-100, { duration: 500 }));
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return theme.colors.lightGreen;
      case "error":
        return theme.colors.lightRed;
      case "warning":
        return theme.colors.lightOrange;
      default:
        return theme.colors.mediumBlue;
    }
  };

  return (
    <AlertContainer style={[animatedStyle, { backgroundColor: getBackgroundColor() }]}>
      <AlertText>{message}</AlertText>
    </AlertContainer>
  );
};

const AlertContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px;
  z-index: 1000;
  align-items: center;
`;

const AlertText = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.bold};
`;

export default Alertas;

