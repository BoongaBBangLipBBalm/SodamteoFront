"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 25%;
  height: 100%;    
  display: flex; 
  justify-content: center;
  align-items: center;
`;

const RangeContainer = styled.div`
  width: 100%;
  height: 60vh;
  border: 1px solid #ddd;
  background-color: #F8F7F6;
  border-radius: 20px;
  padding: 10px 30px;
  margin: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);  
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Header = styled.h2`
  width: 100%;
  font-weight: 500;
  margin: 0;
`;

interface SelectButtonProps {
  $show: boolean;
}

const SelectButton = styled.button<SelectButtonProps>`
  width: 60px;
  padding: 10px 20px 10px 10px;
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
  position: relative; /* relative positioning for the arrow */
  transition: border-color 0.3s, outline 0.3s; /* Smooth transition for border and outline */

  &:hover,
  &:focus {
    border: 1px solid #274C4B;
    outline: 2px solid #749F73; /* Changed outline color */
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

  /* Rotate the triangle when the options are shown */
  ${({ $show }) => $show && `
    &::after {
      transform: translateY(-80%) rotate(180deg);
    }
  `}
`;

interface SelectListProps {
  $show: boolean;
}

const SelectList = styled.ul<SelectListProps>`
  list-style-type: none;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  position: absolute;
  width: 80px;
  top: 47px;
  left: 0;
  margin-left: 10px;
  padding: 0;
  border: 1px solid #274C4B; /* Changed border color */
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
  z-index: 1000;
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

const RangeBar = styled.div`
  position: relative;
  width: 60%;
  height: 80%;
  background: linear-gradient(to bottom, #D36667 0%, #5B807F 50%, #4C5BEC 100%);
`;

const Indicator = styled.div`
  position: absolute;
  left: 100%;
  transform: translateY(50%);
  background-color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 14px;
  border: 1px solid #ddd;
`;

const Tick = styled.div`
  position: absolute;
  left: 100%;
  transform: translateX(-50%);
  width: 100%;
  height: 1px;
  background: #ddd;
`;

const labels = {
  N: [
    { label: '50', bottom: '100%' },
    { label: '40', bottom: '75%' },
    { label: '30 (Goal)', bottom: '50%' },
    { label: '20', bottom: '25%' },
    { label: '10', bottom: '0%' }
  ],
  P: [
    { label: '45', bottom: '100%' },
    { label: '35', bottom: '75%' },
    { label: '25 (Goal)', bottom: '50%' },
    { label: '15', bottom: '25%' },
    { label: '5', bottom: '0%' }
  ],
  K: [
    { label: '60', bottom: '100%' },
    { label: '45', bottom: '75%' },
    { label: '30 (Goal)', bottom: '50%' },
    { label: '20', bottom: '25%' },
    { label: '10', bottom: '0%' }
  ],
  pH: [
    { label: '8.0', bottom: '100%' },
    { label: '7.0', bottom: '75%' },
    { label: '6.0 (Goal)', bottom: '50%' },
    { label: '5.0', bottom: '25%' },
    { label: '4.0', bottom: '0%' }
  ]
};

const Range = () => {
  const [currentValue, setCurrentValue] = useState(30);
  const [selectedType, setSelectedType] = useState('N');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('N');

  useEffect(() => {
    const interval = setInterval(() => {
      const min = selectedType === 'pH' ? 4 : 10;
      const max = selectedType === 'pH' ? 8 : 60;
      setCurrentValue(Math.random() * (max - min) + min);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedType]);

  const getBottomPercentage = (value) => {
    const min = selectedType === 'pH' ? 4 : 10;
    const max = selectedType === 'pH' ? 8 : 60;
    return ((value - min) / (max - min)) * 100;
  };

  const handleSelectClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    setSelectedType(option);
  };

  return (
    <Container>
      <RangeContainer>
        <HeaderContainer>
          <Header>Range</Header>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <SelectButton className="btn-select" onClick={handleSelectClick} $show={showOptions}>
              {selectedOption}
            </SelectButton>
            <SelectList className="list-member" $show={showOptions}>
              {Object.keys(labels).map((label) => (
                <OptionList key={label}>
                  <OptionButton onClick={() => handleOptionClick(label)}>{label}</OptionButton>
                </OptionList>
              ))}
            </SelectList>
          </div>
        </HeaderContainer>
        <RangeBar>
          {labels[selectedType].map((label) => (
            <Indicator key={label.label} style={{ bottom: label.bottom }}>
              {label.label}
            </Indicator>
          ))}
          <Indicator style={{ bottom: `${getBottomPercentage(currentValue)}%` }}>
            {selectedType === 'pH' ? currentValue.toFixed(1) : currentValue.toFixed(0)} ({selectedType === 'pH' ? 'pH' : 'Now'})
          </Indicator>
          {labels[selectedType].map((label) => (
            <Tick key={label.label} style={{ bottom: label.bottom }} />
          ))}
        </RangeBar>
      </RangeContainer>
    </Container>
  );
};

export default Range;
