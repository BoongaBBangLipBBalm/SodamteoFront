import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #ff4d4f; /* 탈퇴 버튼에 적합한 색상 */
  color: white;
  border: none;
  padding: 0.625rem 1.25rem; /* 10px 20px */
  font-size: 1rem; /* 16px */
  cursor: pointer;
  border-radius: 0.3125rem; /* 5px */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1a1a;
  }
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
