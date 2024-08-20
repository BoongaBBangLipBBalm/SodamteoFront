"use client"

import React from 'react';
import styled from 'styled-components';
import DashboardChart from './components/DashBoardChart';
import StatCard from './components/StatCard';

const Container = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Forecast = () => {
  return (
    <Container>
      <Title>시가 예측</Title>
      <DashboardChart />
    </Container>
  );
};

export default Forecast;
