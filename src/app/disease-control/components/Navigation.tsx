import React from 'react';
import styled from 'styled-components';

interface NavigationProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const Nav = styled.nav`
  z-index: 100;
  width: 100%;
  padding-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const NavItem = styled.button<{ $isSelected: boolean }>`
font-size: 1rem;
  margin: 0 0.625rem;
  padding: 0.625rem 1.25rem;
  border: none;
  background-color: transparent;
  color: ${({ $isSelected: isSelected, theme }) => isSelected ? theme.colors.primary : theme.colors.secondary};
  cursor: pointer;
  border-radius: 0.3125rem;

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
