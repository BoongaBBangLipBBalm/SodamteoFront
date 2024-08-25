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
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 170px;
  margin-bottom: 20px;
`;

const Header = styled.h2`
  font-weight: 500;
  font-size: 20px;
  padding: 5px;
  margin-top: 10px;
`;

const RangeBar = styled.div`
  position: relative;
  width: 50%;
  height: 80%;
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

const SelectButton = styled.button`
  width: 73px;
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
  width: 73px;
  top: 77px;
  right: 128px;
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

const IndicatorLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: ${props => props.background || '#000'};
  left: 0;
  z-index: 5;
  top: ${props => props.top || '0%'};
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
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchValues = async () => {
      const token = getToken();
      try {
        const response = await axios.get('/api/environment/current_environment', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;

        const latestEntry = data.Current[0];

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

  const handleSelectClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedNutrient(option);
    setShowOptions(false);
  };

  return (
    <Container>
      <RangeContainer>
        <HeaderContainer>
          <SelectButton onClick={handleSelectClick} $show={showOptions}>
            {selectedNutrient}
          </SelectButton>
          <SelectList $show={showOptions}>
            {["N", "P", "K", "pH"].map((option) => (
              <OptionList key={option}>
                <OptionButton onClick={() => handleOptionClick(option)}>
                  {option}
                </OptionButton>
              </OptionList>
            ))}
          </SelectList>
          <Header>최적 값</Header>
        </HeaderContainer>
        <RangeBar>
          <IndicatorLine 
            top={`${getBottomPercentage(currentValues[selectedNutrient], optimalValues[selectedNutrient])}%`} 
            background="#FBF2BD" 
            height="2px"
          />
          <IndicatorLine 
            top={`${getBottomPercentage(optimalValues[selectedNutrient], optimalValues[selectedNutrient])}%`} 
            background="#D36667" 
            height="2px"
          />
          <Indicator
            style={{
              bottom: `${getBottomPercentage(currentValues[selectedNutrient], optimalValues[selectedNutrient])}%`,
              backgroundColor: '#FBF2BD'
            }}
            label="Now"
          >
            {formatValue(currentValues[selectedNutrient])}
          </Indicator>
          <Indicator
            style={{
              bottom: `${getBottomPercentage(optimalValues[selectedNutrient], optimalValues[selectedNutrient])}%`,
              left: "250%",
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
