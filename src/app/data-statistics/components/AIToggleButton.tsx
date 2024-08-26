import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getToken } from "@/utils/localStorage";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  width: 100px;
`;

const ToggleLabel = styled.label`
  display: inline-block;
  width: 50px;
  height: 25px;
  background-color: ${props => (props.isOn ? '#274c4b' : '#ccc')};
  border-radius: 25px;
  position: relative;
  margin: 0 10px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    top: 50%;
    left: ${props => (props.isOn ? 'calc(100% - 22px)' : '2px')};
    transform: translateY(-50%);
    transition: all 0.3s;
  }
`;

const AIToggleButton = ({ isAuto, onToggle }) => {
  const [isOn, setIsOn] = useState(isAuto);

  useEffect(() => {
    setIsOn(isAuto);
  }, [isAuto]);

  const handleClick = async () => {
    const token = getToken();
    try {
      const response = await fetch('/api/hardware/auto', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          device: 'Airconditioner',
          isAuto: !isOn,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result); // 디버깅용 로그 추가
        if (result.message === "Auto mode updated") {
          setIsOn(prevIsOn => !prevIsOn);
          if (onToggle) onToggle(!isOn);
        } else {
          console.error("Failed to update AI mode:", result.message);
        }
      } else {
        console.error("Failed to update AI mode:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to update AI mode:", error);
    }
  };

  return (
    <ToggleContainer>
      <ToggleLabel isOn={isOn} onClick={handleClick} />
      <span>Auto</span>
    </ToggleContainer>
  );
};

export default AIToggleButton;
