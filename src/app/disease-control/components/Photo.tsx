import React, { useState } from 'react';
import styled from 'styled-components';

interface PhotoProps {
  src: string;
  timestamp: string;
  onDelete: () => void;
}

export interface IPhoto {
  diseaseID: number;
  src: string;
  disease: string;
  timestamp: string;
  confidence: number;
}

const PhotoWrapper = styled.div`
  position: relative;
  width: 15rem; /* 240px / 16 = 15rem */
  transform: translate(0, -50%);
`;

const PhotoImage = styled.img`
  width: 100%;
`;

const PhotoContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1.25rem; /* 20px / 16 = 1.25rem */
  background-color: #F8F7F6;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 0.125rem 0.5rem rgba(0,0,0,0.15)); /* 2px / 16 = 0.125rem, 8px / 16 = 0.5rem */
  position: relative;
`;

const DeleteButton = styled.button<{ visible: boolean }>`
  font-family: 'Pretendard-Regular';
  position: absolute;
  top: 0.625rem; /* 10px / 16 = 0.625rem */
  right: 0.625rem; /* 10px / 16 = 0.625rem */
  background-color: rgba(255, 78, 78, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.25rem; /* 20px / 16 = 1.25rem */
  height: 1.25rem; /* 20px / 16 = 1.25rem */
  font-size: 0.625rem; /* 10px / 16 = 0.625rem */
  cursor: pointer;
  display: ${({ visible }: { visible: boolean }) => (visible ? 'block' : 'none')};
`;

const Photo: React.FC<PhotoProps> = ({ src, timestamp, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PhotoWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PhotoContainer>
        <PhotoImage src={src} alt={timestamp} />
        <DeleteButton visible={isHovered} onClick={onDelete}>X</DeleteButton>
      </PhotoContainer>
    </PhotoWrapper>
  );
};

export default Photo;
