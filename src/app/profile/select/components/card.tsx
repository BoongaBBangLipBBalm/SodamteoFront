import styled from "styled-components";
import SimpleStatus from "./simpleStatus";
import ProfileSelectButton from "./button_select";
import ProfileEditButton from "./button_edit";

export interface ICardProps {
    imageURL: string;
    profileName: string;
    type: string;
}

interface ICardSeleced {
    data: ICardProps;
    isSelected: boolean;
}

const card_config = { // value: rem
    sizeRatio: 0.627,
    selectedCard_height: 30,
    unselectedCard_height: 13
}

const CardContainer = styled.div<{$isSelected: boolean}>`
    width: ${(props) => props.$isSelected ? NumToRem(card_config.selectedCard_height * card_config.sizeRatio) : NumToRem(card_config.unselectedCard_height * card_config.sizeRatio)};
    height: ${(props) => props.$isSelected ? NumToRem(card_config.selectedCard_height) : NumToRem(card_config.unselectedCard_height)};
    background-color: #F8F7F7;
    margin: 0 1.063rem;
    filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.15));
    border-radius: 20px;
    padding: ${(props) => props.$isSelected ? NumToRem(card_config.selectedCard_height * card_config.sizeRatio * 0.1) : NumToRem(card_config.unselectedCard_height * card_config.sizeRatio * 0.1)};
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
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
    font-size: ${props => props.$isSelected ? "1.25rem" : "1rem"};
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


const Card = (props: ICardSeleced) => {
    return (
        <CardContainer $isSelected={props.isSelected}>
            <ImageContainer>
                <Image src={props.data.imageURL}></Image>
            </ImageContainer>
            <TextConatiner>
                <ProfileName $isSelected={props.isSelected}>{props.data.profileName}</ProfileName>
                <TypeName $isSelected={props.isSelected}>{props.data.type}</TypeName>
            </TextConatiner>
            {
                props.isSelected
                ?   <StatusContainer>
                        <SimpleStatus imageURL="/img/profile/temperature.svg" currentValue={0.6} left_color="#625FFF" right_color="#E37F7F"></SimpleStatus>
                        <SimpleStatus imageURL="/img/profile/humidity.svg" currentValue={0.4} left_color="#625FFF" right_color="#E37F7F"></SimpleStatus>
                        <SimpleStatus imageURL="/img/profile/bug.svg" currentValue={0.14} left_color="#5FFF65" right_color="#E37F7F"></SimpleStatus>
                        <SimpleStatus imageURL="/img/profile/sunlight.svg" currentValue={0.8} left_color="black" right_color="white"></SimpleStatus>
                    </StatusContainer>
                :   null
            }
            {
                props.isSelected
                ?   <ButtonContainer>
                        <ProfileSelectButton></ProfileSelectButton>
                        <ProfileEditButton></ProfileEditButton>
                    </ButtonContainer>
                :   null
            }
            
        </CardContainer>
        
    )
}

export default Card;