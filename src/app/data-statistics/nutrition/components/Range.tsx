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
  width: 80%;
  height: 60vh;
  border: 1px solid #ddd;
  background-color: #F8F7F6;
  border-radius: 20px;
  padding: 30px 50px;
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
  font-weight: 500;
  margin: 0;
`;

const Select = styled.select`
  margin-left: auto;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
`;

const RangeBar = styled.div`
  position: relative;
  width: 80%;
  height: 90%;
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

  return (
    <Container>
      <RangeContainer>
        <HeaderContainer>
          <Header>Range</Header>
          <Select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
            <option value="N">N</option>
            <option value="P">P</option>
            <option value="K">K</option>
            <option value="pH">pH</option>
          </Select>
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
