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
import { getToken } from "@/utils/localStorage"; // 토큰 가져오는 함수 임포트

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
      },
    },
    y: {
      min: 10,
      max: 40,
      title: {
        display: false,
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
      hitRadius: 10,
    },
  },
};

const Graph: React.FC = () => {
  const [data, setData] = useState({
    labels: ["6 hours ago", "4 hours ago", "2 hours ago", "Now"],
    datasets: [
      {
        label: "Temperature",
        data: [20, 28, 25, 29], // 초기값
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "gray",
      },
    ],
  });

  const fetchData = async () => {
    const token = getToken(); 
    try {
      const response = await fetch("/api/environment/current_environment", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const currentData = responseData.Current;
        const labels = currentData.map((entry: any, index: number) => `${6 - index * 2} hours ago`);
        labels[labels.length - 1] = "Now"; 

        const temperatures = currentData.map((entry: any) => entry.temperature);

        setData({
          labels: labels,
          datasets: [
            {
              label: "Temperature",
              data: temperatures,
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "gray",
            },
          ],
        });
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
