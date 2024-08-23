"use client";

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation';
import Album from './components/Album';
import { GlobalStyle } from './components/globalStyles';
import { theme } from './components/theme';
import { GetLayoutWidthRatio } from '@/components/nav/nav';
import { IPhoto } from './components/Photo';
import AddPhotoButton from './components/AddPhotoButton';
import PhotoAddButton from './components/AddPhotoButton';
import { deleteRequest, getRequest } from '@/utils/api';
import { getToken } from '@/utils/localStorage';

const Container = styled.div`
  padding: 0 1.25rem;
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
  margin-top: 1.25rem;
`;

const InfoPanel = styled.div`
  margin: 0 1.25rem;
  color: white;
  border-radius: 0.625rem;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  font-family: 'Pretendard-Bold';
  font-size: 1.2rem;
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

const categories = ['All', 'Diseases', 'Normal'];

const filterPhotos = (category: string, photos: IPhoto[]) => {
  if (category === 'All') return photos;
  if (category === 'Diseases') return photos.filter(photo => photo.disease !== 'Normal');
  if (category === 'Normal') return photos.filter(photo => photo.disease === 'Normal');
  return photos;
};

const DiseaseControl: React.FC = () => {
  const [allPhotos, setAllPhotos] = useState<IPhoto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [photoIndexToDelete, setPhotoIndexToDelete] = useState<number | null>(null);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const token = getToken();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await getRequest('/api/disease/get_farm_disease');

        const tempPhotoData = GetIPhotoDataByGET(response);
        setAllPhotos(tempPhotoData);
        setFilteredPhotos(tempPhotoData);
        setSelectedPhoto(tempPhotoData[0] || null);

      } catch (error) {
        console.error('Error fetching photos:', error);
        const nullPhoto: IPhoto[] = [
          {
            confidence: 0, 
            disease: "No Data",
            diseaseID: -1,
            src: "", 
            timestamp: "No data"
          },
          {
            confidence: 0, 
            disease: "No Data",
            diseaseID: -1,
            src: "", 
            timestamp: "No data"
          },
          {
            confidence: 0, 
            disease: "No Data",
            diseaseID: -1,
            src: "", 
            timestamp: "No data"
          }
        ];
        setAllPhotos(nullPhoto);
        setFilteredPhotos(nullPhoto);
        setSelectedPhoto(nullPhoto[0] || null);
      }
    };

    fetchPhotos();
  }, []);

  const handleDeletePhoto = (index: number) => {
    setIsPopupVisible(true);
    setPhotoIndexToDelete(index);
  };

  const confirmDeletePhoto = async () => {
    if (photoIndexToDelete !== null) {
      try {
        
        const photoToDelete = filteredPhotos[photoIndexToDelete];
        await fetch('/api/disease/delete_disease_log', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ diseaseID: photoToDelete.diseaseID }),
        });

        const updatedPhotos = filteredPhotos.filter((_, i) => i !== photoIndexToDelete);
        const updatedAllPhotos = allPhotos.filter(photo => updatedPhotos.includes(photo));
        
        setAllPhotos(updatedAllPhotos);
        setFilteredPhotos(updatedPhotos);
        setSelectedPhoto(updatedPhotos[0] || null);
        setIsPopupVisible(false);
        setPhotoIndexToDelete(null);
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
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

  const GetIPhotoDataByGET = (data: any): IPhoto[] => {
    let tempPhoto: IPhoto[] = [];
    for(var i = 0 ; i < data.length ; i++) {

      const newPhoto: IPhoto = {
        confidence: data[i].confidence, 
        disease: data[i].disease,
        diseaseID: data[i].id,
        src: data[i].image, 
        timestamp: data[i].timestamp
      };
      tempPhoto.push(newPhoto);
    }
    console.log(tempPhoto); // test code
    return tempPhoto;
    
  }

  const handleAddPhoto = async (file: File | null) => {
    if (file) {
      try {
        // 이미지 업로드
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            const postData = JSON.stringify({image: base64Image});
            const response = await fetch('/api/disease/detect_disease', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
              },
              body: postData,
            });
    
            if (!response.ok) {
              throw new Error('Failed to upload photo');
            }
    
            // 업로드 후 최신 사진 데이터를 다시 가져옴
            const getResponse = await getRequest('/api/disease/get_farm_disease');

            const tempData = GetIPhotoDataByGET(getResponse);
            setSelectedCategory('All');
            setAllPhotos(tempData);
            setFilteredPhotos(tempData);
        }

        // POST 요청
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
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
                <TitleBox>질병 이름</TitleBox>
                <ContentBox>{selectedPhoto.disease}</ContentBox>
              </TextBox>
              <TextBox>
                <TitleBox>신뢰도</TitleBox>
                <ContentBox>{selectedPhoto.confidence}</ContentBox>
              </TextBox>
              <TextBox>
                <TitleBox>시간</TitleBox>
                <ContentBox>{selectedPhoto.timestamp}</ContentBox>
              </TextBox>
            </InfoPanel>
          )}
        </ContentWrapper>

        <PhotoAddButton onAddPhoto={handleAddPhoto} /> {/* Updated to handle file input */}

      </Container>
    </ThemeProvider>
  );
};

export default DiseaseControl;
