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

const RadioContainer = styled.div`
  width: 1000px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Label = styled.label`
  font-size: 18px;
  line-height: 2rem;
  padding: 0 0.4em;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-bottom: 40px;
  
  span {
    margin-left: 8px;
  }
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  transition: border 0.5s ease-in-out;
  vertical-align: middle;

  &:checked {
    border: 0.4em solid #274C4B;
  }

  &:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) dotted #274C4B;
  }

  &:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }

  &:disabled {
    background-color: lightgray;
    box-shadow: none;
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedTempType, setSelectedTempType] = useState("soil");
  const router = useRouter();
  const names = ["Humidity", "Temperature", "Fertilizer"];

  const handleNameClick = (index) => {
    setActiveIndex(index);
    if (names[index] !== "Temperature") {
      router.push(`/data-statistics/${names[index].toLowerCase()}`);
    }
  };

  const handleRadioChange = (type) => {
    setSelectedTempType(type);
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
      </RotatingContainer>
    </Container>
  );
};

export default Header;
