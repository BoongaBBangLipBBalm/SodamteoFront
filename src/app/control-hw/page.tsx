"use client"
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'; 
import AirConditioner from "./components/Airconditioner";
import Humidifier from "./components/Humidifier";
import SunLight from "./components/Sunlight";
import Fertilizer from "./components/Fertilizer";
import AddProfileButton from "./components/AddButton";
import { getToken } from "@/utils/localStorage";  

const Wrapper = styled.div`
  width: 100%;
  font-family: 'Pretendard-Regular';
`;

const Header = styled.h1`
  font-size: 2rem;
  margin: 0.5rem 0.625rem;
  padding: 0.5rem 1.25rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 0.3125rem;

  &:hover {
    opacity: 0.8;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90vh;
  gap: 20px;
  font-family: 'Pretendard-Regular';
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 2em;
  padding: 5px;
`;


const controlHW = () => {
  const [hardwareList, setHardwareList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHardwareData = async () => {
      const token = getToken();
      try {
        const response = await axios.get('/api/hardware/control', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const devices = response.data;
        const validDevices = devices.map(device => device.device);

        setHardwareList(validDevices);
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else {
          setError("Error: Unable to fetch hardware data");
        }
      }
    };

    fetchHardwareData();
  }, []);

  return (
    <Wrapper>
      <HeaderContainer>
        <Header>기기 제어</Header>
        <AddProfileButton></AddProfileButton>
      </HeaderContainer>
      <Container>
        {error && <p>{error}</p>}
        {hardwareList.map((hardware, index) => {
          switch (hardware) {
            case "Airconditioner":
              return <AirConditioner key={index} />;
            case "Humidifier":
              return <Humidifier key={index} />;
            case "Blind":
              return <SunLight key={index} />;
            case "Fertilizer":
              return <Fertilizer key={index} />;
            case "NewHardware":
              return <HardwareContainer key={index}>New Hardware Component</HardwareContainer>;
            default:
              return null;
          }
        })}
      </Container>
    </Wrapper>
  );
};

export default controlHW;
