"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { getToken } from "@/utils/localStorage";
import AIToggleButton from "@/app/data-statistics/components/AIToggleButton";

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background-color: #f8f7f6;
  border-radius: 20px;
  margin: 20px;
  height: 85vh;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 12px;
  height: 60vh;
  margin: 20px 0;
  background: linear-gradient(to top, ${props => props.gradient});
  border-radius: 5px;
`;

const SliderLabel = styled.div`
  position: absolute;
  left: 20px;
  transform: translateX(-50%);
  font-size: 12px;
`;

const Marker = styled.div`
  position: absolute;
  left: 100%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const TemperatureSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #c9302c;
  }
`;

const AirConditioner = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalTemp, setGoalTemp] = useState(23.5); // Default value, will be updated from API
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchAirConditionerStatus = async () => {
      const token = getToken();
      try {
        const response = await axios.get('/api/hardware/control', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Extracting data from response
        const data = response.data;
        const airConditioner = data.find(device => device.device === 'Airconditioner');
        if (airConditioner) {
          const { status, isAuto } = airConditioner;
          setIsOn(isAuto);  // Set the AI mode state
          setGoalTemp(status); // Update the goal temperature
        } else {
          console.error("Air conditioner device not found in the response");
        }
      } catch (error) {
        console.error("Failed to fetch air conditioner status:", error);
      }
    };

    fetchAirConditionerStatus();
  }, []); // Empty dependency array means this runs once on mount

  const handleTemperatureChange = async (event) => {
    const newTemp = parseFloat(event.target.value);
    setGoalTemp(newTemp);
    const token = getToken();

    try {
      const response = await axios.patch('/api/hardware/control', {
        device: 'Airconditioner',
        targetValue: newTemp,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log("Temperature update success:", response.data);
    } catch (error) {
      console.error("Failed to update temperature:", error);
    }
  };

  const handleDeleteDevice = async () => {
    const token = getToken();
    try {
      const response = await axios.delete('/api/hardware/control', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          device: 'Airconditioner',
        },
      });

      setDeleteMessage(response.data.message); // Set success message
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDeleteMessage("Air conditioner device not found");
      } else {
        setDeleteMessage("Failed to delete device");
      }
      console.error("Failed to delete device:", error);
    }
  };

  const calculateTop = (temp) => {
    const minTemp = 10;
    const maxTemp = 30;
    return ((maxTemp - temp) / (maxTemp - minTemp)) * 100;
  };

  return (
    <Container>
      <Title>Air Conditioner</Title>
      <FlexContainer>
        <SliderContainer gradient="#FF5733, #3333FF">
          <SliderLabel style={{ top: '0%' }}>30°C</SliderLabel>
          <SliderLabel style={{ top: '50%' }}>20°C</SliderLabel>
          <SliderLabel style={{ top: '100%' }}>10°C</SliderLabel>
          <Marker style={{ top: `${calculateTop(goalTemp)}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%' }} />
            Goal
          </Marker>
        </SliderContainer>
        <TemperatureSelect value={goalTemp.toFixed(1)} onChange={handleTemperatureChange}>
          {[...Array(21).keys()].map(i => (
            <option key={i} value={(i + 10).toFixed(1)}>{(i + 10).toFixed(1)}°C</option>
          ))}
        </TemperatureSelect>
        {/* Replacing the old toggle with the new AIToggleButton component */}
        <AIToggleButton isAuto={isOn} onToggle={setIsOn} />
        <DeleteButton onClick={handleDeleteDevice}>Delete Device</DeleteButton>
        {deleteMessage && <p>{deleteMessage}</p>}
      </FlexContainer>
    </Container>
  );
};

export default AirConditioner;
