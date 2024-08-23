import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Profile from './datas/Profile';
import ConfirmationModal from './ConfirmationModal';
import { idToImageMap, typeToIdMap } from '@/app/profile/add/components/profileDatas';

const Container = styled.div`
    padding: 1.313rem;
    margin-left: 2.188rem;
    margin-top: 2.188rem;
    margin-bottom: 2.188rem;
    width: 69.04%;
    height: calc(100vh - 2.188rem - 2.188rem);
    background-color: #F8F7F6;
    border-radius: 1.25rem;
    filter: drop-shadow(0 0.125rem 0.5rem rgba(0,0,0,0.25));
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: calc(100% - 3.188rem); /* Adjust height to account for button container */
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 1.438rem;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #CCCCCC;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #04293A;
        border-radius: 5px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem; /* Spacing between buttons */
    padding: 1rem 0; /* Padding above and below the buttons */
`;

const Button = styled.button<{ color: string }>`
    width: 8.125rem;
    height: 2.625rem;
    border-radius: 0.625rem;
    border: none;
    color: white;
    background-color: ${props => props.color};
    cursor: pointer;
    font-size: 1.25rem;
    font-family: 'Pretendard-Regular';
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        opacity: 0.8;
    }
`;

const ProfileInfo: React.FC<{ setImgURL: (url: string) => void, setSelectedType: (url: string) => void, selectedType: string, farmName: string, setFarmName: (name: string)=>void, handleDone: ()=>void, handleDelete: ()=>void }> = ({ setImgURL, selectedType, setSelectedType, farmName, setFarmName, handleDone, handleDelete}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setImgURL(idToImageMap[typeToIdMap[selectedType]]);
    }, [selectedType]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const confirmDelete = () => {
        handleDelete();
        closeModal();
    };

    return (
        <Container>
            <ScrollContainer>
                <Profile profileName={farmName} setProfileName={setFarmName} selectedType={selectedType} setSelectedType={setSelectedType} />
            </ScrollContainer>
            <ButtonContainer>
                <Button color="#ff4949" onClick={openModal}>Delete</Button>
                <Button color="#274C4B" onClick={handleDone}>Done</Button>
            </ButtonContainer>
            {isModalOpen && (
                <ConfirmationModal onClose={closeModal} onConfirm={confirmDelete} />
            )}
        </Container>
    );
};

export default ProfileInfo;
