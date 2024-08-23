import React, { useState } from 'react';
import styled from 'styled-components';
import DataPreset from "../DataPreset";
import { typeToIdMap } from '../profileDatas';
import CropSelectionPopup from '../CropSelectionPopup';

const DataName = styled.div`
    font-family: 'Pretendard_Regular';
    font-size: 1.25rem;
    color: black;
    width: 5rem;
    margin-right: 1.25rem;
    flex-shrink: 0;
`;

const DataContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`;

const StringInput = styled.input`
    flex: 1;
    padding: 0 1rem;
    height: 3.188rem;
    background-color: #FFFFFF;
    color: black;
    font-family: 'Pretendard_Regular';
    font-size: 1.25rem;
    border-radius: 1.25rem;
    border: none;
    box-shadow: inset 0 0.125rem 0.5rem rgba(0,0,0,0.15);
`;

const SelectWrapper = styled.div`
    flex: 1;
    position: relative;
    height: 3.188rem;
`;

const SelectOption = styled.select`
    width: 100%;
    height: 100%;
    padding: 0 2rem 0 1rem;
    background-color: #EBE9E3;
    color: black;
    font-family: 'Pretendard_Regular';
    font-size: 1.25rem;
    border-radius: 1.25rem;
    border: none;
    box-shadow: inset 0 0.125rem 0.5rem rgba(0,0,0,0.15);
    appearance: none;
    position: relative;
    z-index: 1;
    pointer-events: none;
`;

const SearchButton = styled.button`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    background: url('/img/profile/add/search-icon.svg') no-repeat center;
    background-size: contain;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    cursor: pointer;
    z-index: 2;
`;

interface ProfileProps {
    profileName: string;
    setProfileName: (value: string) => void;
    selectedType: string;
    setSelectedType: (value: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ profileName, setProfileName, selectedType, setSelectedType }) => {

    const [showPopup, setShowPopup] = useState(false);

    const grains = Object.keys(typeToIdMap);
    setSelectedType(selectedType);
    setProfileName(profileName);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileName(event.target.value);
    };

    const handleSearchClick = () => {
        setShowPopup(true);
    };

    const handleSelectCrop = (crop: string) => {
        setSelectedType(crop);
    };

    return (
        <>
            <DataPreset
                title="Profile"
                dataContainers={[
                    <DataContainer key="1">
                        <DataName>Name</DataName>
                        <StringInput type="text" value={profileName} onChange={handleTextChange}/>
                    </DataContainer>,
                    <DataContainer key="2">
                        <DataName>Type</DataName>
                        <SelectWrapper>
                            <SelectOption value={selectedType} onChange={handleSelectChange}>
                                {grains.map((key, index) => (
                                    <option value={key} key={index}>{key}</option>
                                ))}
                            </SelectOption>
                            <SearchButton onClick={handleSearchClick} />
                        </SelectWrapper>
                    </DataContainer>,
                ]}
            />

            {showPopup && (
                <CropSelectionPopup onClose={() => setShowPopup(false)} onSelectCrop={handleSelectCrop} />
            )}
        </>
    );
}

export default Profile;
