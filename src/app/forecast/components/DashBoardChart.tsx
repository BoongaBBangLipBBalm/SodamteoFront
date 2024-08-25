import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
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

const SelectButton = styled.button<{ $show: boolean }>`
  width: 90px;
  padding: 10px;
  margin-right: 20px;
  font-size: 15px;
  line-height: 14px;
  background-color: white;
  border: 1px solid #274C4B;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
  position: relative;
  transition: border-color 0.3s, outline 0.3s;

  &:hover,
  &:focus {
    border: 1px solid #274C4B;
    outline: 2px solid #749F73;
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-40%) rotate(0deg);
    border: 5px solid transparent;
    border-top-color: #274C4B;
    transition: transform 0.3s;
  }

  ${({ $show }) =>
    $show &&
    `
    &::after {
      transform: translateY(-80%) rotate(180deg);
    }
  `}
`;

const SelectList = styled.ul<{ $show: boolean }>`
  list-style-type: none;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  position: absolute;
  width: 90px;
  top: 117px;
  right: 120px;
  margin-right: 10px;
  padding: 0;
  border: 1px solid #274C4B;
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
  z-index: 1000;
  max-height: 130px;
  overflow-y: auto;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 7px 10px;
  border: none;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  color: black;

  &:hover,
  &:focus {
    background-color: #F8F7F6;
  }
`;

const OptionList = styled.li`
  padding: 3px 5px;
  margin: 0 3px;
  color: black;
`;

const PredictButton = styled.button<{ $show: boolean }>`
  width: 90px;
  padding: 11px;
  font-size: 15px;
  line-height: 14px;
  background-color: #274C4B;
  border: none;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  color: white;
  position: relative;
  transition: border-color 0.3s, outline 0.3s;

  &:hover,
  &:focus {
    border: 1px solid #274C4B;
    outline: 2px solid #749F73;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400vh; /* Adjust height as needed */
`;

const DataContainer = styled.div`
  margin-top: 20px;
`;

const DataSection = styled.div`
  margin-bottom: 20px;
`;

const DataTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
`;

const DataList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DataItem = styled.li`
  margin-bottom: 5px;
  font-size: 14px;
`;

const DashboardChart = () => {
  const [crop, setCrop] = useState<string>('Rice');
  const [salesLabels, setSalesLabels] = useState<string[]>([]);
  const [forecastLabels, setForecastLabels] = useState<string[]>([]);
  const [salesData, setSalesData] = useState<number[]>([]);
  const [forecastData, setForecastData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const fetchData = async (selectedCrop: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/price/getpredict?crop=${selectedCrop}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const fetchedSalesData = data.recent_data.map((item: { date: string; price: number }) => ({
        date: new Date(item.date),
        price: item.price,
      }));

      const fetchedForecastData = data.predictions.map((pred: { date: string; price: number }) => ({
        date: new Date(pred.date),
        price: pred.price,
      }));

      const recentLabels = fetchedSalesData.map(item => formatDate(item.date)); 
      const forecastLabels = fetchedForecastData.map(item => formatDate(item.date)); 

      const salesData = fetchedSalesData.map(item => item.price);
      const forecastData = fetchedForecastData.map(item => item.price);

      setSalesLabels(recentLabels);
      setForecastLabels(forecastLabels);
      setSalesData(salesData);
      setForecastData(forecastData);
    } catch (error) {
      setError('Failed to fetch data');
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const handlePredictClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const predictResponse = await fetch(`/api/price/predict-price`, {
        method: 'GET',
      });

      if (!predictResponse.ok) {
        throw new Error('Failed to predict price');
      }

      const predictData = await predictResponse.json();
      if (predictData.status !== 'success') {
        throw new Error('Model training or prediction failed');
      }

      fetchData(crop);
    } catch (error) {
      setError('Failed to predict price');
      console.error("Error in prediction:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(crop);
  }, [crop]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleSelectClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleOptionClick = (selectedCrop: string) => {
    setCrop(selectedCrop);
    setShowOptions(false);
  };

  const data = {
    labels: [...salesLabels, ...forecastLabels],
    datasets: [
      {
        label: '판매 가격',
        data: salesData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: '예측 가격',
        data: Array(salesData.length).fill(null).concat(forecastData), 
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
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        ticks: {
          callback: (value: number) => `${value.toFixed(0)} 원`,
        },
        min: Math.min(...salesData) * 0.85,
        max: Math.max(...forecastData.length > 0 ? forecastData : salesData) * 1.15,
      },
    },
  };

  return (
    <div>
      <Container>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SelectButton onClick={handleSelectClick} $show={showOptions}>
            {crop}
          </SelectButton>
          <SelectList $show={showOptions}>
            <OptionList>
              <OptionButton onClick={() => handleOptionClick('Rice')}>Rice</OptionButton>
            </OptionList>
          </SelectList>
        </div>
        
        <PredictButton onClick={handlePredictClick} $show={false}>
          예측하기
        </PredictButton>
      </Container>

      <ChartContainer>
        <Line data={data} options={options} />
      </ChartContainer>

      <DataContainer>
        <DataSection>
          <DataTitle>Recent Sales Data</DataTitle>
          <DataList>
            {salesData.map((price, index) => (
              <DataItem key={index}>
                {salesLabels[index]}: {price.toLocaleString()} 원
              </DataItem>
            ))}
          </DataList>
        </DataSection>
        
        <DataSection>
          <DataTitle>Forecast Data</DataTitle>
          <DataList>
            {forecastData.map((price, index) => (
              <DataItem key={index}>
                {forecastLabels[index]}: {price.toLocaleString()} 원
              </DataItem>
            ))}
          </DataList>
        </DataSection>
      </DataContainer>
    </div>
  );
};

export default DashboardChart;