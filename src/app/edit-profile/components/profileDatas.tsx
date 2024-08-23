import React, { useEffect } from 'react';
import styled from 'styled-components';
import Profile from './datas/Profile';
import Temperature from './datas/Temperature';
import Humidity from './datas/Humidity';
import SunLight from './datas/SunLight';
import { IDataProps } from '../page';

// selectedType과 id의 매핑 정보
export const typeToIdMap: { [key: string]: number } = {
    "벼": 1,
    "감자": 2,
    "토마토": 3,
    "사과": 4
};

const idToImageMap: { [key: number]: string } = {
    1: '/img/profile/grains/rice.svg',
    2: '/img/profile/grains/potato.svg',
    3: '/img/profile/grains/tomato.svg',
    4: '/img/profile/grains/apple.svg'
};

const Container = styled.div`
    padding: 1.313rem;
    margin-left: 2.188rem;
    margin-top: 2.188rem;
    margin-bottom: 2.188rem;
    width: 69.04%;
    height: calc(100vh - 2.188rem - 2.188rem);
    background-color: #F8F7F6;
    border-radius: 1.25rem;
    filter: drop-shadow(0 0.125rem 0.5rem rgba(0,0,0,0.25));
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: calc(100% - 3.188rem); /* Adjust height to account for button container */
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 1.438rem;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #CCCCCC;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #04293A;
        border-radius: 5px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem; /* Spacing between buttons */
    padding: 1rem 0; /* Padding above and below the buttons */
`;

const Button = styled.button<{ color: string }>`
    width: 8.125rem;
    height: 2.625rem;
    border-radius: 0.625rem;
    border: none;
    color: white;
    background-color: ${props => props.color};
    cursor: pointer;
    font-size: 1.25rem;
    font-family: 'Pretendard-Regular';
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        opacity: 0.8;
    }
`;

const ProfileInfo: React.FC<{ setImgURL: (url: string) => void, setSelectedType: (url: string) => void, selectedType: string, data: IDataProps, handleDone: ()=>void, handleDelete: ()=>void }> = ({ setImgURL, selectedType, setSelectedType, data, handleDone, handleDelete}) => {
    useEffect(() => {
        setImgURL(idToImageMap[typeToIdMap[selectedType]]);
    }, [selectedType]);

    // 선택된 타입에 해당하는 ID를 가져오기
    const selectedId = typeToIdMap[selectedType];

    return (
        <Container>
            <ScrollContainer>
                <Profile profileName={data.profileName} setProfileName={data.setProfileName} selectedType={selectedType} setSelectedType={setSelectedType} />
            </ScrollContainer>
            <ButtonContainer>
                <Button color="#ff4949" onClick={handleDelete}>Delete</Button>
                <Button color="#274C4B" onClick={handleDone}>Done</Button>
            </ButtonContainer>
        </Container>
    );
};

export default ProfileInfo;
