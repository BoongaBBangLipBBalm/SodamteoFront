import React, { useEffect } from 'react';
import styled from 'styled-components';
import Profile from './datas/profile';
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

const getDataComponent = (id: number, data: IDataProps) => {
    switch(id) {
        case 1: // Temperature
            return (
                <Temperature minValue={data.tempMinValue} maxValue={data.tempMaxValue} setMinValue={data.tempSetMinValue} setMaxValue={data.tempSetMaxValue} isEnabled={data.tempIsEnabled} setIsEnabled={data.tempSetIsEnabled}/>
            )
        case 2: // Humidity
            return (
                <Humidity minValue={data.humidMinValue} maxValue={data.humidMaxValue} setMinValue={data.humidSetMinValue} setMaxValue={data.humidSetMaxValue} isEnabled={data.humidIsEnabled} setIsEnabled={data.humidSetIsEnabled} />
            )
        case 3: // Sun Light
            return (
                <SunLight minValue={data.sunLightMinValue} maxValue={data.sunLightMaxValue} setMinValue={data.sunLightSetMinValue} setMaxValue={data.sunLightSetMaxValue} isEnabled={data.sunLightIsEnabled} setIsEnabled={data.sunLightSetIsEnabled} />
            )
    }
}

// 컴포넌트를 조건부로 렌더링할 ID와 컴포넌트 매핑
const renderComponentsById = (id: number, data: IDataProps) => {
    switch (id) {
        case 1: // 벼
            return (
                <>
                    {getDataComponent(1, data)}
                    {getDataComponent(2, data)}
                    {getDataComponent(3, data)}
                </>
            );
        case 2: // 감자
        return (
            <>
                {getDataComponent(1, data)}
                {getDataComponent(2, data)}
                {getDataComponent(3, data)}
            </>
        );
        case 3: // 토마토
        return (
            <>
                {getDataComponent(1, data)}
                {getDataComponent(2, data)}
                {getDataComponent(3, data)}
            </>
        );
        case 4: // 사과 (기타)
        default:
            return null; // 아무것도 렌더링하지 않음
    }
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
    justify-content: flex-end;
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

const ProfileInfo: React.FC<{ setImgURL: (url: string) => void, setSelectedType: (url: string) => void, selectedType: string, data: IDataProps }> = ({ setImgURL, selectedType, setSelectedType, data}) => {
    useEffect(() => {
        setImgURL(idToImageMap[typeToIdMap[selectedType]]);
    }, [selectedType]);

    // 선택된 타입에 해당하는 ID를 가져오기
    const selectedId = typeToIdMap[selectedType];

    return (
        <Container>
            <ScrollContainer>
                <Profile selectedType={selectedType} setSelectedType={setSelectedType} />

                {/* ID에 따른 컴포넌트 렌더링 */}
                {renderComponentsById(selectedId, data)}
            </ScrollContainer>
            <ButtonContainer>
                <Button color="#43545B" as="a" href="/profile/select">Cancel</Button>
                <Button color="#274C4B">Done</Button>
            </ButtonContainer>
        </Container>
    );
};

export default ProfileInfo;
