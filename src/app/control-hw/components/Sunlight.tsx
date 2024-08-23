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
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
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
  height: 50vh;
  margin: 20px 0;
  background: linear-gradient(to top, #FF0000, #660000); /* Reverted to original gradient */
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

const SunLight = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalLight, setGoalLight] = useState(20); // default value set to 20°C
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchSunlightData = async () => {
      const token = getToken();
      try {
        const response = await axios.get('/api/hardware/control', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = response.data;
        const sunlightDevice = data.find(device => device.device === 'Blind');
        if (sunlightDevice) {
          const { status, isAuto } = sunlightDevice;
          setIsOn(isAuto);
          setGoalLight(status);
        } else {
          console.error("Sunlight device not found in the response");
        }
      } catch (error) {
        console.error("Failed to fetch sunlight data:", error);
      }
    };

    fetchSunlightData();
  }, []);

  const handleLightChange = async (event) => {
    const newLight = parseFloat(event.target.value);
    setGoalLight(newLight);

    const token = getToken();
    try {
      const response = await axios.patch('/api/hardware/control', {
        device: 'Blind',
        targetValue: newLight,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log("Light level update success:", response.data);
    } catch (error) {
      console.error("Failed to update light level:", error);
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
          device: 'Blind',
        },
      });

      setDeleteMessage(response.data.message); // Set success message
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDeleteMessage("Sunlight device not found");
      } else {
        setDeleteMessage("Failed to delete device");
      }
      console.error("Failed to delete device:", error);
    }
  };

  const calculateLeft = (light) => ((light / 40) * 100);

  return (
    <Container>
      <Title>Sun Light</Title>
      <FlexContainer>
        <SliderContainer gradient="#FF0000, #660000"> {/* Gradient restored */}
          <SliderLabel style={{ top: '0%' }}>40°C</SliderLabel>
          <SliderLabel style={{ top: '50%' }}>20°C</SliderLabel>
          <SliderLabel style={{ top: '100%' }}>0°C</SliderLabel>
          <Marker style={{ top: `${100 - calculateLeft(goalLight)}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%' }} />
            Goal
          </Marker>
        </SliderContainer>
        <TemperatureSelect value={goalLight.toFixed(1)} onChange={handleLightChange}>
          {[...Array(9).keys()].map(i => (
            <option key={i} value={(i * 5).toFixed(1)}>
              {(i * 5).toFixed(1)}°C
            </option>
          ))}
        </TemperatureSelect>
        <DeleteButton onClick={handleDeleteDevice}>Delete Device</DeleteButton>
        {deleteMessage && <p>{deleteMessage}</p>}
      </FlexContainer>
    </Container>
  );
};

export default SunLight;
