"use client";

import styled from "styled-components";
import NavButton from "./button";

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
`;

interface IButtonListProps {
    listid: number;
}

const ButtonList = () => {
    return (
        <Buttons>
            <NavButton id={0} selected={true}></NavButton>
            <NavButton id={1} selected={false}></NavButton>
        </Buttons>
    )
    
}

export default ButtonList;