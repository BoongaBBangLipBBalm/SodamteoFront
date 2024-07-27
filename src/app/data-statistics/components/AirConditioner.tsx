"use client";

import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);  
  max-width: 1125px;
  background-color: #F8F7F6;
  border-radius: 20px;
  margin: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  background-color: ${props => (props.isOn ? '#274C4B' : '#ccc')};
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
  background: linear-gradient(to right, #4C5CF2, purple, #D86767);
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 30px;
    background: #F6AC47;
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
  background-color: #04293A;
  border-radius: 50%;
  position: relative;
`;

const Knob = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #FAC57D;
  border-radius: 50%;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AirConditioner = () => {
  const [isOn, setIsOn] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(20);
  const [goalTemp, setGoalTemp] = useState(25);

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
            min={10}
            max={30}
            value={goalTemp}
            onChange={e => setGoalTemp(Number(e.target.value))}
          />
          <Marker left={(goalTemp - 10) * 5}>
            <MarkerLabel>Goal</MarkerLabel>
            <div style={{ backgroundColor: 'orange', width: '10px', height: '10px', borderRadius: '50%' }} />
          </Marker>
          <Marker left={(currentTemp - 10) * 5}>
            <MarkerLabel>Now</MarkerLabel>
            <div style={{ backgroundColor: 'black', width: '10px', height: '10px', borderRadius: '50%' }} />
          </Marker>
        </SliderContainer>
      </FlexContainer>
      <CircleKnob>
        <Knob style={{ top: `${100 - (goalTemp / 30) * 100}%` }} />
      </CircleKnob>
    </Container>
  );
};

export default AirConditioner;
