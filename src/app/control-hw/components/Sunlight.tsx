"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { getToken } from "@/utils/localStorage";
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
  height: 55vh;
  margin: 20px 0;
  background: linear-gradient(to top, #FF0000, #660000);
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
  left: 120%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  font-size: 14px;
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
  padding: 0;
  border: 1px solid #274c4b;
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
  z-index: 1000;
  max-height: 100px;
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

const SunLight = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalLight, setGoalLight] = useState<number>(20);
  const [showOptions, setShowOptions] = useState(false);
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
          setGoalLight(Number(status));
        } else {
          console.error("자외선 조절기 기기를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("자외선 조절기 상태를 가져오는 데 실패했습니다:", error);
      }
    };
  
    fetchSunlightData();
  }, []);
  
  const handleSelectClick = () => {
    setShowOptions(prevShowOptions => !prevShowOptions);
  };

  const handleOptionClick = async (option: string) => {
    const numericOption = parseFloat(option); 
    setGoalLight(numericOption); 
    setShowOptions(false);
  
    const token = getToken();
    try {
      await axios.patch('/api/hardware/control', {
        device: 'Blind',
        targetValue: numericOption, 
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log("조명 수준 업데이트 성공");
    } catch (error) {
      console.error("조명 수준 업데이트에 실패했습니다:", error);
    }
  };
  
  const handleDeleteDevice = async () => {
    const token = getToken();
    try {
      await axios.delete('/api/hardware/control', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          device: 'Blind',
        },
      });

      setDeleteMessage("기기가 성공적으로 삭제되었습니다."); 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDeleteMessage("자외선 조절기 기기를 찾을 수 없습니다.");
      } else {
        setDeleteMessage("기기 삭제에 실패했습니다.");
      }
      console.error("기기 삭제에 실패했습니다:", error);
    }
  };

  const calculateLeft = (light) => ((light / 40) * 100);

  return (
    <Container>
      <Title>자외선 제어</Title>
      <FlexContainer>
        <SliderContainer>
          <SliderLabel style={{ top: '0%' }}>40°C</SliderLabel>
          <SliderLabel style={{ top: '50%' }}>20°C</SliderLabel>
          <SliderLabel style={{ top: '95%' }}>0°C</SliderLabel>
          <Marker style={{ top: `${98 - calculateLeft(goalLight)}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%', margin: '10px' }} />
            Now
          </Marker>
        </SliderContainer>

        <SelectContainer>
          <SelectButton onClick={handleSelectClick} $show={showOptions}>
            {goalLight.toFixed(1)}°C
          </SelectButton>

          <SelectList $show={showOptions}>
            {[...Array(9).keys()].map(i => (
              <OptionList key={i}>
                <OptionButton onClick={() => handleOptionClick((i * 5).toFixed(1))}>
                  {(i * 5).toFixed(0)}°C
                </OptionButton>
              </OptionList>
            ))}
          </SelectList>
        </SelectContainer>

        <DeleteButton onClick={handleDeleteDevice} message={deleteMessage} />
        {deleteMessage && <p>{deleteMessage}</p>}
      </FlexContainer>
    </Container>
  );
};

export default SunLight;
