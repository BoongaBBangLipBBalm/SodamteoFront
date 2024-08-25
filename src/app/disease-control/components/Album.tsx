import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Photo, { IPhoto } from './Photo';

interface AlbumProps {
  selectedCategory: string;
  photos: IPhoto[];
  onPhotoSelect: (photo: IPhoto) => void;
  onDeletePhoto: (index: number) => void;
}

const AlbumContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center; /* Align items vertically in the center */
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

const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .slick-list {
    transform: translate(0, -100%);
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slick-track {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;

    &[aria-hidden='true'] {
      pointer-events: none;
      opacity: 0.5;
    }
  }
`;

const SliderButtonDiv = styled.div`
  background-color: rgb(255, 255, 255);
  filter: drop-shadow(0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.25));
  border-radius: 50%;
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



const Album: React.FC<AlbumProps> = ({ selectedCategory, photos, onPhotoSelect, onDeletePhoto }) => {
  const sliderRef = useRef<Slider | null>(null);

  let currentSlide: number;

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
      currentSlide = index;
    }
  };

  const updateInertAttributes = (activeIndex: number) => {
    const slides = document.querySelectorAll('.slick-slide');
    slides.forEach((slide, index) => {
      if (index === activeIndex) {
        slide.removeAttribute('aria-hidden');
        slide.removeAttribute('inert');
        slide.setAttribute('tabindex', '0');
      } else {
        slide.setAttribute('aria-hidden', 'true');
        slide.setAttribute('inert', '');
        slide.setAttribute('tabindex', '-1');
      }
    });
  };

  const settings = {
    arrows: true,
    infinite: false,
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    centerPadding: '0', 
    vertical: true,
    afterChange: (index: number) => {
      if(index != -1) {
        onPhotoSelect(photos[index]);
        updateInertAttributes(index);
      }
    },
    prevArrow: (
      <SliderPrevButton>
        <SliderButtonDiv>
          <img src="/img/diseaseControl/UpArrow.svg" alt="<" />
        </SliderButtonDiv>
      </SliderPrevButton>
    ),
    nextArrow: (
      <SliderNextButton>
        <SliderButtonDiv>
          <img src="/img/diseaseControl/DownArrow.svg" alt=">" />
        </SliderButtonDiv>
      </SliderNextButton>
    ),
  };

  useEffect(() => {
    goToSlide(photos.length - 1);
    updateInertAttributes(photos.length - 1);
    onPhotoSelect(photos[photos.length - 1]);
  }, [photos]);

  

  return (
    <AlbumContainer>
      <StyledSlider {...settings} ref={sliderRef}>
        {photos.map((photo, index) => (
          <div key={index}>
            <Photo
              src={photo.src}
              timestamp={photo.timestamp}
              onDelete={() => onDeletePhoto(index)}
            />
          </div>
        ))}
      </StyledSlider>
    </AlbumContainer>
  );
};

export default Album;
