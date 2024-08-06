import styled from "styled-components"

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

const DataName = styled.div`
    font-family: 'Pretendard_Regular';
    font-size: 1.563rem;
    color: black;
    width: 5rem;
    margin-right: 1.25rem;
`;

const DataContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.25rem;
`;

const StringInput = styled.input`
    padding: 0 1rem;
    width: 100%;
    height: 3.188rem;
    background-color: #FFFFFF;
    color: black;
    font-family: 'Pretendard_Regular';
    font-size: 1.25rem;
    border-radius: 1.25rem;
    border: none;
    box-shadow: inset 0 0.125rem 0.5rem rgba(0,0,0,0.15);
`;

const SelectOption = styled.select`
padding: 0 1rem;
    width: 100%;
    height: 3.188rem;
    background-color: #EBE9E3;
    color: black;
    font-family: 'Pretendard_Regular';
    font-size: 1.25rem;
    border-radius: 1.25rem;
    border: none;
    box-shadow: inset 0 0.125rem 0.5rem rgba(0,0,0,0.15);
`;

const Profile = () => {
    return (
        <Container>
            <DataSetName>Profile</DataSetName>
            <DataContainer>
                <DataName>Name</DataName>
                <StringInput type="text"></StringInput>
            </DataContainer>
            <DataContainer>
                <DataName>Type</DataName>
                <SelectOption>
                    <option value="옥수수">옥수수</option>
                    <option value="감자">감자</option>
                    <option value="토마토">토마토</option>
                    <option value="사과">사과</option>
                </SelectOption>
            </DataContainer>
        </Container>    
    )
    
}

export default Profile;