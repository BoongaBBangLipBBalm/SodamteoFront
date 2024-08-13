"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ProfileImage from './components/profileImage';
import ProfileInfo from './components/profileDatas';


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

  // imgURL을 상태로 관리
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
    tempMinValue: tempMinValue,
    tempMaxValue: tempMaxValue,
    tempSetMinValue: tempSetMinValue,
    tempSetMaxValue: tempSetMaxValue,
    tempIsEnabled: tempIsEnabled,
    tempSetIsEnabled: tempSetIsEnabled,

    humidMinValue: humidMinValue,
    humidMaxValue: humidMaxValue,
    humidSetMinValue: humidSetMinValue,
    humidSetMaxValue: humidSetMaxValue,
    humidIsEnabled: humidIsEnabled,
    humidSetIsEnabled: humidSetIsEnabled,

    sunLightMinValue: sunLightMinValue,
    sunLightMaxValue: sunLightMaxValue,
    sunLightSetMinValue: sunLightSetMinValue,
    sunLightSetMaxValue: sunLightSetMaxValue,
    sunLightIsEnabled: sunLightIsEnabled,
    sunLightSetIsEnabled: sunLightSetIsEnabled,

    profileName: profileName,
    setProfileName: setProfileName
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/add');
  };

  return (
    <Container>
      {/* imgURL 상태를 ProfileImage 컴포넌트에 전달 */}
      <ProfileImage imgURL={imgURL} />

      {/* setImgURL 함수를 ProfileInfo 컴포넌트에 전달 */}
      <ProfileInfo selectedType={selectedType} setSelectedType = {setSelectedType} setImgURL={setImgURL} data={data}/>
    </Container>
  );
};

export default ProfileEdit;