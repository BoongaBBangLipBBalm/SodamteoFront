"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";

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
  background: linear-gradient(to right, #8B4513, #F4A460);
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

const Fertilizer = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalTemp, setGoalTemp] = useState(20);
  const [selectedValue, setSelectedValue] = useState("N");
  const [showOptions, setShowOptions] = useState(false);
  const [showTempOptions, setShowTempOptions] = useState(false);
  const sliderRef = useRef(null);

  const calculateLeft = (temp) => ((temp - 10) / 20) * 100;

  const handleKnobDrag = (e) => {
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const offsetX = e.clientX - sliderRect.left;
    let newTemp = (offsetX / sliderRect.width) * 20 + 10;
    newTemp = Math.max(10, Math.min(30, newTemp));
    setGoalTemp(newTemp);
  };

  const handleSelectClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleTempSelectClick = () => {
    setShowTempOptions((prevShowTempOptions) => !prevShowTempOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setShowOptions(false);
  };

  const handleTempOptionClick = (temp) => {
    setGoalTemp(temp);
    setShowTempOptions(false);
  };

  return (
    <Container>
      <HeaderContainer>
        <ToggleContainer>
          <Title>Fertilizer</Title>
          <ToggleLabel isOn={isOn} onClick={() => setIsOn(!isOn)} />
          <span>AI</span>
        </ToggleContainer>
        <SelectContainer>
          <div style={{ position: 'relative' }}>
            <SelectButton onClick={handleSelectClick} $show={showOptions}>
              {selectedValue}
            </SelectButton>
            <SelectList $show={showOptions}>
              {['N', 'P', 'K', 'pH'].map(option => (
                <OptionList key={option}>
                  <OptionButton onClick={() => handleOptionClick(option)}>{option}</OptionButton>
                </OptionList>
              ))}
            </SelectList>
          </div>
          <div style={{ position: 'relative' }}>
            <SelectButton onClick={handleTempSelectClick} $show={showTempOptions}>
              {goalTemp}°C
            </SelectButton>
            <SelectList $show={showTempOptions}>
              {Array.from({ length: 21 }, (_, i) => 10 + i).map(temp => (
                <OptionList key={temp}>
                  <OptionButton onClick={() => handleTempOptionClick(temp)}>{temp}°C</OptionButton>
                </OptionList>
              ))}
            </SelectList>
          </div>
        </SelectContainer>
      </HeaderContainer>
      <FlexContainer>
        <SliderContainer ref={sliderRef} gradient="#8B4513, #F4A460">
          <Knob ref={sliderRef} left={calculateLeft(goalTemp)} onMouseDown={handleKnobDrag} />
          <Marker style={{ left: `${calculateLeft(goalTemp)}%` }}>
            Goal
          </Marker>
        </SliderContainer>
      </FlexContainer>
      <ScaleLabelContainer>
        <div>10</div>
        <div>14</div>
        <div>18</div>
        <div>22</div>
        <div>26</div>
        <div>30</div>
      </ScaleLabelContainer>
    </Container>
  );
};

export default Fertilizer;
