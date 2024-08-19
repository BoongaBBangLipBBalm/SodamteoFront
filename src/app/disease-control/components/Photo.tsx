import React from 'react';
import styled from 'styled-components';

interface PhotoProps {
  src: string;
  timestamp: string;
}

export interface IPhoto {
  src: string;
  disease: string;
  timestamp: string;
  confidence: number;
}

const PhotoWrapper = styled.div`
  position: relative;
  width: 240px;
  transform: translate(0, -50%);
`;

const PhotoImage = styled.img`
  width: 100%;
`;
const PhotoContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  background-color: #F8F7F6;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15));
`;

const Photo: React.FC<PhotoProps> = ({ src, timestamp }) => {
  return (
    <PhotoWrapper>
      <PhotoContainer>
        <PhotoImage src={src} alt={timestamp} />
      </PhotoContainer>
    </PhotoWrapper>
  );
};

export default Photo;
