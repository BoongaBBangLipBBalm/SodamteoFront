import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface IDoubleRangeProps {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}

interface SliderProps {
  min: number;
  max: number;
  onChange: (minValue: number, maxValue: number) => void;
  steps?: number;
  unit?: string;
  leftThumbColor?: string;
  rightThumbColor?: string;
  trackColor?: string;
  rangeColor?: string;
  minValue: number;
  setMinValue: (value: number) => void;
  maxValue: number;
  setMaxValue: (value: number) => void;
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}

const RangeSliderContainer = styled.div`
  width: 100%;
  position: relative;
  height: 6rem; /* Adjusted height to accommodate thumb labels */
  margin: 0 1rem;
`;

const Slider = styled.input.attrs({ type: 'range' })<{
  thumbColor: string;
  disabled: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 0.5rem;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
  -webkit-appearance: none;
  background: transparent;
  top: 35%; /* Positioned the slider lower to make room for thumb labels */
  background-color: ${(props) => (props.disabled ? '#ccc' : 'transparent')};

  &::-webkit-slider-thumb {
    pointer-events: all;
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 50%;
    background: ${(props) => (props.disabled ? '#888' : props.thumbColor)};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    -webkit-appearance: none;
    position: relative;
    z-index: 2; /* Ensure thumb is above the track */
    top: -25%; /* Thumb position relative to the slider */
    filter: drop-shadow(0 0.125rem 0.5rem rgba(0, 0, 0, 0.25));
  }

  &::-moz-range-thumb {
    pointer-events: all;
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 50%;
    background: ${(props) => (props.disabled ? '#888' : props.thumbColor)};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    position: relative;
    z-index: 2; /* Ensure thumb is above the track */
    top: -25%; /* Thumb position relative to the slider */
    filter: drop-shadow(0 0.125rem 0.5rem rgba(0, 0, 0, 0.25));
  }
`;

const Track = styled.div<{
  $minValue: number;
  $maxValue: number;
  min: number;
  max: number;
  $trackColor: string;
  $rangeColor: string;
  disabled: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 0.5rem;
  top: 35%; /* Positioned to match the slider */
  background: ${(props) => props.disabled ? '#ccc' : `linear-gradient(
    to right,
    ${props.$trackColor} ${(props.$minValue - props.min) / (props.max - props.min) * 100}%,
    ${props.$rangeColor} ${(props.$minValue - props.min) / (props.max - props.min) * 100}%,
    ${props.$rangeColor} ${(props.$maxValue - props.min) / (props.max - props.min) * 100}%,
    ${props.$trackColor} ${(props.$maxValue - props.min) / (props.max - props.min) * 100}%
  )`};
  border-radius: 0.25rem;
  box-shadow: inset 0 0.125rem 0.5rem rgba(0,0,0,0.5);
`;

const ThumbValue = styled.div<{ position: string; disabled: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props) => props.position};
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: bold;
  color: ${(props) => (props.disabled ? '#888' : '#333')};
  margin-bottom: 1rem;
  z-index: 3; /* Ensure thumb value is above the slider */
`;

const LabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 3.5rem; /* Adjust padding to align labels below the slider */
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LabelLine = styled.div`
  width: 2px;
  height: 10px;
  background-color: #333;
  margin-bottom: 0.25rem;
`;

const Label = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  color: #333;
`;

const ToggleButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.disabled ? '#888' : '#4caf50')};
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 1rem;
  font-weight: bold;
`;

const DoubleRangeSlider: React.FC<SliderProps> = ({
  min,
  max,
  onChange,
  steps = 5,
  unit = '',
  leftThumbColor = '#4caf50',
  rightThumbColor = '#f44336',
  trackColor = '#ddd',
  rangeColor = '#4caf50',
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  isEnabled,
  setIsEnabled
}) => {

  useEffect(() => {
    setMinValue(minValue);
    setMaxValue(maxValue);
  }, [min, max, setMinValue, setMaxValue]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
    onChange(value, maxValue);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
    onChange(minValue, value);
  };

  const stepValues = Array.from(
    { length: steps },
    (_, i) => min + (i * (max - min)) / (steps - 1)
  );

  return (
    <RangeSliderContainer>
      <Track
        $minValue={minValue}
        $maxValue={maxValue}
        min={min}
        max={max}
        $trackColor={trackColor}
        $rangeColor={rangeColor}
        disabled={!isEnabled}
      />
      <Slider
        value={minValue}
        min={min}
        max={max}
        onChange={handleMinChange}
        thumbColor={leftThumbColor}
        disabled={!isEnabled}
      />
      <Slider
        value={maxValue}
        min={min}
        max={max}
        onChange={handleMaxChange}
        thumbColor={rightThumbColor}
        disabled={!isEnabled}
      />
      <ThumbValue position={`${((minValue - min) / (max - min)) * 100}%`} disabled={!isEnabled}>
        {minValue}{unit}
      </ThumbValue>
      <ThumbValue position={`${((maxValue - min) / (max - min)) * 100}%`} disabled={!isEnabled}>
        {maxValue}{unit}
      </ThumbValue>
      <LabelsContainer>
        {stepValues.map((value, index) => (
          <LabelContainer key={index}>
            <LabelLine />
            <Label>{Math.round(value)}{unit}</Label>
          </LabelContainer>
        ))}
      </LabelsContainer>
      <ToggleButton onClick={() => setIsEnabled(!isEnabled)}>
        {isEnabled ? 'Disable' : 'Enable'}
      </ToggleButton>
    </RangeSliderContainer>
  );
};

export default DoubleRangeSlider;
