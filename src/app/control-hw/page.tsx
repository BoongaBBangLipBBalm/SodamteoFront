"use client"
import styled from "styled-components";
import AirConditioner from "./components/Airconditioner";
import Humidifier from "./components/Humidifier";
import SunLight from "./components/Sunlight";

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
  justify-content: center; 
  align-items: center;
  height: 90vh;
  gap: 20px;
`;

const controlHW = () => {
  return (
    <Wrapper>
      <Header>Control Hardware</Header>
      <Container>
        <AirConditioner />
        <Humidifier />
        <SunLight />
      </Container>
    </Wrapper>
   
  );
};

export default controlHW;

