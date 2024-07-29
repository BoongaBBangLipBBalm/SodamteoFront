import styled from "styled-components";
import Card from "./card";

const CardViewerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardViewer = () => {
    return (
        <CardViewerContainer>
            <Card imageURL="/img/profile/grains/rice.svg" isSelected={false} profileName="Lemon" type="(Fruit/Lemon)"></Card>
            <Card imageURL="/img/profile/grains/rice.svg" isSelected={true} profileName="Orange" type="(Fruit/Orange)"></Card>
            <Card imageURL="/img/profile/grains/rice.svg" isSelected={false} profileName="Apple" type="(Fruit/Apple)"></Card>
        </CardViewerContainer>
    )
}

export default CardViewer;