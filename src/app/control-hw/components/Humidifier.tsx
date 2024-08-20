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

const Humidifier = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalHumidity, setGoalHumidity] = useState(50);
  const circleKnobRef = useRef(null);

  // 가습기 상태 조회 함수
  useEffect(() => {
    const fetchHumidifierStatus = async () => {
      try {
        const response = await api.get('/api/hardware/humidifier', {
          params: { device: 'humidifier' }
        });
        const { status } = response.data;
        setIsOn(status > 0);  // 가습기가 켜져 있는지 확인
        setGoalHumidity(status);  // 목표 습도 설정
      } catch (error) {
        console.error("Failed to fetch humidifier status:", error);
      }
    };

    fetchHumidifierStatus(); // 컴포넌트 마운트 시 가습기 상태 조회
  }, []);

  // 목표 습도를 서버에 POST 요청하는 함수
  const updateHumidifierStatus = async (newHumidity) => {
    try {
      const response = await api.post('/api/hardware/humidifier', {
        device: 'humidifier',
        targetValue: newHumidity
      });

      // 성공적으로 업데이트된 경우 상태 반영
      const { status } = response.data;
      setGoalHumidity(status);
      console.log("Humidifier status updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update humidifier status:", error);
    }
  };

  const calculateLeft = (humidity) => ((humidity / 75) * 100);

  const handleKnobDrag = (e) => {
    const circleRect = circleKnobRef.current.getBoundingClientRect();
    const offsetX = e.clientX - circleRect.left;
    let newHumidity = (offsetX / circleRect.width) * 75;
    newHumidity = Math.max(25, Math.min(75, newHumidity));
    setGoalHumidity(newHumidity);

    // POST 요청으로 새로운 목표 습도를 서버에 전송
    updateHumidifierStatus(newHumidity);
  };

  const handleSelectChange = (e) => {
    const newHumidity = Number(e.target.value);
    setGoalHumidity(newHumidity);

    // 서버로 목표 습도를 전송하는 요청
    updateHumidifierStatus(newHumidity);
  };

  return (
    <Container>
      <Title>Humidifier</Title>
      <FlexContainer>
        <SliderContainer gradient="#003333, #99CCCC">
          <SliderLabel style={{ top: '0%' }}>75%</SliderLabel>
          <SliderLabel style={{ top: '50%' }}>50%</SliderLabel>
          <SliderLabel style={{ top: '100%' }}>25%</SliderLabel>
          <Marker style={{ top: `${100 - calculateLeft(goalHumidity)}%` }}>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%' }} />
            Goal
          </Marker>
        </SliderContainer>
        <SelectBox value={goalHumidity} onChange={handleSelectChange}>
          <option value={25}>25%</option>
          <option value={30}>30%</option>
          <option value={35}>35%</option>
          <option value={40}>40%</option>
          <option value={45}>45%</option>
          <option value={50}>50%</option>
          <option value={55}>55%</option>
          <option value={60}>60%</option>
          <option value={65}>65%</option>
          <option value={70}>70%</option>
          <option value={75}>75%</option>
        </SelectBox>
        <ToggleContainer>
          AI
          <ToggleLabel isOn={isOn} onClick={() => setIsOn(!isOn)} />
        </ToggleContainer>
      </FlexContainer>
    </Container>
  );
};

export default Humidifier;
