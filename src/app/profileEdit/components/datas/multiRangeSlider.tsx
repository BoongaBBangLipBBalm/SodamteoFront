import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SliderSetting = {
  non_selected_color: "#E8E8E8",
  selected_color: "#04293A",
  init_left_value: 0.3,
  init_right_value: 0.8,
  width: 80,
  offset: 2
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 6rem;
`;

const MinSlider = styled.input`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(0, -50%);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 100px;
  box-shadow: inset 0 0.125rem 0.5rem rgba(0,0,0,0.5);
  
  &:focus {
    
  }
  &:hover {
    
  }
  &::-webkit-slider-thumb {
    position: relative;
    z-index: 1;
    -webkit-appearance: none;
    border: none;
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 50%;
    background: goldenrod;
    margin-top: 0.3125rem;
    transform: translate(0, -50%);
    pointer-events: all;
  }
  &::-webkit-slider-runnable-track {
    height: 0.625rem;
    z-index: 0;
  }
`;
const MaxSlider = styled.input`
  position: absolute;
  top: 50%;
  right: 0;
  margin-right: 10%;
  transform: translate(0, -50%);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 100px;
  box-shadow: inset 0 0.125rem 0.5rem rgba(0,0,0,0.5);
  
  &:focus {
    
  }
  &:hover {
    
  }
  &::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    border: none;
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 100px;
    background: #20da64;
    margin-top: 0.3125rem;
    transform: translate(0, -50%);
    z-index: 1;
    pointer-events: all;
  }
  &::-webkit-slider-runnable-track {
    height: 0.625rem;
    z-index: 0;
  }
`;

function GetWidthPercentage(left: number, right: number, current: number, isMax: boolean): string {

  let value = (current - left)/(right - left);
  if(isMax) {
    value = 1 - value;
  }
  let result = String(value*SliderSetting.width) + "%";
  return result;
  
}

function GetPercentage(left: number, right: number, current: number): string {
  let value = (current - left)/(right - left);
  return String(value * 100) + "%";
}

interface ISliderProps {
  min: number;
  max: number;
}

const MultiRangeSlider = (props: ISliderProps) => {

  const GetLength = (): number => {
    return props.max - props.min;
  }

  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const minValRef = useRef(SliderSetting.init_left_value * GetLength());
  const maxValRef = useRef(SliderSetting.init_right_value * GetLength());

  const [minValue, SetMinValue] = useState<number>(SliderSetting.init_left_value * GetLength());
  const [maxValue, SetMaxValue] = useState<number>(SliderSetting.init_right_value * GetLength());



  useEffect(() => {
    if(minRef.current) {
      minRef.current.style.background = `linear-gradient(to right, ${SliderSetting.non_selected_color} 0%, ${SliderSetting.non_selected_color} ${GetPercentage(props.min, maxValue, minValRef.current)}, ${SliderSetting.selected_color} ${GetPercentage(props.min, maxValue, minValRef.current)}, ${SliderSetting.selected_color} 100%)`;
      minRef.current.style.width = GetWidthPercentage(props.min, props.max, maxValue, false);
    }
    if(maxRef.current) {
      maxRef.current.style.background = `linear-gradient(to right, ${SliderSetting.selected_color} 0%, ${SliderSetting.selected_color} ${GetPercentage(minValue, props.max, maxValRef.current)}, ${SliderSetting.non_selected_color} ${GetPercentage(minValue, props.max, maxValRef.current)}, ${SliderSetting.non_selected_color} 100%)`;
      maxRef.current.style.width = GetWidthPercentage(props.min, props.max, minValue, true);
    }
  }, [])

  useEffect(() => {
    if(minRef.current) {
      
      minRef.current.style.background = `linear-gradient(to right, ${SliderSetting.non_selected_color} 0%, ${SliderSetting.non_selected_color} ${GetPercentage(props.min, maxValue, minValRef.current)}, ${SliderSetting.selected_color} ${GetPercentage(props.min, maxValue, minValRef.current)}, ${SliderSetting.selected_color} 100%)`;
      minRef.current.style.width = `${GetWidthPercentage(props.min, props.max, maxValue, false)}`;
    }
    if(maxRef.current) {
      maxRef.current.style.background = `linear-gradient(to right, ${SliderSetting.selected_color} 0%, ${SliderSetting.selected_color} ${GetPercentage(minValue, props.max, maxValRef.current)}, ${SliderSetting.non_selected_color} ${GetPercentage(minValue, props.max, maxValRef.current)}, ${SliderSetting.non_selected_color} 100%)`;
      maxRef.current.style.width = `${GetWidthPercentage(props.min, props.max, minValue, true)}`;
    }
    
  }, [minValue, maxValue]);

  return (
    <Container>
      <MinSlider ref={minRef} type="range" min={props.min} max={maxValue} onChange={(event: ChangeEvent<HTMLInputElement>) => {  
            const value = Number(event.target.value);
            SetMinValue(value);
            minValRef.current = value;
          }}
          defaultValue={minValue}
          ></MinSlider>
      <MaxSlider ref={maxRef} type="range" min={minValue} max={props.max} onChange={(event: ChangeEvent<HTMLInputElement>) => {  
            const value = Number(event.target.value);
            SetMaxValue(value);
            maxValRef.current = value;
          }}
          defaultValue={maxValue}
          ></MaxSlider>
    </Container>
  )
}

export default MultiRangeSlider;