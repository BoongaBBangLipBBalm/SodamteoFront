import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-size: 1.25rem;
    margin-right: 1rem;
    font-family: 'Pretendard_Regular';
`;

const Toggle = styled.input`
    width: 50px;
    height: 25px;
    background: #ccc;
    border-radius: 15px;
    position: relative;
    appearance: none;
    cursor: pointer;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:checked {
        background: #274c4b;
    }

    &::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 21px;
        height: 21px;
        background: white;
        border-radius: 50%;
        transition: 0.3s;
    }

    &:checked::before {
        left: 27px;
    }
`;

interface IDeviceToggleProps {
    label: string;
    isEnabled: boolean;
    setIsEnabled: (value: boolean) => void;
}

const DeviceToggle: React.FC<IDeviceToggleProps> = ({ label, isEnabled, setIsEnabled }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Toggle
                type="checkbox"
                checked={isEnabled}
                onChange={() => setIsEnabled(!isEnabled)}
            />
        </Container>
    );
};

export default DeviceToggle;
