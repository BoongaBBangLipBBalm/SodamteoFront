"use client"

import React from 'react';
import styled from 'styled-components';
import DashboardChart from './components/DashBoardChart';

const Container = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Pretendard-Regular';
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  padding: 5px;
`;

const Forecast = () => {
  return (
    <Container>
      <Title>작물 시가 예측</Title>
      <DashboardChart />
    </Container>
  );
};

export default Forecast;
