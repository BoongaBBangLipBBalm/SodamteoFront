// page.tsx
"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ProfileImage from './components/profileImage';
import ProfileInfo from './components/profileDatas';
import axios from 'axios';

export interface IDataProps {
  tempMinValue: number;
  tempMaxValue: number;
  tempSetMinValue: (value: number) => void;
  tempSetMaxValue: (value: number) => void;
  tempIsEnabled: boolean;
  tempSetIsEnabled: (value: boolean) => void;
  
  humidMinValue: number;
  humidMaxValue: number;
  humidSetMinValue: (value: number) => void;
  humidSetMaxValue: (value: number) => void;
  humidIsEnabled: boolean;
  humidSetIsEnabled: (value: boolean) => void;

  sunLightMinValue: number;
  sunLightMaxValue: number;
  sunLightSetMinValue: (value: number) => void;
  sunLightSetMaxValue: (value: number) => void;
  sunLightIsEnabled: boolean;
  sunLightSetIsEnabled: (value: boolean) => void;

  profileName: string;
  setProfileName: (value: string) => void;
  
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #f4f4f4;
`;

const CustomForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const ProfileEdit: React.FC = () => {
  const router = useRouter();

  const [imgURL, setImgURL] = useState('');
  const [profileName, setProfileName] = useState('Test');
  const [selectedType, setSelectedType] = useState("Rice");

  const [tempMinValue, tempSetMinValue] = useState(10);
  const [tempMaxValue, tempSetMaxValue] = useState(20);
  const [tempIsEnabled, tempSetIsEnabled] = useState(true);

  const [humidMinValue, humidSetMinValue] = useState(40);
  const [humidMaxValue, humidSetMaxValue] = useState(60);
  const [humidIsEnabled, humidSetIsEnabled] = useState(true);

  const [sunLightMinValue, sunLightSetMinValue] = useState(700);
  const [sunLightMaxValue, sunLightSetMaxValue] = useState(9000);
  const [sunLightIsEnabled, sunLightSetIsEnabled] = useState(true);

  const data: IDataProps = {
    tempMinValue,
    tempMaxValue,
    tempSetMinValue,
    tempSetMaxValue,
    tempIsEnabled,
    tempSetIsEnabled,
    humidMinValue,
    humidMaxValue,
    humidSetMinValue,
    humidSetMaxValue,
    humidIsEnabled,
    humidSetIsEnabled,
    sunLightMinValue,
    sunLightMaxValue,
    sunLightSetMinValue,
    sunLightSetMaxValue,
    sunLightIsEnabled,
    sunLightSetIsEnabled,
    profileName,
    setProfileName,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create an array of enabled devices
    const devices: string[] = [];
    if (tempIsEnabled) devices.push('Temperature');
    if (humidIsEnabled) devices.push('Humidity');
    if (sunLightIsEnabled) devices.push('SunLight');

    try {
      const response = await fetch('/api/farm/createfarm', {
        method: 'POST',
        body: JSON.stringify({
          farmName: profileName,
          cropName: selectedType,
          devices,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }
    } catch (error) {
      console.error('Failed to create farm:', error);
    }
  };

  return (
    <Container>
      <CustomForm onSubmit={handleSubmit}>
        <ProfileImage imgURL={imgURL} />
        <ProfileInfo 
          selectedType={selectedType} 
          setSelectedType={setSelectedType} 
          setImgURL={setImgURL} 
          data={data} 
        />
      </CustomForm>
    </Container>
  );
};

export default ProfileEdit;
