import styled from "styled-components";
import NavButton from "./button";

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 3.125rem;
`;

const SettingButton = () => {
    return (
        <ButtonContainer>
            <NavButton id={3} selected={false}></NavButton>
        </ButtonContainer>
    )
}

export default SettingButton;
