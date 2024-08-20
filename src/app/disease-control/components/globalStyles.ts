import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  .slick-slide {
    padding: 10px;
  }
`;
