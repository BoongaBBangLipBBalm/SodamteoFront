import styled from "styled-components";
import DataPreset from "../DataPreset"
import DoubleRangeSlider, { IDoubleRangeProps } from "../doubleRangeSlider"
import { useState } from "react";

const DataContainer = styled.div`
    display: flex;
    width: 100%; /* Ensure it takes the full width of its container */
    align-items: center;
    margin-bottom: 1.25rem;
`;

const Humidity = (data: IDoubleRangeProps) => {

    const [range, setRange] = useState({ min: 10, max: 90 });

    const handleRangeChange = (minValue: number, maxValue: number) => {
        setRange({ min: minValue, max: maxValue });
    };

    return (
        <DataPreset
            title="Humidity"
            dataContainers={[
                <DataContainer key="1">
                    <DoubleRangeSlider setMinValue={data.setMinValue} setMaxValue={data.setMaxValue} minValue={data.minValue} maxValue={data.maxValue} isEnabled={data.isEnabled} setIsEnabled={data.setIsEnabled}
                        min={0} 
                        max={100} 
                        steps={6}
                        onChange={handleRangeChange} 
                        leftThumbColor="#56656C"    // left thumb 색상
                        rightThumbColor="#ffffff"   // right thumb 색상
                        trackColor="#E8E8E8"           // 선택되지 않은 막대기 부분 색상
                        rangeColor="#04293A"        // 선택된 범위의 막대기 부분 색상
                        unit="%"
                    />
                </DataContainer>
            ]}
        />
        
    )
}

export default Humidity;