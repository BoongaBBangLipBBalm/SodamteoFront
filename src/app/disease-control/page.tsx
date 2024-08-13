"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Chart from "./components/Chart";
import Navbar from "./components/Navbar";
import { useState } from "react";

const sampleData: any = {
    'Bacterialblight': [
      { timestamp: Date.now() - 10000000, diseaseName: 'Bacterialblight', confidence: 'High', message: 'Message 1' },
      { timestamp: Date.now() - 5000000, diseaseName: 'Bacterialblight', confidence: 'Medium', message: 'Message 2' },
      { timestamp: Date.now(), diseaseName: 'Bacterialblight', confidence: 'High', message: 'Message 3' },
    ],
    'Blast': [
      { timestamp: Date.now() - 10000000, diseaseName: 'Blast', confidence: 'Low', message: 'Message 1' },
      { timestamp: Date.now() - 5000000, diseaseName: 'Blast', confidence: 'Medium', message: 'Message 2' },
      { timestamp: Date.now(), diseaseName: 'Blast', confidence: 'High', message: 'Message 3' },
    ],
    'Brownspot': [
      { timestamp: Date.now() - 10000000, diseaseName: 'Brownspot', confidence: 'High', message: 'Message 1' },
      { timestamp: Date.now() - 5000000, diseaseName: 'Brownspot', confidence: 'High', message: 'Message 2' },
      { timestamp: Date.now(), diseaseName: 'Brownspot', confidence: 'Medium', message: 'Message 3' },
    ],
    'Tungro': [
      { timestamp: Date.now() - 10000000, diseaseName: 'Tungro', confidence: 'High', message: 'Message 1' },
      { timestamp: Date.now() - 5000000, diseaseName: 'Tungro', confidence: 'High', message: 'Message 2' },
      { timestamp: Date.now(), diseaseName: 'Tungro', confidence: 'Low', message: 'Message 3' },
    ],
};
  
const Container = styled.div`
    width: 80%;
    margin: auto;
    padding: 20px;
`;

const DiseaseControl = () => {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/disease-control');
    };
  
    const [selectedDisease, setSelectedDisease] = useState<string>('Bacterialblight');

    return (
        <Container>
        <h1>Disease Dashboard</h1>
        <Navbar
            diseases={Object.keys(sampleData)}
            selectedDisease={selectedDisease}
            onSelect={setSelectedDisease}
        />
        <Chart data={sampleData[selectedDisease]} />
        </Container>
    );
}

export default DiseaseControl;