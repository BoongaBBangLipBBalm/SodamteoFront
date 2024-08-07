"use client";

import React, { useState, useEffect } from "react";
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
import { start } from "repl";
import { color } from "chart.js/helpers";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Container = styled.div`
  width: 100%; 
  height: 60vh; 
  display: flex;
  background-color: #F8F7F6;
  border-radius: 20px;
  padding: 10px;
  margin: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);  
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const ContentHeader = styled.h2`
  margin-bottom: 20px;
  font-weight: 500;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 50vh;
  padding: 0 0 20px 30px;
`;

const options = {
  scales: {
    x: {
      title: {
        display: false,
        text: 'Hour',
      },
    },
    y: {
      min: 10,
      max: 40,
      title: {
        display: false,
        text: 'Temperature (°C)',
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.raw}°C`;
        },
      },
    },
  },
  elements: {
    point: {
      radius: 8,
      hitRadius: 10
    },
  },
};

const Graph: React.FC = () => {
  const [data, setData] = useState({
    labels: ["6 hour ago", "4 hour ago", "2 hour ago", "Now", ""],
    datasets: [
      {
        label: "Temperature",
        data: [20, 28, 25, 29],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "gray",
      },
    ],
  });

  return (
    <Container>
      <Content>
        <ContentHeader>Graph</ContentHeader>
        <GraphContainer>
          <Line data={data} options={options} />
        </GraphContainer>
      </Content>
    </Container>
  );
};

export default Graph;
