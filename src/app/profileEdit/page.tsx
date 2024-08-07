"use client"

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ProfileImage from './components/profileImage';
import ProfileInfo from './components/profileInfo';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #f4f4f4;
`;

const ProfileEdit: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/profile-edit');
  };

  return (
    <Container>
        <ProfileImage imgURL='img/nav/profile.svg'></ProfileImage>
        <ProfileInfo></ProfileInfo>
    </Container>
  );
};

export default ProfileEdit;
