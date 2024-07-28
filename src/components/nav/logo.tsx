import styled from "styled-components";

interface ILogoProps {
    url: string;
}

const LogoContainer = styled.div`
    width: auto;
    height: 11.438rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoImage = styled.img`
    max-width: 9.313rem;
    height: auto;
`;

const Logo = (props: ILogoProps) => {
    return (
        <LogoContainer>
            <LogoImage src={props.url}></LogoImage>
        </LogoContainer>
    )
}

export default Logo;