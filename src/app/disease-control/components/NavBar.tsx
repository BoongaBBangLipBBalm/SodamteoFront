// components/Navbar.tsx
import React from 'react';
import styled from 'styled-components';

interface NavbarProps {
  diseases: string[];
  selectedDisease: string;
  onSelect: (disease: string) => void;
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background: #f4f4f4;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div<{ $active: boolean }>`

  color: blue;
  cursor: pointer;
  padding: 10px;
  font-weight: ${props => (props.$active ? 'bold' : 'normal')};
  border-bottom: ${props => (props.$active ? '2px solid #0070f3' : 'none')};
  
  &:hover {
    background: #eaeaea;
  }
`;

const Navbar: React.FC<NavbarProps> = ({ diseases, selectedDisease, onSelect }) => {
  return (
    <NavbarContainer>
      {diseases.map(disease => (
        <NavItem
          key={disease}
          $active={disease === selectedDisease}
          onClick={() => onSelect(disease)}
        >
          {disease}
        </NavItem>
      ))}
    </NavbarContainer>
  );
};

export default Navbar;
