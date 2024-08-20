import styled from "styled-components";
import { removeToken, getRefreshToken } from '@/utils/localStorage'; 
import { useRouter } from 'next/navigation'; 
import { useEffect } from "react";

interface IButtonData {
  id: number;
  name: string;
  imageURL: string;
  toURL: string;
}

interface IButtonProps {
  id: number;
  selected: boolean;
  isLast: boolean;
}

const ButtonContainer = styled.div<{ $isSetting: boolean }>`
  position: ${props => props.$isSetting ? 'absolute' : 'static'};
  bottom: ${props => props.$isSetting ? '3.125rem' : '0'};
  width: 234px;
  height: 2.188rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2.025rem;
`;

const ButtonBox = styled.a`
  width: 219px;
  display: flex;
  align-items: center;
`;

const ButtonText = styled.span<{ $isselected: boolean }>`
  color: ${props => props.$isselected ? "#ECB365" : "#FFFFFF"};
  font-size: 1.125rem;
  font-family: "Pretendard_Bold";
  display: block;
`;

const ButtonImageBox = styled.div<{ $isselected: boolean }>`
  background-color: ${props => props.$isselected ? "#ECB365" : "#FFFFFF"};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  display: inline-block;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25);
`;

const ButtonImage = styled.img`
  width: 0.875rem;
`;

export function GetButtonData(id: number): IButtonData {
  const datas = require('@data/navButtonData.json');
  
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].id === id) {
      return datas[i];
    }
  }
  
  return { id: -1, name: "No Data", imageURL: "", toURL: "" };
}

const NavButton = (props: IButtonProps) => {
  const router = useRouter();

  const logOutHandler = async () => {
    const token = getRefreshToken();
    if (token) {
      try {
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        });
  
        if (response.ok) {
          const confirmed = window.confirm('로그아웃 되었습니다!');
          
          if (confirmed) {
            removeToken();
            router.push('/login');
          }
        } else {
          console.error('Failed to log out');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      console.error('No token found');
    }
  };
  

  const buttonOnClick = (id: number): void => {
    if (id === 9) { 
      logOutHandler();
    }
  };

  let data: IButtonData = GetButtonData(props.id);

  return (
    <ButtonContainer $isSetting={props.isLast}>
      <ButtonBox href={data.toURL} onClick={() => buttonOnClick(props.id)}>
        <ButtonImageBox $isselected={props.selected}>
          <ButtonImage src={data.imageURL} alt={data.name} />
        </ButtonImageBox>
        <ButtonText $isselected={props.selected}>{data.name}</ButtonText>
      </ButtonBox>
    </ButtonContainer>
  );
};

export default NavButton;
