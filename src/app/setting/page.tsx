"use client";

import React from 'react';
import styled from 'styled-components';
import Button from './components/Button'; // Button 컴포넌트 import

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1.25rem; /* 20px */
`;

const Title = styled.h1`
  font-size: 1.5rem; /* 24px */
  margin-bottom: 1.25rem; /* 20px */
  color: black;
`;

const AccountSection = styled.div`
  margin-top: 2.5rem; /* 40px */
`;

const SettingPage: React.FC = () => {
  return (
    <Container>
      <Title>설정</Title>
      <AccountSection>
        <Title>계정</Title>
        <Button onClick={() => alert('계정 탈퇴 버튼 클릭!')}>계정 탈퇴</Button>
      </AccountSection>
    </Container>
  );
};

export default SettingPage;