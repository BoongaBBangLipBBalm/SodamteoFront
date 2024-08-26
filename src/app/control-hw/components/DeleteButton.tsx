import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #c9302c;
  }
`;

const DeleteButton = ({ onClick }) => {
  const handleClick = async () => {
    const confirmDelete = window.confirm('정말로 이 기기를 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await onClick(); // 부모 컴포넌트의 삭제 함수 호출
        alert('기기가 성공적으로 삭제되었습니다.');
        // 여기서 화면을 새로 고침하거나 상태를 업데이트하는 로직을 추가합니다.
        window.location.reload(); // 페이지를 새로 고쳐서 화면 갱신
      } catch (error) {
        alert('기기 삭제 중 오류가 발생했습니다.');
        console.error('기기 삭제 오류:', error);
      }
    }
  };

  return <Button onClick={handleClick}>삭제</Button>;
};

export default DeleteButton;
