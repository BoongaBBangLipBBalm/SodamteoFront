"use client";

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation';
import Album from './components/Album';
import { GlobalStyle } from './components/globalStyles';
import { theme } from './components/theme';
import { GetLayoutWidthRatio } from '@/components/nav/nav';
import { IPhoto } from './components/Photo';

const Container = styled.div`
  padding: 0 1.25rem; /* 20px */
  width: ${(1-GetLayoutWidthRatio())*100 + "%"};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1.25rem; /* 20px */

  @media (max-width: 768px) {
    
  }
`;

const InfoPanel = styled.div`
  margin: 0 1.25rem; /* 20px */
  color: white;
  border-radius: 0.625rem; /* 10px */
  width: 50%; /* 300px */

  @media (max-width: 768px) {
    
  }
`;

const TextBox = styled.div`
  width: 80%;
  flex-grow: 1;
  background-color: #F8F7F6;
  border-radius: 10px;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.25));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitleBox = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 1rem;
  color: #2e2e2e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 1rem;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const PhotoTimeStamp = styled.h3`
  margin-top: 0;
`;

const PhotoConfidence = styled.h4`
  margin-top: 0;
`;

const allPhotos: {[type: string]: IPhoto[]} = {
  All: [
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1 },
    { src:  '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
  ],
  Diseases: [
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
  ],
  Normal: [
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
    { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1  },
  ],
};

const categories = Object.keys(allPhotos);

const DiseaseControl: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedPhoto, setSelectedPhoto] = useState(allPhotos[selectedCategory][0]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Navigation
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setSelectedPhoto(allPhotos[category][0]); // 카테고리 변경 시 첫 번째 사진 선택
          }}
        />
        <ContentWrapper>
          <Album photos={allPhotos[selectedCategory]} onPhotoSelect={setSelectedPhoto} />
          <InfoPanel>
            <TextBox>
              <TitleBox>Disease</TitleBox>
              <ContentBox>{selectedPhoto.disease}</ContentBox>
            </TextBox>
            <TextBox>
              <TitleBox>Confidence</TitleBox>
              <ContentBox>{selectedPhoto.confidence}</ContentBox>
            </TextBox>
            <TextBox>
              <TitleBox>TimeStamp</TitleBox>
              <ContentBox>{selectedPhoto.timestamp}</ContentBox>
            </TextBox>
          </InfoPanel>
        </ContentWrapper>
      </Container>
    </ThemeProvider>
  );
};

export default DiseaseControl;