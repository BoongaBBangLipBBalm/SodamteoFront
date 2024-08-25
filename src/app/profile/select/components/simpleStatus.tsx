import styled from "styled-components";

interface IStatusProps {
    left_color: string;
    right_color: string;
    imageURL: string;
    currentValue: number;
    minValue: number;
    maxValue: number;
}

const Container = styled.div`
    width: 95%;
    margin-bottom: 0.313rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageContainer = styled.div`
      width: 0.938rem;
      height: 0.938rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.938rem;
`;
const Image = styled.img`
    max-width: 0.938rem;  
`;

const StatusBarConfig = {
    barHeight: 0.313, // rem
    knobRaduis: 0.688, // rem
}

const Knob = styled.div<{value: number, $minValue: number, $maxValue: number}>`
    position: absolute;
    width: ${NumToRem(StatusBarConfig.knobRaduis)};
    height: ${NumToRem(StatusBarConfig.knobRaduis)};
    background-color: #ffffff;
    filter: drop-shadow(0px 1px 10px rgba(0,0,0,0.35));
    border-radius: 100%;
    top: 50%;
    left: ${props=>FloatValueToPercentage(props.value, props.$minValue, props.$maxValue)};
    transform: translate(-50%, -50%);
`;

function NumToRem(value: number) {
    return String(value) + "rem";
}
function FloatValueToPercentage(value: number, minValue: number, maxValue: number) {
    if(value > maxValue) return "100%";
    if(value < minValue) return "0%";
    return String((value - minValue)/(maxValue - minValue) * 100) + "%";
}

const StatusBarContainer = styled.div`
    position: relative;
    width: 100%;
`;

const StatusBar = styled.div<{leftcolor: string, rightcolor: string}>`
    width: 100%;
    height: ${NumToRem(StatusBarConfig.barHeight)};
    background: linear-gradient(90deg, ${props=>props.leftcolor} 0%, ${props=>props.rightcolor} 100%);
    border-radius: ${NumToRem(StatusBarConfig.barHeight)};
    
`;


const SimpleStatus = (props: IStatusProps) => {
    return (
        <Container>
            <ImageContainer>
                <Image src={props.imageURL}></Image>
            </ImageContainer>
            <StatusBarContainer>
                <StatusBar leftcolor={props.left_color} rightcolor={props.right_color}></StatusBar>
                <Knob value={props.currentValue} $minValue={props.minValue} $maxValue={props.maxValue}></Knob>
            </StatusBarContainer>
        </Container>
    )
}

export default SimpleStatus;