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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Container = styled.div`
  width: 100%; 
  height: 60vh; 
  display: flex;
  background-color: #f8f7f6;
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
      title: {
        display: false,
        text: 'Values',
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  elements: {
    point: {
      radius: 8,
      hitRadius: 10,
    },
  },
};

const Graph: React.FC = () => {
  const [data, setData] = useState({
    labels: ["6 hours ago", "4 hours ago", "2 hours ago", "Now"],
    datasets: [
      {
        label: "N",
        data: [20, 21, 19, 22],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "P",
        data: [15, 14, 16, 13],
        fill: false,
        backgroundColor: "rgba(192,75,75,0.2)",
        borderColor: "rgba(192,75,75,1)",
      },
      {
        label: "K",
        data: [10, 12, 9, 11],
        fill: false,
        backgroundColor: "rgba(75,75,192,0.2)",
        borderColor: "rgba(75,75,192,1)",
      },
      {
        label: "pH",
        data: [7, 6.8, 7.2, 6.9],
        fill: false,
        backgroundColor: "rgba(75,192,75,0.2)",
        borderColor: "rgba(75,192,75,1)",
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
