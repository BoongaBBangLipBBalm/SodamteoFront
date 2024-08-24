import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { getToken } from "@/utils/localStorage";
import AIToggleButton from "../../components/AIToggleButton";

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
  position: relative; /* Necessary for overlay */
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

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 12px;
  background: linear-gradient(to right, #4c5cf2, purple, #d86767);
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(192, 192, 192, 0.6); /* Gray overlay */
  z-index: 10;
  border-radius: 20px;

  ${props => !props.isAuto && css`
    display: none;
  `}
`;

const AirConditioner = () => {
  const [isOn, setIsOn] = useState(false);
  const [goalTemp, setGoalTemp] = useState(25);
  const [showTempOptions, setShowTempOptions] = useState(false);
  const [isAuto, setIsAuto] = useState(false);  // State for AI mode
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchAirConditionerStatus = async () => {
      const token = getToken();
      try {
        const response = await fetch('/api/hardware/control', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const airConditioner = data.find(device => device.device === 'Airconditioner');
          if (airConditioner) {
            const { status, isAuto } = airConditioner;
            setIsOn(status > 0);
            setGoalTemp(status);
            setIsAuto(isAuto);  // Set AI mode state
          }
        } else {
          console.error("Failed to fetch air conditioner status");
        }
      } catch (error) {
        console.error("Failed to fetch air conditioner status:", error);
      }
    };

    fetchAirConditionerStatus();
  }, []); 

  const handleKnobDrag = (e) => {
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const offsetX = e.clientX - sliderRect.left;
    let newTemp = (offsetX / sliderRect.width) * 24 + 16;
    newTemp = Math.max(16, Math.min(40, newTemp));
    setGoalTemp(newTemp);
  };

  const handleTempSelectClick = () => {
    setShowTempOptions(prevShowTempOptions => !prevShowTempOptions);
  };

  const handleTempOptionClick = async (temp) => {
    setGoalTemp(temp);
    setShowTempOptions(false);

    const token = getToken(); 

    try {
      const response = await fetch('/api/hardware/control', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          device: 'Airconditioner',
          targetValue: temp,
        }),
      });

      if (response.ok) {
        console.log("Temperature update success:", await response.json());
      } else {
        console.error("Failed to update temperature");
      }
    } catch (error) {
      console.error("Failed to update temperature:", error);
    }
  };

  const handleAIToggle = (newIsAuto) => {
    setIsAuto(newIsAuto);
  };

  const calculateLeft = (temp) => ((temp - 16) / 24) * 100;

  return (
    <Container>
      <Overlay isAuto={isAuto} /> {/* Gray overlay when AI is enabled */}
      <HeaderContainer>
        <h1>Air Conditioner</h1>
        <AIToggleButton isAuto={isAuto} onToggle={handleAIToggle} />
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
