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
import { getToken } from "@/utils/localStorage"; 

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
      min: 30, 
      max: 100,
      title: {
        display: false,
        text: 'Humidity (%)',
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.raw}%`;
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

const HumidityGraph: React.FC = () => {
  const [data, setData] = useState({
    labels: ["6 hour ago", "4 hour ago", "2 hour ago", "Now"],
    datasets: [
      {
        label: "Humidity",
        data: [60, 65, 70, 75], // Initial humidity values
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",  // Adjusted color for humidity
        borderColor: "purple",  
      },
    ],
  });

  const fetchHumidityData = async () => {
    const token = getToken(); // Fetch the token

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

        // Extract labels and humidity data
        const labels = currentData.map((entry: any, index: number) => `${8 - index * 2}시간 전`);
        labels[labels.length - 1] = "현재";  

        const humidities = currentData.map((entry: any) => entry.humidity); 

        setData({
          labels: labels,
          datasets: [
            {
              label: "습도",
              data: humidities,
              fill: true,
              backgroundColor: "rgba(153, 102, 255, 0.2)", 
              borderColor: "purple",
            },
          ],
        });
      } else {
        console.error("Failed to fetch humidity data");
      }
    } catch (error) {
      console.error("Error fetching humidity data:", error);
    }
  };

  useEffect(() => {
    fetchHumidityData(); 
  }, []);

  return (
    <Container>
      <Content>
        <ContentHeader>습도 상태</ContentHeader>
        <GraphContainer>
          <Line data={data} options={options} />
        </GraphContainer>
      </Content>
    </Container>
  );
};

export default HumidityGraph;
