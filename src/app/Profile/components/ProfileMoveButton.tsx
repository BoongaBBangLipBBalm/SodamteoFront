import styled from "styled-components";

interface IButtonPorps {
    isToNext: boolean;
    imgURL: string;
}

const Container = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    background-color: #FCFCFC;
    filter: drop-shadow(1px 1px 10px rgba(0,0,0,0.25));
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #efefef;
    }
`;

const Image = styled.img`
    width: auto;
    height: 1.125rem;
`;



const ProfileMoveButton = (props: IButtonPorps) => {
    return (
        <Container>
            <Image src={props.imgURL}></Image>
        </Container>
    )
};

export default ProfileMoveButton