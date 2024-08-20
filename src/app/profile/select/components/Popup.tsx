// Popup.tsx
import React from "react";
import styled from "styled-components";

const PopupBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PopupContainer = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 1rem; /* 10px to rem */
    text-align: center;
    width: 90%; /* Optional: control the width of the popup container */
    max-width: 30rem; /* Optional: to limit the maximum width */
    
`;

const Button = styled.button<{$isConfirm: boolean}>`
    margin: 2rem 1rem 0rem 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.625rem; /* 20px */
    cursor: pointer;
    font-family: 'Pretendard-Regular';
    font-size: 1rem;
    color: #ffffff;
    background-color: ${props => props.$isConfirm ? "#43545B" : "#274c4b"};
`;

interface PopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <PopupBackground>
            <PopupContainer>
                <p>{message}</p>
                <Button onClick={onConfirm} $isConfirm={false}>취소</Button>
                <Button onClick={onCancel} $isConfirm={true}>확인</Button>
            </PopupContainer>
        </PopupBackground>
    );
};

export default Popup;
