"use client";

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation';
import Album from './components/Album';
import { GlobalStyle } from './components/globalStyles';
import { theme } from './components/theme';
import { GetLayoutWidthRatio } from '@/components/nav/nav';

const Container = styled.div`
  width: ${String(GetLayoutWidthRatio() * 100) + "%"};
  height: 100vh;
  padding: 20px;
`;

const allPhotos: any = {
  Nature: [
    { src: './img/grains/rice.svg', title: 'Nature 1', description: 'Beautiful nature 1' },
    { src: '/nature2.jpg', title: 'Nature 2', description: 'Beautiful nature 2' },
    { src: '/nature3.jpg', title: 'Nature 3', description: 'Beautiful nature 3' },
  ],
  Cities: [
    { src: '/city1.jpg', title: 'City 1', description: 'Amazing city 1' },
    { src: '/city2.jpg', title: 'City 2', description: 'Amazing city 2' },
    { src: '/city3.jpg', title: 'City 3', description: 'Amazing city 3' },
  ],
  Animals: [
    { src: '/animal1.jpg', title: 'Animal 1', description: 'Cute animal 1' },
    { src: '/animal2.jpg', title: 'Animal 2', description: 'Cute animal 2' },
    { src: '/animal3.jpg', title: 'Animal 3', description: 'Cute animal 3' },
  ],
};

const categories = Object.keys(allPhotos);

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Navigation
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Album photos={allPhotos[selectedCategory]} />
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
