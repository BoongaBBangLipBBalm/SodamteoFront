// components/Chart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

interface TimestampData {
  timestamp: number;
  diseaseName: string;
  confidence: string;
  message: string;
}

interface ChartProps {
  data: TimestampData[];
}

const TooltipContainer = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  pointer-events: none;
`;

const Chart: React.FC<ChartProps> = ({ data }) => {
  // Confidence 값을 숫자로 변환하는 함수
  const confidenceToNumber = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 3;
      case 'Medium':
        return 2;
      case 'Low':
        return 1;
      default:
        return 0;
    }
  };

  const chartData = {
    labels: data.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Confidence Level',
        data: data.map(item => confidenceToNumber(item.confidence)), // Confidence를 숫자로 변환
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const [tooltip, setTooltip] = React.useState<{ visible: boolean; x: number; y: number; content: string }>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false, // 기본 툴팁 비활성화
        external: (context: any) => {
          const { chart, tooltip } = context;

          if (tooltip.opacity === 0) {
            setTooltip(prev => ({ ...prev, visible: false }));
            return;
          }

          const position = chart.canvas.getBoundingClientRect();
          const x = position.left + tooltip.caretX;
          const y = position.top + tooltip.caretY;

          const content = data[tooltip.dataPoints[0].dataIndex];
          setTooltip({
            visible: true,
            x,
            y,
            content: `${content.diseaseName}\nConfidence: ${content.confidence}\nMessage: ${content.message}`,
          });
        },
      },
    },
    elements: {
      point: {
        radius: 5,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Confidence Level'
        },
        ticks: {
          stepSize: 1, // y축 스텝 크기 설정
          beginAtZero: true,
          suggestedMax: 3, // Confidence의 최대 값
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <Line data={chartData} options={options} />
      {tooltip.visible && (
        <TooltipContainer style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.content}
        </TooltipContainer>
      )}
    </div>
  );
};

export default Chart;
