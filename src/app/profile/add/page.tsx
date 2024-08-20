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

const ProfileEdit: React.FC = () => {
  const router = useRouter();

  const [imgURL, setImgURL] = useState('');
  const [profileName, setProfileName] = useState('Test');
  const [selectedType, setSelectedType] = useState("벼");

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

    const requestPayload = {
      farmName: profileName,
      cropName: selectedType,
      devices,
    };

    try {
      await axios.post('/farm/createfarm', requestPayload);
      router.push('/add');
    } catch (error) {
      console.error('Failed to create farm:', error);
      // Handle error (e.g., show notification or alert)
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <ProfileImage imgURL={imgURL} />
        <ProfileInfo 
          selectedType={selectedType} 
          setSelectedType={setSelectedType} 
          setImgURL={setImgURL} 
          data={data} 
        />
        <button type="submit">Save Farm</button>
      </form>
    </Container>
  );
};

export default ProfileEdit;
