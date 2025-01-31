/* Archivo: InputField.js */
import React from "react";
import styled from "styled-components/native";
import theme from "../styles/theme";

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

const StyledInput = styled.TextInput`
  padding: 10px;
  border: 1px solid ${({ hasError }) => (hasError ? theme.colors.lightRed : "#ccc")};
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  font-family: ${theme.fonts.regular};
`;

const ErrorText = styled.Text`
  color: ${theme.colors.lightRed};
  font-size: 12px;
  margin-top: 5px;
  font-family: ${theme.fonts.regular};
`;

const InputField = ({ type, placeholder, value, onChangeText, error }) => {
  return (
    <InputContainer>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === "password"}
        hasError={!!error}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default InputField;

