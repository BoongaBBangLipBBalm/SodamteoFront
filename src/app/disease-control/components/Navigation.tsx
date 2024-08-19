import React from 'react';
import styled from 'styled-components';

interface NavigationProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavItem = styled.button<{ $isSelected: boolean }>`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  background-color: ${({ $isSelected: isSelected, theme }) => isSelected ? theme.colors.primary : theme.colors.secondary};
  color: white;
  cursor: pointer;
  border-radius: 5px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Navigation: React.FC<NavigationProps> = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <Nav>
      {categories.map((category) => (
        <NavItem
          key={category}
          $isSelected={category === selectedCategory}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </NavItem>
      ))}
    </Nav>
  );
};

export default Navigation;
