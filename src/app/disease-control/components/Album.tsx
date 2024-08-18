import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Photo from './Photo';

interface AlbumProps {
  photos: { src: string; title: string; description: string }[];
}

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Album: React.FC<AlbumProps> = ({ photos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <StyledSlider {...settings}>
      {photos.map((photo, index) => (
        <div key={index}>
          <Photo src={photo.src} title={photo.title} description={photo.description} />
        </div>
      ))}
    </StyledSlider>
  );
};

export default Album;
