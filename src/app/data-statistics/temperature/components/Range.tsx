"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { getToken } from "@/utils/localStorage";

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
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 22px;
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
  width: 50px;
  background-color: ${props => props.bgColor || 'white'};
  padding: 5px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid #ddd;
  text-align: center;
  line-height: 1.2;
  z-index: 10;
  &:after {
    content: '${props => props.label || ''}';
    display: block;
    font-size: 12px;
    color: #333;
    margin-top: 2px;
  }
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}
`;

const BlackLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: white;
  z-index: 5;
`;

const CurrentTemperatureLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #E9B374;
  z-index: 5;
`;

const Range = () => {
  const [currentTemp, setCurrentTemp] = useState(25);
  const [optTemp, setOptTemp] = useState({ min: 0, max: 54 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      const token = getToken(); 
      try {
        const response = await axios.get('/api/environment/current_environment', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        const optimalTemperature = data.Opt.temperature;

        if (data.Current.length > 0) {
          const airConditioner = data.Current.find(device => device.temperature !== undefined);
          if (airConditioner) {
            setCurrentTemp(airConditioner.temperature);
          } else {
            setError('Temperature data not found');
          }
        } else {
          setError('No current temperature data available');
        }

        setOptTemp({
          min: optimalTemperature - 1.8,
          max: optimalTemperature + 1.8
        });
      } catch (err) {
        setError('Failed to fetch temperature data');
        console.error(err);
      }
    };

    fetchTemperature();

    const interval = setInterval(() => {
      fetchTemperature();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBottomPercentage = (temp) => {
    const minTemp = 16;
    const maxTemp = 40;
    const clampedTemp = Math.max(minTemp, Math.min(temp, maxTemp));
    return ((clampedTemp - minTemp) / (maxTemp - minTemp)) * 100;
  };

  const formatTemp = (temp) => temp.toFixed(1);

  return (
    <Container>
      <RangeContainer>
        <Header>최적 온도</Header>
        <RangeBar>
          <CurrentTemperatureLine style={{ bottom: `${getBottomPercentage(currentTemp)}%` }} />
          <Indicator 
            left="-51px"  // Position min indicator outside left of the bar
            style={{ bottom: `${getBottomPercentage(optTemp.min)}%` }} 
            bgColor="white"
            label="Min"
          >
            {formatTemp(optTemp.min)}°C
          </Indicator>
          <Indicator 
            left="-51px"  // Position max indicator outside left of the bar
            style={{ bottom: `${getBottomPercentage(optTemp.max)}%` }} 
            bgColor="white"
            label="Max"
          >
            {formatTemp(optTemp.max)}°C
          </Indicator>
          <Indicator 
            right="-51px"  // Position current temperature indicator outside right of the bar
            style={{ bottom: `${getBottomPercentage(currentTemp)}%` }} 
            bgColor="#FBF2BD"
            label="Now"
          >
            {formatTemp(currentTemp)}°C
          </Indicator>
          <BlackLine style={{ bottom: `${getBottomPercentage(optTemp.min)}%` }} />
          <BlackLine style={{ bottom: `${getBottomPercentage(optTemp.max)}%` }} />
        </RangeBar>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </RangeContainer>
    </Container>
  );
};

export default Range;
