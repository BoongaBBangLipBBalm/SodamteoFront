"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ProfileImage from './components/profileImage';
import ProfileInfo from './components/profileDatas';
import { getToken } from '@/utils/localStorage';

export interface IDataProps {
  profileName: string;
  setProfileName: (value: string) => void;

  airconditionerIsEnabled: boolean;
  setAirconditionerIsEnabled: (value: boolean) => void;
  
  humidifierIsEnabled: boolean;
  setHumidifierIsEnabled: (value: boolean) => void;
  
  blindIsEnabled: boolean;
  setBlindIsEnabled: (value: boolean) => void;
  
  fertilizerIsEnabled: boolean;
  setFertilizerIsEnabled: (value: boolean) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #f4f4f4;
`;

const CustomForm = styled.div`
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

  const [airconditionerIsEnabled, setAirconditionerIsEnabled] = useState(true);
  const [humidifierIsEnabled, setHumidifierIsEnabled] = useState(true);
  const [blindIsEnabled, setBlindIsEnabled] = useState(true);
  const [fertilizerIsEnabled, setFertilizerIsEnabled] = useState(true);

  const data: IDataProps = {
    profileName,
    setProfileName,
    airconditionerIsEnabled,
    setAirconditionerIsEnabled,
    humidifierIsEnabled,
    setHumidifierIsEnabled,
    blindIsEnabled,
    setBlindIsEnabled,
    fertilizerIsEnabled,
    setFertilizerIsEnabled,
  };

  const handleSubmit = async () => {

    // Create an array of enabled devices
    const devices: string[] = [];
    if (airconditionerIsEnabled) devices.push('Airconditioner');
    if (humidifierIsEnabled) devices.push('Humidifier');
    if (blindIsEnabled) devices.push('Blind');
    if (fertilizerIsEnabled) devices.push('Fertilizer');

    const sendData = JSON.stringify({
      "farmName": profileName,
      "cropName": selectedType,
      "devices": devices.join(','),
    });

    try {
      
      const response = await fetch('/api/farm/createfarm', {
        method: 'POST',
        headers: {
          'Authorization': `${getToken()}`, // Assuming you have token from context or props
          'Content-Type': 'application/json',
        },
        body: sendData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create farm.');
      }

      router.push('/profile/select');

    } catch (error) {
      console.error('Failed to create farm:', error);
    }
  };

  return (
    <Container>
      <CustomForm>
        <ProfileImage imgURL={imgURL} />
        <ProfileInfo 
          selectedType={selectedType} 
          setSelectedType={setSelectedType} 
          setImgURL={setImgURL} 
          data={data}
          submitFunc={handleSubmit}
        />
      </CustomForm>
    </Container>
  );
};

export default ProfileEdit;
