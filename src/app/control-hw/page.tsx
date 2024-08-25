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
`;

const Header = styled.h1`
  padding: 15px 20px;
  font-weight: 500;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90vh;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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
        <Header>Control Hardware</Header>
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
