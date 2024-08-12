import styled from "styled-components";

const Button = styled.button`
    width: 7.125rem;
    height: 2.325rem;
    border-radius: 0.625rem;
    background-color: #43545B;
    font-family: "Pretendard-Regular";
    font-size: 1.25rem;
    color: white;
    vertical-align: middle;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #2e424a;
    }
`;

function OnClick() {

}

const ProfileEditButton = () => {
    return (
        <Button as="a" href="profile/edit" onClick={() => OnClick()}>Edit</Button>
    )
};

export default ProfileEditButton;