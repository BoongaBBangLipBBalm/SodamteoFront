"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 30%;
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
  padding: 30px 50px;
  margin: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);  
`;

const Header = styled.h2`
  margin-bottom: 20px;
  font-weight: 500;
  align-self: flex-start;
`;

const RangeBar = styled.div`
  position: relative;
  width: 90%;
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

const labels = [
  { label: '54°C', bottom: '100%' },
  { label: '36°C', bottom: '67%' },
  { label: '25°C (Goal)', bottom: '50%' },
  { label: '18°C', bottom: '33%' },
  { label: '0°C', bottom: '0%' }
];

const Range = () => {
  const [currentTemp, setCurrentTemp] = useState(25);

  useEffect(() => {
    // Simulating real-time temperature updates
    const interval = setInterval(() => {
      setCurrentTemp(Math.floor(Math.random() * (32 - 18 + 1)) + 18);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBottomPercentage = (temp) => {
    return ((temp - 18) / (32 - 18)) * 100;
  };

  return (
    <Container>
      <RangeContainer>
        <Header>Range</Header>
        <RangeBar>
          {labels.map((label) => (
            <Indicator key={label.label} style={{ bottom: label.bottom }}>
              {label.label}
            </Indicator>
          ))}
          <Indicator style={{ bottom: `${getBottomPercentage(currentTemp)}%` }}>
            {currentTemp}°C (Now)
          </Indicator>
          {labels.map((label) => (
            <Tick key={label.label} style={{ bottom: label.bottom }} />
          ))}
        </RangeBar>
      </RangeContainer>
    </Container>
  );
};

export default Range;
