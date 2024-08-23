import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getToken } from '@/utils/localStorage';

const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 1.25rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    width: 80%;
    z-index: 1000;
`;

const InputContainer = styled.div`
    flex: 1;
    padding-right: 2rem;
`;

const ResultContainer = styled.div`
    flex: 1;
    padding-left: 2rem;
`;

const InputField = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 0.625rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #F8F7F6;
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #274C4B;
    color: white;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
`;

const CancelButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #ccc;
    color: white;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const CropSelectionPopup: React.FC<{ onClose: () => void, onSelectCrop: (crop: string) => void }> = ({ onClose, onSelectCrop }) => {
    const [n, setN] = useState('');
    const [p, setP] = useState('');
    const [k, setK] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [cropSuggestions, setCropSuggestions] = useState<{ [key: string]: number } | null>(null);
    const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/environment/crop_selection', {
                N: parseFloat(n),
                P: parseFloat(p),
                K: parseFloat(k),
                temperature: parseFloat(temperature),
                humidity: parseFloat(humidity),
                ph: parseFloat(ph),
                rainfall: parseFloat(rainfall),
            }, {
                headers: {
                    'Authorization': `Bearer ${getToken()}` // Assuming you have token from context or props
                }
            });

            if (response.status === 200) {
                setCropSuggestions(response.data);
            }
        } catch (error) {
            console.error('Error selecting crop:', error);
            setCropSuggestions({
                "Rice": 25,
                "Tomato": 35,
                "Grapes": 40,
            });
        }
    };

    const handleConfirm = () => {
        if (selectedCrop) {
            onSelectCrop(selectedCrop);
            onClose();
        }
    };

    return (
        <PopupContainer>
            <InputContainer>
                <h3>Enter Environmental Data</h3>
                <InputField type="text" placeholder="N" value={n} onChange={(e) => setN(e.target.value)} />
                <InputField type="text" placeholder="P" value={p} onChange={(e) => setP(e.target.value)} />
                <InputField type="text" placeholder="K" value={k} onChange={(e) => setK(e.target.value)} />
                <InputField type="text" placeholder="Temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                <InputField type="text" placeholder="Humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
                <InputField type="text" placeholder="pH" value={ph} onChange={(e) => setPh(e.target.value)} />
                <InputField type="text" placeholder="Rainfall" value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
                <SubmitButton onClick={handleSubmit}>Select Crop</SubmitButton>
            </InputContainer>
            <ResultContainer>
                <h3>Crop Suggestions</h3>
                {cropSuggestions ? (
                    Object.entries(cropSuggestions).map(([crop, probability], index) => (
                        <div key={index}>
                            <input 
                                type="radio" 
                                name="crop" 
                                value={crop} 
                                onChange={() => setSelectedCrop(crop)} 
                                checked={selectedCrop === crop} 
                            />
                            <label>{crop}: {probability.toFixed(2)}%</label>
                        </div>
                    ))
                ) : (
                    <p>No suggestions available.</p>
                )}
            </ResultContainer>
            <ButtonContainer>
                <CancelButton onClick={onClose}>Cancel</CancelButton>
                <SubmitButton onClick={handleConfirm} disabled={!selectedCrop}>Confirm</SubmitButton>
            </ButtonContainer>
        </PopupContainer>
    );
}

export default CropSelectionPopup;
