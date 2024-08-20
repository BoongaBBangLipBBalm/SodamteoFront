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
import { getToken } from "@/utils/localStorage"; // Import token fetching utility

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
        data: [20, 21, 19, 22], // Initial mock values for N
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "P",
        data: [15, 14, 16, 13], // Initial mock values for P
        fill: false,
        backgroundColor: "rgba(192,75,75,0.2)",
        borderColor: "rgba(192,75,75,1)",
      },
      {
        label: "K",
        data: [10, 12, 9, 11], // Initial mock values for K
        fill: false,
        backgroundColor: "rgba(75,75,192,0.2)",
        borderColor: "rgba(75,75,192,1)",
      },
      {
        label: "pH",
        data: [7, 6.8, 7.2, 6.9], // Initial mock values for pH
        fill: false,
        backgroundColor: "rgba(75,192,75,0.2)",
        borderColor: "rgba(75,192,75,1)",
      },
    ],
  });

  const fetchData = async () => {
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

        // Extract values for N, P, K, and pH from the API data
        const labels = currentData.map((entry: any, index: number) => `${6 - index * 2} hours ago`);
        labels[labels.length - 1] = "Now";  // Set the last label as "Now"

        const nValues = currentData.map((entry: any) => entry.N);
        const pValues = currentData.map((entry: any) => entry.P);
        const kValues = currentData.map((entry: any) => entry.K);
        const phValues = currentData.map((entry: any) => entry.ph);

        // Update the graph with the fetched data
        setData({
          labels: labels,
          datasets: [
            {
              label: "N",
              data: nValues,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "P",
              data: pValues,
              fill: false,
              backgroundColor: "rgba(192,75,75,0.2)",
              borderColor: "rgba(192,75,75,1)",
            },
            {
              label: "K",
              data: kValues,
              fill: false,
              backgroundColor: "rgba(75,75,192,0.2)",
              borderColor: "rgba(75,75,192,1)",
            },
            {
              label: "pH",
              data: phValues,
              fill: false,
              backgroundColor: "rgba(75,192,75,0.2)",
              borderColor: "rgba(75,192,75,1)",
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
    fetchData(); // Fetch the data when the component mounts
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
