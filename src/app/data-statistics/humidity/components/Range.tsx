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
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 22px;
  align-self: flex-start;
`;

const RangeBar = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  background: linear-gradient(to top, #D36667 0%, #5B807F 50%, #4C5BEC 100%);
`;

const Indicator = styled.div`
  position: absolute;
  width: 60px;
  background-color: ${props => props.bgColor || 'white'};
  padding: 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #ddd;
  text-align: center;
  line-height: 1.2;
  z-index: 10;
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}
  transform: ${props => props.transform || 'translateY(-50%)'};
  &:after {
    content: '${props => props.label || ''}';
    display: block;
    font-size: 12px;
    color: #333;
    margin-top: 2px;
  }
`;

const BlackLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: white;
  z-index: 5;
`;

const CurrentHumidityLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #E9B374;
  z-index: 5;
`;

const Range = () => {
  const [currentHumidity, setCurrentHumidity] = useState(50);
  const [optHumidity, setOptHumidity] = useState({ min: 30, max: 70 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHumidity = async () => {
      const token = getToken(); 
      try {
        const response = await axios.get('/api/environment/current_environment', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        const optimalHumidity = data.Opt.humidity;

        if (data.Current.length > 0) {
          const humiditySensor = data.Current.find(device => device.humidity !== undefined);
          if (humiditySensor) {
            setCurrentHumidity(humiditySensor.humidity);
          } else {
            setError('Humidity data not found');
          }
        } else {
          setError('No current humidity data available');
        }

        setOptHumidity({
          min: optimalHumidity - 5,
          max: optimalHumidity + 5
        });
      } catch (err) {
        setError('Failed to fetch humidity data');
        console.error(err);
      }
    };

    fetchHumidity();

    const interval = setInterval(() => {
      fetchHumidity();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBottomPercentage = (humidity) => {
    const minHumidity = 30;
    const maxHumidity = 100;
    const clampedHumidity = Math.max(minHumidity, Math.min(humidity, maxHumidity));
    return ((clampedHumidity - minHumidity) / (maxHumidity - minHumidity)) * 100;
  };

  const formatHumidity = (humidity) => humidity.toFixed(1);

  return (
    <Container>
      <RangeContainer>
        <Header>최적 습도</Header>
        <RangeBar>
          <CurrentHumidityLine style={{ bottom: `${getBottomPercentage(currentHumidity)}%` }} />
          <Indicator 
            left="-60px"  
            style={{ bottom: `${getBottomPercentage(optHumidity.min)}%`, transform: 'translateY(0%)' }} 
            bgColor="white"
            label="Min"
          >
            {formatHumidity(optHumidity.min)}%
          </Indicator>
          <Indicator 
            left="-60px"  
            style={{ bottom: `${getBottomPercentage(optHumidity.max)}%`, transform: 'translateY(0%)' }} 
            bgColor="white"
            label="Max"
          >
            {formatHumidity(optHumidity.max)}%
          </Indicator>
          <Indicator 
            right="-60px"  
            style={{ bottom: `${getBottomPercentage(currentHumidity)}%`, transform: 'translateY(0%)' }} 
            bgColor="#FBF2BD"
            label="Now"
          >
            {formatHumidity(currentHumidity)}%
          </Indicator>
          <BlackLine style={{ bottom: `${getBottomPercentage(optHumidity.min)}%` }} />
          <BlackLine style={{ bottom: `${getBottomPercentage(optHumidity.max)}%` }} />
        </RangeBar>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </RangeContainer>
    </Container>
  );
};

export default Range;
