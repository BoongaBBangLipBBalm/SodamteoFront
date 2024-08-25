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
  flex-direction: column;
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const Header = styled.h2`
  font-weight: 500;
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
  left: ${props => props.left || '100%'};
  transform: ${props => props.transform || 'translateY(-50%)'};
  background-color: white;
  padding: 5px;
  border-radius: 3px;
  font-size: 14px;
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
`;

const SelectBox = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Range = () => {
  const [currentValues, setCurrentValues] = useState({
    N: 0,
    P: 0,
    K: 0,
    pH: 0,
  });
  const [optimalValues, setOptimalValues] = useState({
    N: 79.89,
    P: 47.58,
    K: 39.87,
    pH: 6.43,
  });
  const [selectedNutrient, setSelectedNutrient] = useState("N");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValues = async () => {
      const token = getToken(); 
      try {
        const response = await axios.get('/api/environment/current_environment', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;

        const latestEntry = data.Current[0]; // 가장 최근 값을 가져옴

        setCurrentValues({
          N: latestEntry.N ?? 0,
          P: latestEntry.P ?? 0,
          K: latestEntry.K ?? 0,
          pH: latestEntry.ph ?? 0,
        });

        setOptimalValues({
          N: data.Opt.N,
          P: data.Opt.P,
          K: data.Opt.K,
          pH: data.Opt.ph,
        });
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    };

    fetchValues();

    const interval = setInterval(() => {
      fetchValues();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBottomPercentage = (value, optValue) => {
    let min = 0, max = optValue * 2;
    if (selectedNutrient === "pH") {
      min = 0;
      max = 14;
    }
    const clampedValue = Math.max(min, Math.min(value, max));
    return ((clampedValue - min) / (max - min)) * 100;
  };

  const formatValue = (value) => {
    return typeof value === 'number' ? value.toFixed(2) : 'N/A';
  };

  const handleSelectChange = (event) => {
    setSelectedNutrient(event.target.value);
  };

  return (
    <Container>
      <RangeContainer>
        <HeaderContainer>
          <Header>Range</Header>
          <SelectBox value={selectedNutrient} onChange={handleSelectChange}>
            <option value="N">N</option>
            <option value="P">P</option>
            <option value="K">K</option>
            <option value="pH">pH</option>
          </SelectBox>
        </HeaderContainer>
        <RangeBar>
          <Indicator 
            style={{ 
              bottom: `${getBottomPercentage(currentValues[selectedNutrient], optimalValues[selectedNutrient])}%`, 
              transform: 'translateY(-50%)'
            }} 
            label="Current"
          >
            {formatValue(currentValues[selectedNutrient])}
          </Indicator>
          <Indicator 
            style={{ 
              bottom: `${getBottomPercentage(optimalValues[selectedNutrient], optimalValues[selectedNutrient])}%`, 
              left: "0%", 
              transform: 'translateX(-100%)' 
            }} 
            label="Optimal"
          >
            {formatValue(optimalValues[selectedNutrient])}
          </Indicator>
        </RangeBar>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </RangeContainer>
    </Container>
  );
};

export default Range;
