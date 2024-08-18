import React from 'react';
import styled from 'styled-components';

interface PhotoProps {
  src: string;
  title: string;
  description: string;
}

const PhotoWrapper = styled.div`
  position: relative;
`;

const PhotoImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const PhotoInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 0 0 10px 10px;
`;

const PhotoContainer = styled.div`
  &:hover ${PhotoInfo} {
    opacity: 1;
  }
`;

const Photo: React.FC<PhotoProps> = ({ src, title, description }) => {
  return (
    <PhotoWrapper>
      <PhotoContainer>
        <PhotoImage src={src} alt={title} />
        <PhotoInfo>
          <h4>{title}</h4>
          <p>{description}</p>
        </PhotoInfo>
      </PhotoContainer>
    </PhotoWrapper>
  );
};

export default Photo;
