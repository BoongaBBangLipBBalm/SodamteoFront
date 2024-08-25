"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from 'axios';
import { getToken } from "@/utils/localStorage";
import AIToggleButton from "@/app/data-statistics/humidity/components/AIToggleButton";
import DeleteButton from "./DeleteButton";

const Container = styled.div`
  max-width: 230px;
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
  background: linear-gradient(to top, ${props => props.gradient});
  border-radius: 5px;
`;

const SliderLabel = styled.div`
  position: absolute;
  right: 15px;
  transform: translateX(-50%);
  font-size: 14px;
`;

const Marker = styled.div`
  position: absolute;
  left: 130%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const SelectButton = styled.button`
  width: 90px;
  padding: 10px;
  margin: 10px 0;
  font-size: 15px;
  background-color: white;
  border: 1px solid #274c4b;
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
  left: 0;
  padding: 0;
  border: 1px solid #274c4b;
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

const Humidifier = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalHumidity, setGoalHumidity] = useState(50); // Default value
  const [deleteMessage, setDeleteMessage] = useState(''); // Message displayed after delete
  const [showOptions, setShowOptions] = useState(false);

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
          setIsOn(isAuto);
          setGoalHumidity(status);
        } else {
          alert("습도 조절기 기기를 찾을 수 없습니다.");
        }
      } catch (error) {
        alert("습도 조절기 상태를 가져오는 데 실패했습니다: " + error.message);
      }
    };

    fetchHumidifierStatus();
  }, []);

  const updateHumidifierStatus = async (newHumidity) => {
    const token = getToken();
    try {
      await axios.patch('/api/hardware/control', {
        device: 'Humidifier',
        targetValue: newHumidity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setGoalHumidity(newHumidity); 
    } catch (error) {
      alert("습도 조절기 상태 업데이트에 실패했습니다: " + error.message);
    }
  };

  const handleSelectClick = () => {
    setShowOptions(prev => !prev);
  };

  const handleOptionClick = async (option) => {
    setGoalHumidity(option); // Update state immediately
    setShowOptions(false);
    await updateHumidifierStatus(option);
  };

  const handleDeleteDevice = async () => {
    const token = getToken();
    try {
      await axios.delete('/api/hardware/control', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          device: 'Humidifier',
        },
      });

      setDeleteMessage("기기가 성공적으로 삭제되었습니다.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDeleteMessage("습도 조절기 기기를 찾을 수 없습니다.");
      } else {
        setDeleteMessage("기기 삭제에 실패했습니다: " + error.message);
      }
      console.error("기기 삭제에 실패했습니다:", error);
    }
  };

  const calculateTop = (humidity) => ((95 - humidity) / (95 - 25)) * 100;

  return (
    <Container>
      <Title>습도 제어</Title>
      <FlexContainer>
        <SliderContainer gradient="#003333, #99CCCC">
          <SliderLabel style={{ top: '0%' }}>95%</SliderLabel>
          <SliderLabel style={{ top: '50%' }}>60%</SliderLabel>
          <SliderLabel style={{ top: '98%' }}>25%</SliderLabel>
          <Marker style={{ top: `${calculateTop(goalHumidity)}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%', margin: '10px' }} />
            Now
          </Marker>
        </SliderContainer>
        <div style={{ position: 'relative' }}>
          <SelectButton onClick={handleSelectClick} $show={showOptions}>
            {goalHumidity.toFixed(1)}%
          </SelectButton>
          <SelectList $show={showOptions}>
            {[...Array(15).keys()].map(i => (
              <OptionList key={i}>
                <OptionButton onClick={() => handleOptionClick(25 + i * 5)}>
                  {25 + i * 5}%
                </OptionButton>
              </OptionList>
            ))}
          </SelectList>
        </div>
        <AIToggleButton isAuto={isOn} onToggle={setIsOn} />
        <DeleteButton onClick={handleDeleteDevice} message={deleteMessage} />
        {deleteMessage && <p>{deleteMessage}</p>}
      </FlexContainer>
    </Container>
  );
};

export default Humidifier;
