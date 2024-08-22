"use client"
import styled from "styled-components";
import { useState } from "react";
import AirConditioner from "./components/Airconditioner";
import Humidifier from "./components/Humidifier";
import SunLight from "./components/Sunlight";
import Fertilizer from "./components/Fertilizer";


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

const AddButton = styled.button`
    width: 200px;
    height: 50px;
    padding: 15px;
    margin: 20px;
    border-radius: 10px;
    background-color: #274C4B;
    font-family: "Pretendard-Regular";
    font-size: 1.25rem;
    color: white;
    border: none;
    align-items: center;

    &:hover {
        background-color: #153130;
    }
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const controlHW = () => {
  const [hardwareList, setHardwareList] = useState(["AirConditioner", "Humidifier", "SunLight", "Fertilizer"]);

  const handleAddHardware = () => {
    // 새로운 하드웨어를 추가하는 로직
    setHardwareList([...hardwareList, "NewHardware"]);
  };

  return (
    <Wrapper>
      <HeaderContainer>
        <Header>Control Hardware</Header>
        <AddButton onClick={handleAddHardware}>새로운 하드웨어 추가</AddButton>
      </HeaderContainer>
      <Container>
        {hardwareList.map((hardware, index) => {
          switch (hardware) {
            case "AirConditioner":
              return <AirConditioner key={index} />;
            case "Humidifier":
              return <Humidifier key={index} />;
            case "SunLight":
              return <SunLight key={index} />;
            case "Fertilizer":
              return <Fertilizer key={index} />;
            case "NewHardware":
              return <div key={index}>New Hardware Component</div>;
            default:
              return null;
          }
        })}
      </Container>
    </Wrapper>
  );
};

export default controlHW;
