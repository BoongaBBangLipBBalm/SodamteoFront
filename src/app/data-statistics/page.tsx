"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import Graph from "./components/Graph";
import Range from "./components/Range";
import AirConditioner from "./components/AirConditioner";

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
  const [data, setData] = useState({
    labels: ["4 hours ago", "2 hours ago", "Now"],
    datasets: [
      {
        label: "Temperature",
        data: [15, 25, 22],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });
  const [temp, setTemp] = useState(25);
  const [humid, setHumid] = useState(50);
  const [co2, setCo2] = useState(400);

  const fetchData = () => {
    // Simulating fetching data from a server
    const newTemp = Math.random() * (30 - 18) + 18;
    const newHumid = Math.random() * (70 - 30) + 30;
    const newCo2 = Math.random() * (500 - 300) + 300;
    setTemp(newTemp);
    setHumid(newHumid);
    setCo2(newCo2);

    setData(prevData => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data.slice(1), newTemp],
        },
      ],
    }));
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      
      <Content>
        <ContentHeader>Humidity | Temperature | CO2</ContentHeader>
        <TopContainer>
          <Graph></Graph>
          <Range></Range>
        </TopContainer>
        <AirConditioner></AirConditioner>
      </Content>
    </Container>
  );
};

export default DataStatistics;
