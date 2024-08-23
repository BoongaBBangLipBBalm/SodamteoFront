import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { getToken } from "@/utils/localStorage";

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
`;

const Select = styled.select`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    padding: 0.5rem;
    background-color: #274C4B;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #193736;
    }
`;

const AddDeviceForm = () => {
    const [selectedDevice, setSelectedDevice] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDevice) {
            setResponseMessage("Please select a device.");
            return;
        }

        try {
            const token = getToken(); // 로컬 저장소에서 토큰 가져오기
            if (!token) {
                setResponseMessage("No authentication token found.");
                return;
            }

            const response = await fetch("/api/hardware/control", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // 토큰 추가
                },
                body: JSON.stringify({
                    device: selectedDevice,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setResponseMessage(`Device added successfully: ${data.device}, farmID: ${data.farmID}`);
            } else if (response.status === 400) {
                setResponseMessage("Bad Request: Invalid input");
            } else {
                setResponseMessage("Server Error");
            }
        } catch (error) {
            setResponseMessage("An error occurred: " + error.message);
        }
    };

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <Select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
                    <option value="">디바이스 선택</option>
                    <option value="Airconditioner">Airconditioner</option>
                    <option value="Humidifier">Humidifier</option>
                    <option value="Blind">Blind</option>
                    <option value="Fertilizer">Fertilizer</option>
                </Select>
                <SubmitButton type="submit">추가하기</SubmitButton>
                {responseMessage && <p>{responseMessage}</p>}
            </Form>
        </FormWrapper>
    );
};

const AddProfileButton = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    return (
        <>
            <Container onClick={() => setIsFormVisible(!isFormVisible)}>
                <Image src="/img/profile/add.svg" alt="Add Device"></Image>
            </Container>
            {isFormVisible && <AddDeviceForm />}
        </>
    );
};

export default AddProfileButton;
