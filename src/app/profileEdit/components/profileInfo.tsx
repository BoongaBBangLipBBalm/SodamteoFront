import styled from "styled-components";
import Profile from "./datas/profile";
import MultiRangeSlider from "./datas/multiRangeSlider";

const Container = styled.div`
    padding: 1.313rem;
    margin-left: 2.188rem;
    margin-top: 2.188rem;
    width: 69.04%;
    height: 91.98%;
    background-color: #F8F7F6;
    border-radius: 1.25rem;
    filter: drop-shadow(0 0.125rem 0.5rem rgba(0,0,0,0.25));
`;

const DataContainer = styled.div`
    width: auto;
    height: auto;
`;


const ProfileInfo = () => {
    return (
        <Container>
            <Profile></Profile>
            <div>
                <MultiRangeSlider max={100} min={0}>
                </MultiRangeSlider>
            </div>
            
        </Container>
    )
}

export default ProfileInfo;