import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  .slick-slide {
    padding: 10px;
  }
`;
