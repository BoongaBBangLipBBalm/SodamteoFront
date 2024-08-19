import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Photo from './Photo';
import { IPhoto } from './Photo';

interface AlbumProps {
  photos: IPhoto[];
  onPhotoSelect: (photo: IPhoto) => void;
}

const AlbumContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  
`;

const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  justify-content: center;

  .slick-list { 
    position: relative;
    top: 50%;
  }

  .slick-track {
    position: relative;
    height: 100%;
  }

  .slick-slide {
    position: relative;
    height: auto; /* 슬라이드의 높이를 자동으로 설정 */
  }

  @media (max-width: 768px) {
    
  }
`;


const SliderPrevButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    top: 1rem;
    z-index: 3;
    left: 50%;
    transform: translate(-50%, 0%);
`;
const SliderNextButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    bottom: 1rem;
    z-index: 3;
    left: 50%;
    transform: translate(-50%, 0%);
`;

const SliderButtonDiv = styled.div`
    background-color: rgb(255, 255, 255);
    filter: drop-shadow(1px 1px 10px rgba(0,0,0,0.25));
    border-radius: 100%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
        width: 1.125rem;
        height: 1.125rem;
    }
`;

const Album: React.FC<AlbumProps> = ({ photos, onPhotoSelect }) => {

  const [initialSlideIdx, setInitialSlide] = useState<number>(photos.length - 1);

  const settings = {
    speed: 300,
    arrows: true,
    draggable: false,
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 1, // 현재 슬라이드를 가운데에 배치하기 위해 홀수로 설정
    centerPadding: '0px', // centerPadding을 0으로 설정
    vertical: true,
    focusOnSelect: true,
    initialSlide: 0,
    afterChange: (index: number) => onPhotoSelect(photos[index]),
    prevArrow: (<SliderPrevButton><SliderButtonDiv><img src="/img/profile/move_previous.svg" alt="<" /></SliderButtonDiv></SliderPrevButton>),
    nextArrow: (<SliderNextButton><SliderButtonDiv><img src="/img/profile/move_next.svg" alt="<" /></SliderButtonDiv></SliderNextButton>),
  };
  
  useEffect(() => {
    setInitialSlide(photos.length - 1);
  }, [photos])

  return (
    <AlbumContainer>
      <StyledSlider {...settings}>
        {photos.map((photo, index) => (
          <div key={index}>
            <Photo src={photo.src} timestamp={photo.timestamp} />
          </div>
        ))}
      </StyledSlider>
    </AlbumContainer>
  );
};

export default Album;
