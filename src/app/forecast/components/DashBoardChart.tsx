import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DashboardChart = () => {
  // 상태 변수 설정
  const [labels, setLabels] = useState<string[]>([]);
  const [salesData, setSalesData] = useState<number[]>([]);
  const [forecastData, setForecastData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/price/getpredict?crop=Rice'); // 실제 API URL로 변경
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // 데이터 처리
        const fetchedLabels = data.predictions.map((pred: { date: string }) => pred.date);
        const fetchedForecastData = data.predictions.map((pred: { price: number }) => pred.price);
        const fetchedSalesData = fetchedForecastData.map(price => price * 0.8); // 예시로 판매 데이터를 예측 데이터의 80%로 설정
        
        setLabels(fetchedLabels);
        setForecastData(fetchedForecastData);
        setSalesData(fetchedSalesData);
      } catch (error) {
        setError('Failed to fetch data');
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 로딩 중이나 오류 발생 시 처리
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Forecast',
        data: forecastData,
        borderColor: 'rgba(53, 162, 235, 1)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false, // 레이블 생략을 비활성화하여 모든 레이블을 표시
          maxRotation: 45, // 레이블의 최대 회전 각도
          minRotation: 0,  // 레이블의 최소 회전 각도
        },
      },
      y: {
        ticks: {
          callback: (value: number) => `${value.toFixed(0)} 원`, // y축 값 형식화
        },
        
        min: 49000,  // y축의 최소값 설정
        max: 50000,  // y축의 최대값 설정
        suggestedMax: Math.max(...forecastData) * 1.2, 
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DashboardChart;
