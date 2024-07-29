import styled from "styled-components";

const Button = styled.button`
    width: 7.125rem;
    height: 2.325rem;
    border-radius: 0.625rem;
    background-color: #274C4B;
    font-family: "Pretendard-Regular";
    font-size: 1.25rem;
    color: white;
    vertical-align: middle;
    border: none;

    &:hover {
        background-color: #153130;
    }
`;

function OnClick() {

}

const ProfileSelectButton = () => {
    return (
        <Button onClick={() => OnClick()}>Select</Button>
    )
};

export default ProfileSelectButton;