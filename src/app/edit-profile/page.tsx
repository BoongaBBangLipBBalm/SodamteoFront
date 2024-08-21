"use client"

import React, { use, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ProfileImage from './components/profileImage';
import ProfileInfo from './components/profileDatas';
import { getRequest } from '@/utils/api';
import { getRefreshToken } from '@/utils/localStorage';
import axios from 'axios';


export interface IDataProps {

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

  const [farmName, setFarmName] = useState<string>("No Name");

  const handleDone = async () => {
    try {
      const response = await axios.patch('/api/farm/updatefarm',{ // TODO : 이거 고쳐야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          newFarmName: farmName, // Sending the updated farm name
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Sending the current token
          },
        }
      );
  
      // Check if the PATCH request was successful
      if (response.status === 200) {
        const { farmID, farmName, cropName, userID } = response.data;
  
        // Log the farm update information
        console.log('Farm updated successfully:', { farmID, farmName, cropName, userID });

        const newAccessToken = getRefreshToken();
        if(newAccessToken !== null) {
          localStorage.setItem('access_token', newAccessToken);
          console.log('New access token received and stored.');
        }
  
        router.push('/data-statistics/temperature'); // Example redirect to a success page
      }
    } catch (error) {
      console.error('Failed to update farm or receive new token:', error);
  
      // Handle error scenarios, such as displaying an error message to the user
    }
  };
  
  

  const data: IDataProps = {
    profileName: profileName,
    setProfileName: setProfileName
  }

  useEffect(() => {
    const farmID = Number(localStorage.getItem("farmID"));
    const getFarmData = async () => {
      try {
        const response = await getRequest(`/api/farm/getfarm?farmID=${farmID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`, // 토큰이 localStorage에 저장되어 있다고 가정
            },
        });
        setFarmName(response.farmName);
      } catch (error) {
          console.error("농장 데이터를 가져오는데 실패했습니다:", error);
      }
    }

    getFarmData();

  }, []);

  return (
    <Container>
      {/* imgURL 상태를 ProfileImage 컴포넌트에 전달 */}
      <ProfileImage imgURL={imgURL} />

      {/* setImgURL 함수를 ProfileInfo 컴포넌트에 전달 */}
      <ProfileInfo selectedType={selectedType} setSelectedType = {setSelectedType} setImgURL={setImgURL} data={data} handleDone={handleDone}/>
    </Container>
  );
};

export default ProfileEdit;