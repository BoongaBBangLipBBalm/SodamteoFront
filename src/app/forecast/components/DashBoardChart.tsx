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

const DashboardChart = () => {
  const [crop, setCrop] = useState<string>('Rice');
  const [labels, setLabels] = useState<string[]>([]);
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

      const fetchedLabels = data.predictions.map((pred: { date: string }) => pred.date);
      const fetchedForecastData = data.predictions.map((pred: { price: number }) => pred.price);
      const fetchedSalesData = data.recent_data.map((item: { price: number }) => item.price);

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
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        ticks: {
          callback: (value: number) => `${value.toFixed(0)} 원`,
        },
        min: Math.min(...salesData) * 0.98,
        max: Math.max(...forecastData.length > 0 ? forecastData : salesData) * 1.02,
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
            <OptionList>
              <OptionButton onClick={() => handleOptionClick('Wheat')}>Wheat</OptionButton>
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
    </div>
  );
};

export default DashboardChart;
