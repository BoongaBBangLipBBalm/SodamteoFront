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
  width: ${(1-GetLayoutWidthRatio())*100}%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    
  }
`;

const TextBox = styled.div`
  width: 20rem;
  height: 5rem;
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

const initialPhotos: IPhoto[] = [
  { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1 },
  { src: '/img/profile/grains/rice.svg', disease: 'Normal', timestamp: '2024/08/19', confidence: 0.1 },
  { src: '/img/profile/grains/rice.svg', disease: 'Bacterialblight', timestamp: '2024/08/19', confidence: 0.1 },
  { src: '/img/profile/grains/rice.svg', disease: 'Normal', timestamp: '2024/08/19', confidence: 0.1 },
];

const categories = ['All', 'Diseases', 'Normal'];

const filterPhotos = (category: string, photos: IPhoto[]) => {
  if (category === 'All') return photos;
  if (category === 'Diseases') return photos.filter(photo => photo.disease !== 'Normal');
  if (category === 'Normal') return photos.filter(photo => photo.disease === 'Normal');
  return photos;
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const PopupContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  & > p {
    margin-bottom: 1rem;
  }
`;

const PopupButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0 0.5rem;
  font-size: 1rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const DiseaseControl: React.FC = () => {
  const [allPhotos, setAllPhotos] = useState<IPhoto[]>(initialPhotos);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filteredPhotos, setFilteredPhotos] = useState(filterPhotos(categories[0], allPhotos));
  const [selectedPhoto, setSelectedPhoto] = useState(filteredPhotos[0]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [photoIndexToDelete, setPhotoIndexToDelete] = useState<number | null>(null);

  const handleDeletePhoto = (index: number) => {
    setIsPopupVisible(true);
    setPhotoIndexToDelete(index);
  };

  const confirmDeletePhoto = () => {
    if (photoIndexToDelete !== null) {
      const updatedPhotos = filteredPhotos.filter((_, i) => i !== photoIndexToDelete);
      const updatedAllPhotos = allPhotos.filter(photo => updatedPhotos.includes(photo));
      
      setAllPhotos(updatedAllPhotos);
      setFilteredPhotos(updatedPhotos);
      setSelectedPhoto(updatedPhotos[0] || null);
      setIsPopupVisible(false);
      setPhotoIndexToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsPopupVisible(false);
    setPhotoIndexToDelete(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const updatedPhotos = filterPhotos(category, allPhotos);
    setFilteredPhotos(updatedPhotos);
    setSelectedPhoto(updatedPhotos[0] || null);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        {isPopupVisible && (
          <PopupOverlay>
            <PopupContainer>
              <p>이 데이터를 삭제하시겠습니까?</p>
              <div>
                <PopupButton onClick={confirmDeletePhoto}>삭제</PopupButton>
                <PopupButton onClick={cancelDelete}>취소</PopupButton>
              </div>
            </PopupContainer>
          </PopupOverlay>
        )}
        <Navigation
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <ContentWrapper>
          <Album
            selectedCategory={selectedCategory}
            photos={filteredPhotos}
            onPhotoSelect={setSelectedPhoto}
            onDeletePhoto={handleDeletePhoto}
          />
          {selectedPhoto && (
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
          )}
        </ContentWrapper>
      </Container>
    </ThemeProvider>
  );
};

export default DiseaseControl;
