import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { getToken } from "@/utils/localStorage";

const deviceOptions = {
  "온도 제어": "Airconditioner",
  "습도 제어": "Humidifier",
  "자외선 제어": "Blind",
  "비료 제어": "Fertilizer"
};

const SelectButton = styled.button`
  width: 130px;
  padding: 10px;
  margin: 0;
  font-size: 15px;
  line-height: 14px;
  background-color: white;
  border: 1px solid #274c4b;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
  position: relative;
  transition: border-color 0.3s, outline 0.3s;

  &:hover,
  &:focus {
    border: 1px solid #274c4b;
    outline: 2px solid #749f73;
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    border: 5px solid transparent;
    border-top-color: #274c4b;
    transition: transform 0.3s;
  }

  ${({ $show }) => $show && `
    &::after {
      transform: translateY(-50%) rotate(180deg);
    }
  `}
`;

const SelectList = styled.ul`
  list-style-type: none;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  position: absolute;
  width: 130px;
  top: 93px;
  left: 67px;
  margin: 0;
  padding: 0;
  border: 1px solid #274c4b;
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
  z-index: 1000;
  max-height: 130px;
  overflow-y: auto;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 7px 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  color: black;

  &:hover,
  &:focus {
    background-color: #f8f7f6;
  }
`;

const Container = styled.button`
  position: absolute;
  right: 1.563rem;
  top: 1.563rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  background-color: #274C4B;
  filter: drop-shadow(1px 1px 10px rgba(0,0,0,0.25));
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; 

  &:hover {
    background-color: #193736;
  }
`;

const Image = styled.img`
  width: auto;
  height: 1.125rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 40px 50px;
  display: flex;
  justify-content: center;
  z-index: 1000; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  font-size: 13px;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  background-color: #274C4B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 130px;
  margin: 0;

  &:hover {
    background-color: #193736;
  }
`;

const AddDeviceForm = ({ closeForm, onDeviceAdded }) => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (english) => {
    setSelectedDevice(english);
    setShowOptions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDevice) {
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        alert("인증 토큰을 찾을 수 없습니다.");
        return;
      }

      const response = await fetch("/api/hardware/control", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          device: selectedDevice,
        }),
      });

      if (response.ok) {
        alert("기기가 성공적으로 추가되었습니다.");
        onDeviceAdded(); // 기기 추가 후 화면 갱신
        closeForm();
      } else if (response.status === 400) {
        alert("이미 존재하는 기기입니다.");
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다: " + error.message);
    }
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <SelectButton $show={showOptions} onClick={() => setShowOptions(!showOptions)}>
          {Object.entries(deviceOptions).find(([k, v]) => v === selectedDevice)?.[0] || "디바이스 선택"}
        </SelectButton>

        <SelectList $show={showOptions}>
          {Object.entries(deviceOptions).map(([korean, english]) => (
            <OptionButton key={english} onClick={() => handleOptionClick(english)}>
              {korean}
            </OptionButton>
          ))}
        </SelectList>
      </Form>
    </FormWrapper>
  );
};

const AddProfileButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleDeviceAdded = () => {
    // 화면을 새로 고침하거나 데이터를 새로 가져오는 로직을 여기에 추가합니다.
    window.location.reload(); // 페이지를 새로 고침하여 화면 갱신
  };

  return (
    <>
      <Container onClick={handleFormToggle}>
        <Image src="/img/profile/add.svg" alt="Add Device" />
      </Container>
      {isFormVisible && <AddDeviceForm closeForm={handleFormToggle} onDeviceAdded={handleDeviceAdded} />}
    </>
  );
};

export default AddProfileButton;
