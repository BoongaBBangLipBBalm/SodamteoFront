"use client";

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-left: 100px;
`;

const NameContainer = styled.div`
  height: 10px;
  display: flex;
  align-items: flex-start;
  position: relative;
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
  height: 10px;
`;

const ButtonContainer = styled.div`
  width: 1000px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background-color: #274C4B;
  color: white;
`;

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const router = useRouter();
  const names = ["Humidity", "Temperature", "Nutrition"];

  const handleNameClick = (index) => {
    setActiveIndex(index);
    if (names[index] !== "Temperature") {
      router.push(`/data-statistics/${names[index].toLowerCase()}`);
    }
  };

  const handleSubButtonClick = (type) => {
    router.push(`/data-statistics/temperature/${type}`);
  };

  const calculateLeftPosition = index => {
    const positions = [50, 0, 100];
    const adjustedIndex = (index - activeIndex + names.length) % names.length;
    return positions[adjustedIndex];
  };

  return (
    <Container>
      <RotatingContainer>
        <NameContainer>
          {names.map((name, index) => (
            <Name
              key={index}
              isActive={index === activeIndex}
              left={calculateLeftPosition(index)}
              onClick={() => handleNameClick(index)}
            >
              {name}
            </Name>
          ))}
        </NameContainer>
        {activeIndex === 1 && (
          <ButtonContainer>
            <Button onClick={() => handleSubButtonClick('soil')}>토양 온도</Button>
            <Button onClick={() => handleSubButtonClick('air')}>기온</Button>
          </ButtonContainer>
        )}
      </RotatingContainer>
    </Container>
  );
};

export default Header;
