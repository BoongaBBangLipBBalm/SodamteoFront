"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 1125px;
  background-color: #f8f7f6;
  border-radius: 20px;
  margin: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  width: 80%;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-self: flex-start;
  font-weight: 500;
  font-size: 23px;
  padding: 10px;
`;

const ToggleLabel = styled.label`
  display: inline-block;
  width: 50px;
  height: 25px;
  background-color: ${props => (props.isOn ? '#274c4b' : '#ccc')};
  border-radius: 25px;
  position: relative;
  margin: 3px 15px 0px 15px;
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
  flex-grow: 1;
  position: relative;
  margin: 0 10px 25px 20px;
`;

const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  background: linear-gradient(to right, #4c5cf2, purple, #d86767);
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  pointer-events: none; /* 사용자가 슬라이더를 건드릴 수 없게 설정 */

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 30px;
    background: #f6ac47;
    border-radius: 7px;
    cursor: pointer;
  }
`;

const Marker = styled.div`
  position: absolute;
  left: ${props => props.left}%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MarkerLabel = styled.div`
  font-size: 12px;
`;

const CircleKnob = styled.div`
  width: 100px;
  height: 100px;
  background-color: #04293a;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const Knob = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #fac57d;
  border-radius: 50%;
  top: 50%;
  left: ${props => props.left}%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const ScaleLabelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px;
  margin-top: 5px;
`;

const ScaleLabel = styled.div`
  font-size: 12px;
  color: #333;
`;

const AirConditioner = () => {
  const [isOn, setIsOn] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(28);
  const [goalTemp, setGoalTemp] = useState(25);
  const circleKnobRef = useRef(null);

  const calculateLeft = (temp) => ((temp / 40) * 100);

  const handleKnobDrag = (e) => {
    const circleRect = circleKnobRef.current.getBoundingClientRect();
    const offsetX = e.clientX - circleRect.left;
    let newTemp = (offsetX / circleRect.width) * 40;
    newTemp = Math.max(0, Math.min(40, newTemp));
    setGoalTemp(newTemp);
  };

  return (
    <Container>
      <FlexContainer>
        <ToggleContainer>
          <span>Air Conditioner</span>
          <ToggleLabel isOn={isOn} onClick={() => setIsOn(!isOn)} />
          <span>AI</span>
        </ToggleContainer>
        <SliderContainer>
          <Slider
            min={0}
            max={40}
            value={goalTemp}
            readOnly
          />
          <Marker left={calculateLeft(goalTemp)}>
            <MarkerLabel>Goal</MarkerLabel>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%' }} />
          </Marker>
          <Marker left={calculateLeft(currentTemp)}>
            <MarkerLabel>Now</MarkerLabel>
            <div style={{ backgroundColor: 'black', width: '10px', height: '10px', borderRadius: '50%' }} />
          </Marker>
          <ScaleLabelContainer>
            <ScaleLabel>0°C</ScaleLabel>
            <ScaleLabel>10°C</ScaleLabel>
            <ScaleLabel>20°C</ScaleLabel>
            <ScaleLabel>30°C</ScaleLabel>
            <ScaleLabel>40°C</ScaleLabel>
          </ScaleLabelContainer>
        </SliderContainer>
      </FlexContainer>
      <CircleKnob
        ref={circleKnobRef}
        onMouseDown={(e) => {
          e.preventDefault();
          const handleMouseMove = (e) => handleKnobDrag(e);
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp, { once: true });
        }}
      >
        <Knob left={calculateLeft(goalTemp)} />
      </CircleKnob>
    </Container>
  );
};

export default AirConditioner;
