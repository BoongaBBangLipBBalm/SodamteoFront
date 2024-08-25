"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import AIToggleButton from "./AIToggleButton";
import { getToken } from "@/utils/localStorage";

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

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 12px;
  background: linear-gradient(to right, #8b4513, #f4a460);
  border-radius: 5px;
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
  left: 0;
  margin-left: 10px;
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

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 16px;
`;

const StatusBar = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
`;

const StatusFill = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: #8b4513;
  border-radius: 10px;
  transition: width 0.3s;
`;
const Fertilizer = () => {
  const [isOn, setIsOn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("0.0");
  const [showOptions, setShowOptions] = useState(false);
  const [fertilizerData, setFertilizerData] = useState(null);
  const sliderRef = useRef(null);

  const fetchDeviceData = async () => {
    try {
      const token = getToken();
      const response = await axios.get("/api/hardware/control", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fertilizer = response.data.find(device => device.device === "Fertilizer");
      if (fertilizer) {
        setFertilizerData(fertilizer);
        setSelectedValue(fertilizer.status.toFixed(1));
      }
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, [selectedValue, isOn]);

  const handleSelectClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleOptionClick = async (option) => {
    setSelectedValue(option);
    setShowOptions(false);

    try {
      const token = getToken();
      const response = await axios.patch("/api/hardware/control", {
        device: "Fertilizer",
        targetValue: parseFloat(option)
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFertilizerData(response.data);
    } catch (error) {
      console.error("Error updating fertilizer status:", error);
    }
  };

  const calculateLeft = (value) => ((parseFloat(value) - 0) / 100) * 100;

  return (
    <Container>
      <HeaderContainer>
        <ToggleContainer>
          <AIToggleButton isAuto={isOn} onToggle={setIsOn} />
        </ToggleContainer>
        <SelectContainer>
          <div style={{ position: "relative" }}>
            <SelectButton onClick={handleSelectClick} $show={showOptions}>
              {selectedValue}
            </SelectButton>
            <SelectList $show={showOptions}>
              {Array.from({ length: 201 }, (_, i) => i * 0.5).map((option) => (
                <OptionList key={option}>
                  <OptionButton onClick={() => handleOptionClick(option.toFixed(1))}>
                    {option.toFixed(1)}
                  </OptionButton>
                </OptionList>
              ))}
            </SelectList>
          </div>
        </SelectContainer>
      </HeaderContainer>

      {/* 상태 바 */}
      <SliderContainer ref={sliderRef}>
        <Knob left={calculateLeft(selectedValue)} onMouseDown={(e) => {
          e.preventDefault();
          document.addEventListener('mousemove', handleKnobDrag);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleKnobDrag);
          }, { once: true });
        }} />
        <Marker style={{ left: `${calculateLeft(selectedValue)}%` }}>Status</Marker>
      </SliderContainer>
      <ScaleLabelContainer>
        <div>0.0</div>
        <div>20.0</div>
        <div>40.0</div>
        <div>60.0</div>
        <div>80.0</div>
        <div>100.0</div>
      </ScaleLabelContainer>
    </Container>
  );
};

export default Fertilizer;