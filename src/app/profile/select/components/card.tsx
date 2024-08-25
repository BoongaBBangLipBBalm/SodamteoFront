// card.tsx
import styled from "styled-components";
import SimpleStatus from "./simpleStatus";
import ProfileSelectButton from "./button_select";
import ProfileEditButton from "./button_edit";
import { useEffect, useState } from "react";

export interface ICardProps {
    farmID: number;
    imageURL: string;
    farmName: string;
    cropName: string;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
}

interface ICardSelected {
    data: ICardProps;
    isSelected: boolean;
}

const card_config = { // value: rem
    sizeRatio: 0.627,
    selectedCard_height: 30,
    unselectedCard_height: 13
}

const CardContainer = styled.div<{$isSelected: boolean}>`
    opacity: ${(props) => props.$isSelected ? `1` : `0.5`};;
    position: relative;
    width: ${(props) => props.$isSelected ? NumToRem(card_config.selectedCard_height * card_config.sizeRatio) : NumToRem(card_config.unselectedCard_height * card_config.sizeRatio)};
    height: ${(props) => props.$isSelected ? NumToRem(card_config.selectedCard_height) : NumToRem(card_config.unselectedCard_height)};
    background-color: #F8F7F7;
    filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.15));
    border-radius: 20px;
    padding: ${(props) => props.$isSelected ? NumToRem(card_config.selectedCard_height * card_config.sizeRatio * 0.1) : NumToRem(card_config.unselectedCard_height * card_config.sizeRatio * 0.1)};
    display: flex;
    flex-direction: column;
    margin: auto; // 마진을 auto로 설정해 중앙 정렬 유지
    &:hover .delete-button {
        display: block;
    }
    transition: 0.1s opacity;
`;


function NumToRem(value: number) {
    return String(value) + "rem";
}

const ImageContainer = styled.div`

    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #EBE9E3;
    border-radius: 20px;
    box-shadow: inset 0 4px 4px rgba(0,0,0,0.15);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextConatiner = styled.div`
    width: 100%;
    margin-top: 0.688rem;
    display: flex;
    justify-content: space-between;
`;

const ProfileName = styled.span<{$isSelected: boolean}>`
    display: inline-block;
    font-size: ${props => props.$isSelected ? "1.25rem" : "0.6rem"};
    font-family: "Pretendard-Regular";
    color: black;
    margin-left: 0.375rem;
    text-align: left;
    vertical-align: bottom;
`;

const TypeName = styled.span<{$isSelected: boolean}>`
    display: inline-block;
    position: relative;
    font-size: ${props => props.$isSelected ? "0.813rem" : "0.665rem"};
    font-family: "Pretendard-Regular";
    color: black;
    margin-right: 0.375rem;
    text-align: right;
    vertical-align: bottom;
`;

const Image = styled.img`
    width: 60%;  
`;

const StatusContainer = styled.div`
    width: 100%;
    height: 6rem;
    margin-top: 0.688rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
`;

const Card = (props: ICardSelected) => {
    const { isSelected, data } = props;

    useEffect(() => {
    }, [props.data]);

    return (
        <CardContainer $isSelected={isSelected}>
            <ImageContainer>
                <Image src={data.imageURL}></Image>
            </ImageContainer>
            <TextConatiner>
                <ProfileName $isSelected={isSelected}>{data.farmName}</ProfileName>
                <TypeName $isSelected={isSelected}>{data.cropName}</TypeName>
            </TextConatiner>
            {
                isSelected
                ?   <StatusContainer>
                        <SimpleStatus imageURL="/img/profile/temperature.svg" minValue={-10} maxValue={50} currentValue={props.data.temperature} left_color="#625FFF" right_color="#E37F7F" toFixed={1} unit={"°C"}></SimpleStatus>
                        <SimpleStatus imageURL="/img/profile/humidity.svg" minValue={0} maxValue={100} currentValue={props.data.humidity} left_color="#625FFF" right_color="#E37F7F" toFixed={0} unit={"%"}></SimpleStatus>
                        <SimpleStatus imageURL="/img/profile/pH.svg" minValue={0} maxValue={14} currentValue={props.data.ph} left_color="#5FFF65" right_color="#E37F7F" toFixed={1} unit={"pH"}></SimpleStatus>
                        <SimpleStatus imageURL="/img/profile/rainfall.svg" minValue={0} maxValue={500} currentValue={props.data.rainfall} left_color="white" right_color="#625FFF" toFixed={0} unit={"mm"}></SimpleStatus>
                    </StatusContainer>
                :   null
            }
            {
                isSelected && (
                    <ButtonContainer>
                        <ProfileSelectButton farmID={data.farmID} />
                    </ButtonContainer>
                )
            }
        </CardContainer>
    )
}

export default Card;
