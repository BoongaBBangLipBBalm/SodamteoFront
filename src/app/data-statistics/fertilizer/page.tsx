"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Graph from "./components/Graph";
import Range from "./components/Range";
import Fertilizer from "./components/Fertilizer";

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
  height: 100vh;
  background-color: #f4f4f4;
  width: 100%;
  font-family: 'Pretendard-Regular';
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


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
      <Header></Header>
      <Content>
        <TopContainer>
          <Graph></Graph>
          <Range></Range>
        </TopContainer>
        <Fertilizer/>
      </Content>
    </Container>
  );
};

export default DataStatistics;
