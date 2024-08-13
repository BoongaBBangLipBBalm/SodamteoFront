import styled from "styled-components";

const OuterContainer = styled.div`
    margin-left: 2.188rem;
    margin-top: 2.188rem;
    width: 21%;
    aspect-ratio: 1;
    background-color: #F8F7F7;
    filter: drop-shadow(0 0.125rem 0.5rem rgba(0,0,0,0.25));
    border-radius: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const InnerContainer = styled.div`
    width: 82%;
    height: 82%;
    background-color: #EBE9E3;
    box-shadow: inset 0 0.125rem 0.5rem rgba(0,0,0,0.15);
    border-radius: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
        width: 50%;
        height: auto;
    }
`;

interface IProfileImageProps {
    imgURL: string;
}

const ProfileImage = (props: IProfileImageProps) => {
    return (
        <OuterContainer>
            <InnerContainer>
                <img src={props.imgURL} alt="No Data" />
            </InnerContainer>
        </OuterContainer>
    )
}

export default ProfileImage;