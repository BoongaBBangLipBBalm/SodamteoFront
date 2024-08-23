// components/ConfirmationModal.tsx
import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 300px;
  padding: 1.5rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const ModalMessage = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ color: string }>`
  width: 45%;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  border: none;
  color: white;
  background-color: ${props => props.color};
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Pretendard-Regular';

  &:hover {
    opacity: 0.8;
  }
`;

const ConfirmationModal: React.FC<ModalProps> = ({ onClose, onConfirm }) => {
  return (
    <Overlay>
      <ModalContainer>
        <ModalMessage>정말 이 프로필을 삭제하시겠습니까?</ModalMessage>
        <ButtonContainer>
          <Button color="#ccc" onClick={onClose}>취소</Button>
          <Button color="#ff4949" onClick={onConfirm}>확인</Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default ConfirmationModal;
