"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { getToken } from "@/utils/localStorage";
import AIToggleButton from "@/app/data-statistics/components/AIToggleButton"; // AIToggleButton import

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

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
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
  background: linear-gradient(to top, #8B4513, #F4A460);
  border-radius: 5px;
  height: 60vh;
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
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin: 10px 0;
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

const Fertilizer = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalTemp, setGoalTemp] = useState(20);
  const [selectedValue, setSelectedValue] = useState("20"); // Default value updated to match SelectBox options
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchFertilizerData = async () => {
      const token = getToken();
      try {
        const response = await axios.get('/api/hardware/control', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = response.data;
        const fertilizerDevice = data.find(device => device.device === 'Fertilizer');
        if (fertilizerDevice) {
          const { status, isAuto } = fertilizerDevice;
          setIsOn(isAuto);
          setGoalTemp(status);
          setSelectedValue(status.toString()); // Update selectedValue to match the goalTemp
        } else {
          console.error("Fertilizer device not found in the response");
        }
      } catch (error) {
        console.error("Failed to fetch fertilizer data:", error);
      }
    };

    fetchFertilizerData();
  }, []);

  const handleSelectChange = async (e) => {
    const newTemp = parseInt(e.target.value, 10);
    setSelectedValue(e.target.value);
    setGoalTemp(newTemp);
    await handleTempChange(newTemp);
  };

  const handleTempChange = async (newTemp) => {
    const token = getToken();
    try {
      const response = await axios.patch('/api/hardware/control', {
        device: 'Fertilizer',
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
          device: 'Fertilizer',
        },
      });

      setDeleteMessage(response.data.message); // Set success message
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDeleteMessage("Fertilizer device not found");
      } else {
        setDeleteMessage("Failed to delete device");
      }
      console.error("Failed to delete device:", error);
    }
  };

  const calculateLeft = (temp) => ((temp / 100) * 100);

  return (
    <Container>
      <HeaderContainer>
        <Title>Fertilizer</Title>
      </HeaderContainer>
      <FlexContainer>
        <SliderContainer>
          <SliderLabel style={{ top: '0%' }}>100</SliderLabel>
          <SliderLabel style={{ top: '50%' }}>50</SliderLabel>
          <SliderLabel style={{ top: '100%' }}>0</SliderLabel>
          <Marker style={{ top: `${100 - calculateLeft(goalTemp)}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%' }} />
            Goal
          </Marker>
        </SliderContainer>
        <SelectBox value={selectedValue} onChange={handleSelectChange}>
          <option value="0">0</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </SelectBox>
        <AIToggleButton isAuto={isOn} onToggle={setIsOn} />
        <DeleteButton onClick={handleDeleteDevice}>Delete Device</DeleteButton>
        {deleteMessage && <p>{deleteMessage}</p>}
      </FlexContainer>
    </Container>
  );
};

export default Fertilizer;
