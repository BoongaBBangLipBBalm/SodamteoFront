"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";

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
  height: 50vh;
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

const CircleKnob = styled.div`
  width: 80px;
  height: 80px;
  background-color: #04293a;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const Knob = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fac57d;
  border-radius: 50%;
  top: 50%;
  left: ${props => props.left}%;
  transform: translate(-50%, -50%);
`;

const ScaleLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
  font-size: 12px;
  color: #333;
  margin-top: 5px;
`;


const Humidifier = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalHumidity, setGoalHumidity] = useState(50);
  const circleKnobRef = useRef(null);

  const calculateLeft = (humidity) => ((humidity / 75) * 100);

  const handleKnobDrag = (e) => {
    const circleRect = circleKnobRef.current.getBoundingClientRect();
    const offsetX = e.clientX - circleRect.left;
    let newHumidity = (offsetX / circleRect.width) * 75;
    newHumidity = Math.max(25, Math.min(75, newHumidity));
    setGoalHumidity(newHumidity);
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
          <Knob left={calculateLeft(goalHumidity)} />
        </CircleKnob>
        <ScaleLabelContainer>
          <div>25</div>
          <div>50</div>
          <div>75</div>
        </ScaleLabelContainer>
        <ToggleContainer>
          AI
          <ToggleLabel isOn={isOn} onClick={() => setIsOn(!isOn)} />
        </ToggleContainer>
      </FlexContainer>
    </Container>
  );
};

export default Humidifier;