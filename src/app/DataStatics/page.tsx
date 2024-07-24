"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f4f4;
  width: 100%;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const ContentHeader = styled.h2`
  margin-bottom: 20px;
  font-weight: normal;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GraphContainer = styled.div`
  width: 60%;
  margin-right: 20px;
`;

const RangeContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RangeBar = styled.div`
  height: 200px;
  width: 30px;
  background: linear-gradient(to top, blue 0%, blue 33%, green 33%, green 66%, red 66%, red 100%);
  position: relative;
  margin-top: 20px;
`;

const RangeIndicator = styled.div`
  position: absolute;
  left: 35px;
  bottom: ${props => props.bottom}%;
  transform: translateY(50%);
  background-color: white;
  padding: 2px 5px;
  border-radius: 3px;
`;

const AirConditionerContainer = styled.div`
  margin-top: 20px;
`;

const AirConditionerControl = styled.div`
  display: flex;
  align-items: center;
`;

const AirConditionerButton = styled.button`
  margin-right: 20px;
  padding: 10px 20px;
  background-color: ${props => (props.isOn ? "green" : "red")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AirConditionerSlider = styled.input.attrs({ type: 'range' })`
  flex-grow: 1;
`;

const data = {
  labels: ["4 hour ago", "2 hour ago", "Now"],
  datasets: [
    {
      label: "Temperature",
      data: [15, 25, 22, 28, 20, 25],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const DataStatistics: React.FC = () => {
  const [isACOn, setIsACOn] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(25);

  return (
    <Container>
      <Content>
        <ContentHeader>Humidity | Temperature | Nutrition</ContentHeader>

        <TopContainer>
          <GraphContainer>
            <Line data={data} options={options} />
          </GraphContainer>
          <RangeContainer>
            <RangeBar>
              <RangeIndicator bottom={((currentTemp - 18) / (32 - 18)) * 100}>
                {currentTemp}°C (Now)
              </RangeIndicator>
            </RangeBar>
          </RangeContainer>
        </TopContainer>

        <AirConditionerContainer>
          <AirConditionerControl>
            <AirConditionerButton isOn={isACOn} onClick={() => setIsACOn(!isACOn)}>
              {isACOn ? "ON" : "OFF"}
            </AirConditionerButton>
            <AirConditionerSlider
              min={10}
              max={30}
              value={currentTemp}
              onChange={e => setCurrentTemp(Number(e.target.value))}
            />
          </AirConditionerControl>
        </AirConditionerContainer>
      </Content>
    </Container>
  );
};

export default DataStatistics;
