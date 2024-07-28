"use client";

import React, { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  height: 10px;
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  margin-left: 100px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: normal;
  color: gray;
  cursor: pointer;
  transition: all 0.3s;
  padding-top: 5px;
  position: absolute;
  left: ${props => props.left}%;
  transform: translateX(-50%);

  ${props =>
    props.isActive &&
    css`
      font-size: 25px;
      font-weight: 500;
      color: black;
    `};
`;

const RotatingContainer = styled.div`
  position: relative;
  width: 270px;
  height: 50px;
`;

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const names = ["Humidity", "Temperature", "Nutrition"];

  const handleNameClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % names.length);
  };

  const calculateLeftPosition = index => {
    const positions = [50, 0, 100]; 
    const adjustedIndex = (index - activeIndex + names.length) % names.length;
    return positions[adjustedIndex];
  };

  return (
    <Container>
      <RotatingContainer onClick={handleNameClick}>
        {names.map((name, index) => (
          <Name
            key={index}
            isActive={index === activeIndex}
            left={calculateLeftPosition(index)}
          >
            {name}
          </Name>
        ))}
      </RotatingContainer>
    </Container>
  );
};

export default Header;
