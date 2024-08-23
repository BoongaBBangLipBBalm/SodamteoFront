import styled from "styled-components";
import { ReactNode } from "react";

// 스타일 컴포넌트 정의
const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`;

const DataSetName = styled.div`
    font-family: 'Pretendard_Bold';
    font-size: 1.875rem;
    color: black;
    margin-bottom: 1rem;
`;

const DataContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.25rem;
`;

// 컴포넌트 props 타입 정의
interface ProfileProps {
    title: string;
    dataContainers: ReactNode[]; // DataContainer에 들어갈 수 있는 요소들
}

const DataPreset: React.FC<ProfileProps> = ({ title, dataContainers }) => {
    return (
        <Container>
            <DataSetName>{title}</DataSetName>
            {dataContainers.map((content, index) => (
                <DataContainer key={index}>
                    {content}
                </DataContainer>
            ))}
        </Container>
    );
}

export default DataPreset;
