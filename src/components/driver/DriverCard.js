import React from 'react';
import styled from 'styled-components/native';
import ButtonConfirmationTrip from './../../elements/Buttons/ButtonConfirmationTrip';

const CardContainer = styled.View`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const InfoText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
`;

const formatTime = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp);
  return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

const DriverCard = ({ data, onRemove }) => {
  if (!data?.id) {
    console.error("❌ Error: El ID de la solicitud es undefined en DriverCard.");
    return null;
  }

  return (
    <CardContainer>
      <InfoText>🕒 Hora: {formatTime(data.createdAt)}</InfoText>
      <InfoText>📍 Dirección: {data.lastLocation?.address || "N/A"}</InfoText>
      <InfoText>📏 Distancia: {data.lastLocation?.distance ? `${data.lastLocation.distance} km` : "N/A"}</InfoText>
      <InfoText>💰 Propina: {data.tip ? `${data.tip}€` : "No especificada"}</InfoText>
      <ButtonContainer>
        <ButtonConfirmationTrip userCardsId={data.id} onRemoveCard={onRemove} />
      </ButtonContainer>
    </CardContainer>
  );
};

export default DriverCard;

