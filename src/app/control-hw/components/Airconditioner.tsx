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
  width: 20px;
  height: 50vh;
  margin: 20px 0;
  background: linear-gradient(to top, #FF5733, #3333FF);
  border-radius: 5px;
`;

const SliderLabel = styled.div`
  position: absolute;
  right: 14px;
  transform: translateX(-50%);
  font-size: 14px;
`;

const Marker = styled.div`
  position: absolute;
  left: 130%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  font-size: 15px;
`;

const SelectButton = styled.button`
  width: 90px;
  padding: 10px;
  margin: 10px;
  font-size: 15px;
  line-height: 14px;
  background-color: white;
  border: 1px solid #274c4b;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
  position: relative;
  transition: border-color 0.3s, outline 0.3s;

  &:hover,
  &:focus {
    border: 1px solid #274c4b;
    outline: 2px solid #749f73;
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-40%) rotate(0deg);
    border: 5px solid transparent;
    border-top-color: #274c4b;
    transition: transform 0.3s;
  }

  ${({ $show }) => $show && `
    &::after {
      transform: translateY(-80%) rotate(180deg);
    }
  `}
`;

const SelectList = styled.ul`
  list-style-type: none;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  position: absolute;
  width: 90px;
  top: 47px;
  left: 3px;
  margin-left: 50px;
  padding: 0;
  border: 1px solid #274c4b;
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
  z-index: 1000;
  max-height: 130px;
  overflow-y: auto;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 7px 10px;
  border: none;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  color: black;

  &:hover,
  &:focus {
    background-color: #f8f7f6;
  }
`;

const OptionList = styled.li`
  padding: 3px;
  margin: 0 3px;
  color: black;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #c9302c;
  }
`;

const AirConditioner = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalTemp, setGoalTemp] = useState("23.5"); // Default value, will be updated from API
  const [showOptions, setShowOptions] = useState(false);
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

        const data = response.data;
        const airConditioner = data.find(device => device.device === 'Airconditioner');
        if (airConditioner) {
          const { status, isAuto } = airConditioner;
          setIsOn(isAuto);
          setGoalTemp(status.toFixed(1));
        } else {
          console.error("Air conditioner device not found in the response");
        }
      } catch (error) {
        console.error("Failed to fetch air conditioner status:", error);
      }
    };

    fetchAirConditionerStatus();
  }, []); 

  const handleSelectClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleOptionClick = async (option) => {
    setGoalTemp(option);
    setShowOptions(false);

    const token = getToken();

    try {
      const response = await axios.patch('/api/hardware/control', {
        device: 'Airconditioner',
        targetValue: parseFloat(option),
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

      setDeleteMessage(response.data.message); 
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
          <SliderLabel style={{ top: '95%' }}>10°C</SliderLabel>
          <Marker style={{ top: `${calculateTop(goalTemp)}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%', margin: "10px"}} />
            Now
          </Marker>
        </SliderContainer>

        <SelectContainer>
          <SelectButton onClick={handleSelectClick} $show={showOptions}>
            {goalTemp}
          </SelectButton>
          <SelectList $show={showOptions}>
            {[...Array(21).keys()].map(i => (
              <OptionList key={i}>
                <OptionButton onClick={() => handleOptionClick((i + 10).toFixed(1))}>
                  {(i + 10).toFixed(0)}°C
                </OptionButton>
              </OptionList>
            ))}
          </SelectList>
        </SelectContainer>

        <AIToggleButton isAuto={isOn} onToggle={setIsOn} />
      </FlexContainer>

      <DeleteButton onClick={handleDeleteDevice}>
        Delete
      </DeleteButton>
      {deleteMessage && <p>{deleteMessage}</p>}
    </Container>
  );
};

export default AirConditioner;
