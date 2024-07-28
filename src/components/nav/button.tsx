"use client";

import styled from "styled-components";
import { useEffect } from "react";

let buttonDatas: any = null;

interface IButtonProps {
    
    id: number;
    selected: boolean;
    
}

interface IButtonData {
    
    id: number;
    name: string;

}

const ButtonContainer = styled.div`

    height: 2.188rem;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const ButtonBox = styled.a`
    
    width: 219px;
    text-align: center;

`;

const ButtonText = styled.span<{ isselected?: boolean }>`
    color: ${props => props.isselected ? "#ECB365" : "#FFFFFF"};
    font-size: 1.125rem;
    font-family: "Pretendard-Bold";
`;

function GetButtonData(id: number):IButtonData {


    let resultData: IButtonData;
    if(buttonDatas != null) {
        for(var i = 0 ; i < buttonDatas.length ; i++) {
            if(buttonDatas[i].id == id) {
    
                resultData = { id: buttonDatas[i].id, name: buttonDatas[i].name}
                return resultData;
    
            }
        }
    }

    resultData = { id: -1, name: "No Data" };
    return resultData;
}

const NavButton = (props: IButtonProps) => {

    // Test Code //

    useEffect(() => {
        buttonDatas = require('@data/navButtonData.json'); // Fix
        console.log("Fetched buttons data");
    }, []);


    let button_data:IButtonData;
    button_data = GetButtonData(props.id);

    return(
        <ButtonContainer>
            <ButtonBox>
                <ButtonText isselected={props.selected}>{button_data.name}</ButtonText>
            </ButtonBox>
        </ButtonContainer>
    )
}

export default NavButton;