import React, { useEffect, useState } from 'react';
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
    width: 100%;
    height: 100%;
    z-index: 1000;
`;

const InputContainer = styled.div`
    flex: 1;
    padding-right: 2rem;
`;

const ResultContainer = styled.div`
    flex: 1;
    padding-top: 1rem;
`;

const SliderContainer = styled.div`
    margin-bottom: 1rem;
`;

const SliderLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
`;

const SliderInput = styled.input`
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    background: #ddd;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    border-radius: 5px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background: #274C4B;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.2s;
    }

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: #274C4B;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.2s;
    }

    &:hover::-webkit-slider-thumb {
        background: #43545B;
    }

    &:hover::-moz-range-thumb {
        background: #43545B;
    }
`;

const SliderValue = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
    font-family: 'Pretendard-regular';
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
    font-family: 'Pretendard-regular';
    padding: 0.5rem 1rem;
    background-color: #43545B;
    color: white;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const AllContainer = styled.div`
    overflow-y: scroll;
    padding: 1rem 1rem 1rem 0;
    scrollbar-width: thin;
    scrollbar-color: #43545B #ccc;
    
    &::-webkit-scrollbar {
        width: 12px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: #ccc;
        border-radius: 6px;
    }
`;

const Name = styled.h3`
    padding-bottom: 1rem;
`;

const StyledInput = styled.input`
    margin-right: 0.5rem;
    accent-color: #274C4B;
    cursor: pointer;
    vertical-align: middle;
    margin-bottom: 0.5rem;

    /* Custom radio button styles */
    &[type="radio"] {
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid #43545B;
        border-radius: 50%;
        position: relative;
        outline: none;
        background-color: white;
        transition: background-color 0.2s, border-color 0.2s;

        &:checked::before {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #274C4B;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &:hover {
            border-color: #274C4B;
        }
    }
`;

const Divider = styled.hr`
    border: 0;
    height: 1px;
    background: #ddd;
    margin: 1rem 0;
`;

const CropSelectionPopup: React.FC<{ onClose: () => void, onSelectCrop: (crop: string) => void }> = ({ onClose, onSelectCrop }) => {
    const [n, setN] = useState(0);
    const [nMin, setNMin] = useState(0);
    const [nMax, setNMax] = useState(100);
    const [p, setP] = useState(0);
    const [pMin, setPMin] = useState(0);
    const [pMax, setPMax] = useState(100);
    const [k, setK] = useState(0);
    const [kMin, setKMin] = useState(0);
    const [kMax, setKMax] = useState(100);
    const [temperature, setTemperature] = useState(0);
    const [temperatureMin, setTemperatureMin] = useState(-10);
    const [temperatureMax, setTemperatureMax] = useState(50);
    const [humidity, setHumidity] = useState(0);
    const [humidityMin, setHumidityMin] = useState(0);
    const [humidityMax, setHumidityMax] = useState(100);
    const [ph, setPh] = useState(0);
    const [phMin, setPhMin] = useState(0);
    const [phMax, setPhMax] = useState(14);
    const [rainfall, setRainfall] = useState(0);
    const [rainfallMin, setRainfallMin] = useState(0);
    const [rainfallMax, setRainfallMax] = useState(500);
    const [cropSuggestions, setCropSuggestions] = useState<{ [key: string]: number } | null>(null);
    const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/environment/crop_selection', {
                N: n,
                P: p,
                K: k,
                temperature,
                humidity,
                ph,
                rainfall,
            }, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            setCropSuggestions(response.data);
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
            const result = selectedCrop[0].toUpperCase() + selectedCrop.slice(1);
            onSelectCrop(result);
            onClose();
        }
    };

    return (
        <PopupContainer>
            <AllContainer>
                <InputContainer>
                    <Name>환경 정보 입력</Name>

                    <SliderContainer>
                        <SliderLabel>Nitrogen (N)</SliderLabel>
                        <SliderInput 
                            type="range" 
                            min={nMin} 
                            max={nMax} 
                            value={n} 
                            onChange={(e) => setN(parseFloat(e.target.value))} 
                        />
                        <SliderValue>
                            <span>{nMin}</span>
                            <span>{n}</span>
                            <span>{nMax}</span>
                        </SliderValue>
                    </SliderContainer>

                    <SliderContainer>
                        <SliderLabel>Phosphorus (P)</SliderLabel>
                        <SliderInput 
                            type="range" 
                            min={pMin} 
                            max={pMax} 
                            value={p} 
                            onChange={(e) => setP(parseFloat(e.target.value))} 
                        />
                        <SliderValue>
                            <span>{pMin}</span>
                            <span>{p}</span>
                            <span>{pMax}</span>
                        </SliderValue>
                    </SliderContainer>

                    <SliderContainer>
                        <SliderLabel>Potassium (K)</SliderLabel>
                        <SliderInput 
                            type="range" 
                            min={kMin} 
                            max={kMax} 
                            value={k} 
                            onChange={(e) => setK(parseFloat(e.target.value))} 
                        />
                        <SliderValue>
                            <span>{kMin}</span>
                            <span>{k}</span>
                            <span>{kMax}</span>
                        </SliderValue>
                    </SliderContainer>

                    <SliderContainer>
                        <SliderLabel>Temperature (&deg;C)</SliderLabel>
                        <SliderInput 
                            type="range" 
                            min={temperatureMin} 
                            max={temperatureMax} 
                            value={temperature} 
                            onChange={(e) => setTemperature(parseFloat(e.target.value))} 
                        />
                        <SliderValue>
                            <span>{temperatureMin}</span>
                            <span>{temperature}</span>
                            <span>{temperatureMax}</span>
                        </SliderValue>
                    </SliderContainer>

                    <SliderContainer>
                        <SliderLabel>Humidity (%)</SliderLabel>
                        <SliderInput 
                            type="range" 
                            min={humidityMin} 
                            max={humidityMax} 
                            value={humidity} 
                            onChange={(e) => setHumidity(parseFloat(e.target.value))} 
                        />
                        <SliderValue>
                            <span>{humidityMin}</span>
                            <span>{humidity}</span>
                            <span>{humidityMax}</span>
                        </SliderValue>
                    </SliderContainer>

                    <SliderContainer>
                        <SliderLabel>pH</SliderLabel>
                        <SliderInput 
                            type="range" 
                            min={phMin} 
                            max={phMax} 
                            value={ph} 
                            onChange={(e) => setPh(parseFloat(e.target.value))} 
                        />
                        <SliderValue>
                            <span>{phMin}</span>
                            <span>{ph}</span>
                            <span>{phMax}</span>
                        </SliderValue>
                    </SliderContainer>

                    <SliderContainer>
                        <SliderLabel>Rainfall (mm)</SliderLabel>
                        <SliderInput 
                            type="range" 
                            min={rainfallMin} 
                            max={rainfallMax} 
                            value={rainfall} 
                            onChange={(e) => setRainfall(parseFloat(e.target.value))} 
                        />
                        <SliderValue>
                            <span>{rainfallMin}</span>
                            <span>{rainfall}</span>
                            <span>{rainfallMax}</span>
                        </SliderValue>
                    </SliderContainer>

                    <SubmitButton onClick={handleSubmit}>작물 추천</SubmitButton>
                </InputContainer>
                <Divider />
                <ResultContainer>
                    <Name>추천 작물</Name>
                    {cropSuggestions ? (
                        Object.entries(cropSuggestions).map(([crop, probability], index) => (
                            <div key={index}>
                                <StyledInput 
                                    type="radio" 
                                    name="crop" 
                                    value={crop} 
                                    onChange={() => setSelectedCrop(crop)} 
                                    checked={selectedCrop === crop} 
                                />
                                <label>{crop}: {(probability*100).toFixed(2)}%</label>
                            </div>
                        ))
                    ) : (
                        <p>추천 작물이 없습니다.</p>
                    )}
                </ResultContainer>
            </AllContainer>
            <ButtonContainer>
                <CancelButton onClick={onClose}>취소</CancelButton>
                <SubmitButton onClick={handleConfirm} disabled={!selectedCrop}>완료</SubmitButton>
            </ButtonContainer>
        </PopupContainer>
    );
}

export default CropSelectionPopup;
