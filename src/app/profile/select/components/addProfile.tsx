import styled from "styled-components";

const Container = styled.button`
    position: absolute;
    right: 1.563rem;
    bottom: 1.563rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    background-color: #274C4B;
    filter: drop-shadow(1px 1px 10px rgba(0,0,0,0.25));
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #193736;
    }
`;

const Image = styled.img`
    width: auto;
    height: 1.125rem;
`;



const AddProfileButton = () => {
    return (
        <Container as="a" href="/profile/add">
            <Image src="/img/profile/add.svg"></Image>
        </Container>
    )
};

export default AddProfileButton;