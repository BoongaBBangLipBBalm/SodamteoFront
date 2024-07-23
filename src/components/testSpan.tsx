"use client";

import styled from 'styled-components';


interface ISpan {
    text: string;
}

const StyledSpan = styled.span`
  color: black;
`;

const TestSpan = ({ text }: ISpan) => {
    return (
        <StyledSpan>{text}</StyledSpan>
    )
}

export default TestSpan;