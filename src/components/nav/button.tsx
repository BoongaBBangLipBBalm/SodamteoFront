import styled from "styled-components";

interface IButtonData {
    
    id: number;
    name: string;
    imageURL: string;
    toURL: string;
}

interface IButtonProps {
    
    id: number;
    selected: boolean;
    
}

const ButtonContainer = styled.div<{ $isSetting: boolean }>`

    position: ${props => props.$isSetting ? 'absolute' : 'static'};
    bottom: ${props => props.$isSetting ? '3.125rem' : '0'};
    width: 234px;
    height: 2.188rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-left: 0.938rem; */
    padding-left: 2.725rem;

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

    for(var i = 0 ; i < datas.length ; i++) {
        if(datas[i].id == id) {
            return datas[i];
        }
    }
    let nullData: IButtonData = {id: -1, name: "No Data", imageURL: "", toURL: ""};
    return nullData;

}


const NavButton = (props: IButtonProps) => {

    let data: IButtonData = GetButtonData(props.id);
    

    return(
        <ButtonContainer $isSetting={data.id == 3}>
            <ButtonBox href={data.toURL}>
                <ButtonImageBox $isselected={props.selected}>
                    <ButtonImage src={data.imageURL}></ButtonImage>
                </ButtonImageBox>
                <ButtonText $isselected={props.selected}>{data.name}</ButtonText>
            </ButtonBox>
        </ButtonContainer>
    )
}

export default NavButton;