"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import api from "@/utils/api";

const Container = styled.div`
  width: 97%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background-color: #f8f7f6;
  border-radius: 20px;
  margin: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
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
  width: 100%;
  height: 12px;
  background: linear-gradient(to right, #4c5cf2, purple, #d86767);
  border-radius: 5px;
`;

const SliderLabel = styled.div`
  position: absolute;
  top: 20px;
  transform: translateY(-50%);
  font-size: 12px;
`;

const Marker = styled.div`
  position: absolute;
  top: 100%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Knob = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #fac57d;
  border-radius: 50%;
  top: 50%;
  left: ${props => props.left}%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const ScaleLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  color: #333;
  margin-top: 5px;
`;

const SelectButton = styled.button`
  width: 90px;
  padding: 10px;
  margin: 10px;
  font-size: 15px;
  line-height: 14px;
  background-color: white;
  border: 1px solid #274C4B;
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
    border: 1px solid #274C4B;
    outline: 2px solid #749F73;
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-40%) rotate(0deg);
    border: 5px solid transparent;
    border-top-color: #274C4B;
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
  margin-left: 10px;
  padding: 0;
  border: 1px solid #274C4B;
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
    background-color: #F8F7F6;
  }
`;

const OptionList = styled.li`
  padding: 3px 5px;
  margin: 0 3px;
  color: black;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  position: relative;
`;

const AirConditioner = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalTemp, setGoalTemp] = useState(25);
  const [showTempOptions, setShowTempOptions] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 에어컨 상태를 조회하는 함수
    const fetchAirConditionerStatus = async () => {
      try {
        const response = await api.get('/api/hardware/airconditioner', {
          params: { device: 'airconditioner' }
        });
        const { status } = response.data;
        setIsOn(status > 0);
        setGoalTemp(status); // 서버에서 받은 목표 온도 설정
      } catch (error) {
        console.error("Failed to fetch air conditioner status:", error);
      }
    };

    fetchAirConditionerStatus(); // 마운트 시 조회
  }, []);

  const handleKnobDrag = (e) => {
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const offsetX = e.clientX - sliderRect.left;
    let newTemp = (offsetX / sliderRect.width) * 24 + 16;
    newTemp = Math.max(16, Math.min(40, newTemp));
    setGoalTemp(newTemp);
  };

  const handleTempSelectClick = () => {
    setShowTempOptions((prevShowTempOptions) => !prevShowTempOptions);
  };

  const handleTempOptionClick = async (temp) => {
    setGoalTemp(temp);
    setShowTempOptions(false);

    // 서버로 목표 온도 전송하는 API 호출
    try {
      const response = await api.post('/api/hardware/airconditioner', {
        device: 'airconditioner',
        targetValue: temp,
      });
      console.log("Temperature update success:", response.data);
    } catch (error) {
      console.error("Failed to update temperature:", error);
    }
  };

  const calculateLeft = (temp) => ((temp - 16) / 24) * 100;

  return (
    <Container>
      <HeaderContainer>
        <ToggleContainer>
          <Title>Air Conditioner</Title>
          <ToggleLabel isOn={isOn} onClick={() => setIsOn(!isOn)} />
          <span>AI</span>
        </ToggleContainer>
        <SelectContainer>
          <div style={{ position: 'relative' }}>
            <SelectButton onClick={handleTempSelectClick} $show={showTempOptions}>
              {goalTemp}°C
            </SelectButton>
            <SelectList $show={showTempOptions}>
              {Array.from({ length: 25 }, (_, i) => 16 + i).map(temp => (
                <OptionList key={temp}>
                  <OptionButton onClick={() => handleTempOptionClick(temp)}>{temp}°C</OptionButton>
                </OptionList>
              ))}
            </SelectList>
          </div>
        </SelectContainer>
      </HeaderContainer>
      <FlexContainer>
        <SliderContainer ref={sliderRef}>
          <Knob left={calculateLeft(goalTemp)} onMouseDown={handleKnobDrag} />
          <Marker style={{ left: `${calculateLeft(goalTemp)}%` }}>
            Goal
          </Marker>
        </SliderContainer>
      </FlexContainer>
      <ScaleLabelContainer>
        <div>16°C</div>
        <div>22°C</div>
        <div>28°C</div>
        <div>34°C</div>
        <div>40°C</div>
      </ScaleLabelContainer>
    </Container>
  );
};

export default AirConditioner;