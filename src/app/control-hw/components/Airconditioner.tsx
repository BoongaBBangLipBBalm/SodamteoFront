"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import api from "@/utils/api";

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
  color: black;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ToggleLabel = styled.label`
  display: inline-block;
  width: 50px;
  height: 25px;
  background-color: ${props => (props.isOn ? '#274c4b' : '#ccc')};
  border-radius: 25px;
  position: relative;
  margin: 0 10px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    top: 50%;
    left: ${props => (props.isOn ? 'calc(100% - 22px)' : '2px')};
    transform: translateY(-50%);
    transition: all 0.3s;
  }
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


const AirConditioner = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalTemp, setGoalTemp] = useState(20);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 에어컨 상태를 조회
    const fetchAirConditionerStatus = async () => {
      try {
        const response = await api.get('/api/hardware/airconditioner', {
          params: { device: 'airconditioner' },
        });
        const { status } = response.data;
        setIsOn(status > 0);
        setGoalTemp(status); // 목표 온도 설정
      } catch (error) {
        console.error("Failed to fetch air conditioner status:", error);
      }
    };

    fetchAirConditionerStatus();
  }, []);

  const handleTemperatureChange = async (event) => {
    const newTemp = parseFloat(event.target.value);
    setGoalTemp(newTemp);
    try {
      const response = await api.post('/api/hardware/airconditioner', {
        device: 'airconditioner',
        targetValue: newTemp,
      });
      console.log("Temperature update success:", response.data);
    } catch (error) {
      console.error("Failed to update temperature:", error);
    }
  };

  return (
    <Container>
      <Title>Air Conditioner</Title>
      <FlexContainer>
        <SliderContainer gradient="#FF5733, #3333FF">
          <SliderLabel style={{ top: '0%' }}>30°C</SliderLabel>
          <SliderLabel style={{ top: '50%' }}>20°C</SliderLabel>
          <SliderLabel style={{ top: '100%' }}>10°C</SliderLabel>
          <Marker style={{ top: `${100 - ((goalTemp - 10) / 20) * 100}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%' }} />
            Goal
          </Marker>
        </SliderContainer>
        <select value={goalTemp} onChange={handleTemperatureChange} style={{ padding: '10px', fontSize: '16px', marginTop: '20px' }}>
          {[...Array(21).keys()].map(i => (
            <option key={i} value={i + 10}>{i + 10}°C</option>
          ))}
        </select>
        <ToggleContainer>
          AI
          <ToggleLabel isOn={isOn} onClick={() => setIsOn(!isOn)} />
        </ToggleContainer>
      </FlexContainer>
    </Container>
  );
};

export default AirConditioner;