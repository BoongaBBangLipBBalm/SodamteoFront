"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { getToken } from "@/utils/localStorage";
import AIToggleButton from "@/app/data-statistics/humidity/components/AIToggleButton";

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

const ScaleLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
  font-size: 12px;
  color: #333;
  margin-top: 5px;
`;

const SelectBox = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
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

const Humidifier = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalHumidity, setGoalHumidity] = useState(50); // Default value
  const [deleteMessage, setDeleteMessage] = useState(''); // Message displayed after delete
  const circleKnobRef = useRef(null);

  // Fetch humidifier status on component mount
  useEffect(() => {
    const fetchHumidifierStatus = async () => {
      const token = getToken(); // Assuming getToken fetches the stored token
      try {
        const response = await axios.get('/api/hardware/control', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = response.data;
        const humidifier = data.find(device => device.device === 'Humidifier');
        if (humidifier) {
          const { status, isAuto } = humidifier;
          setIsOn(isAuto);  // Set the AI mode state
          setGoalHumidity(status); // Update the goal humidity
        } else {
          console.error("Humidifier device not found in the response");
        }
      } catch (error) {
        console.error("Failed to fetch humidifier status:", error);
      }
    };

    fetchHumidifierStatus();
  }, []);

  // Update the goal humidity on the server
  const updateHumidifierStatus = async (newHumidity) => {
    const token = getToken();
    try {
      const response = await axios.patch('/api/hardware/control', {
        device: 'Humidifier',
        targetValue: newHumidity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const { status } = response.data;
      setGoalHumidity(status); // Update state with new status
      console.log("Humidifier status updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update humidifier status:", error);
    }
  };

  // Handle knob dragging to adjust humidity
  const handleKnobDrag = (e) => {
    const circleRect = circleKnobRef.current.getBoundingClientRect();
    const offsetX = e.clientX - circleRect.left;
    let newHumidity = (offsetX / circleRect.width) * 95; // Updated to max 95
    newHumidity = Math.max(25, Math.min(95, newHumidity));
    setGoalHumidity(newHumidity);

    // Update the humidity on the server
    updateHumidifierStatus(newHumidity);
  };

  // Handle selecting a new humidity value from the dropdown
  const handleSelectChange = (e) => {
    const newHumidity = Number(e.target.value);
    setGoalHumidity(newHumidity);

    // Update the humidity on the server
    updateHumidifierStatus(newHumidity);
  };

  // Delete the humidifier device
  const handleDeleteDevice = async () => {
    const token = getToken();
    try {
      const response = await axios.delete('/api/hardware/control', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          device: 'Humidifier',
        },
      });

      setDeleteMessage(response.data.message); // Set success message
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDeleteMessage("Humidifier device not found");
      } else {
        setDeleteMessage("Failed to delete device");
      }
      console.error("Failed to delete device:", error);
    }
  };

  // Calculate position for the marker based on humidity
  const calculateLeft = (humidity) => ((humidity - 25) / (95 - 25)) * 100; // Updated to max 95

  return (
    <Container>
      <Title>Humidifier</Title>
      <FlexContainer>
        <SliderContainer gradient="#003333, #99CCCC">
          <SliderLabel style={{ top: '0%' }}>95%</SliderLabel> {/* Updated max label */}
          <SliderLabel style={{ top: '50%' }}>60%</SliderLabel>
          <SliderLabel style={{ top: '100%' }}>25%</SliderLabel>
          <Marker style={{ top: `${100 - calculateLeft(goalHumidity)}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%' }} />
            Goal
          </Marker>
        </SliderContainer>
        <SelectBox value={goalHumidity} onChange={handleSelectChange}>
          {[...Array(15).keys()].map(i => (
            <option key={i} value={25 + i * 5}>{25 + i * 5}%</option> // Updated to max 95
          ))}
        </SelectBox>
        {/* Replace ToggleContainer with AIToggleButton */}
        <AIToggleButton isAuto={isOn} onToggle={setIsOn} />
        <DeleteButton onClick={handleDeleteDevice}>Delete Device</DeleteButton>
        {deleteMessage && <p>{deleteMessage}</p>}
      </FlexContainer>
    </Container>
  );
};

export default Humidifier;
