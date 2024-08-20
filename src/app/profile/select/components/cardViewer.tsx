// cardViewer.tsx
import styled from "styled-components";
import Card from "./card";
import ProfileMoveButton from "./ProfileMoveButton";
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./cardViewer.module.css";
import { ICardProps } from "./card";

const ViewerConatiner = styled.div`
    
    width: 100%;
    padding: 0 3.68rem;
    
`;

export interface ICardDataProps {
    cardDatas: ICardProps[];
    handleDelete: (index: number)=>void;
}

const Wrapper = styled.div`
    
    .slick-initialized {
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;

const StyledSlider = styled(Slider)`
    
    height: 100%;
    width: 100%;
    position: relative;
    .slick-prev::before,
    .slick-next::before {
        opacity: 0;
        display: none;  
    }
    .slick-track {
        display: flex;
        align-items: center;
        vertical-align: center;
    }
`;

const SliderPrevButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    left: 0px;
    z-index: 3;
`;
const SliderNextButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    right: 0px;
    z-index: 3;
`;

const SliderButtonDiv = styled.div`
    background-color: rgb(255, 255, 255);
    filter: drop-shadow(1px 1px 10px rgba(0,0,0,0.25));
    border-radius: 100%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
        width: 1.125rem;
        height: 1.125rem;
    }
`;

const CardViewer = (props: ICardDataProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cards, setCards] = useState(props.cardDatas);

    const MovePrev = () => {
        setCurrentIndex((currentIndex-1)%cards.length);
    }

    const MoveNext = () => {
        setCurrentIndex((currentIndex+1)%cards.length);
    }

    const PrevArrow = ({ currentSlide, slideCount, ...props }: any) => (
        <SliderPrevButton onClick={MovePrev}><SliderButtonDiv><img src="/img/profile/move_previous.svg" alt="<"></img></SliderButtonDiv></SliderPrevButton>
    )
    const NextArrow = ({ currentSlide, slideCount, ...props }: any) => (
        <SliderNextButton onClick={MoveNext}><SliderButtonDiv><img src="/img/profile/move_next.svg" alt="<"></img></SliderButtonDiv></SliderNextButton>
    )

    useEffect(() => {
    }, [currentIndex]);

    const Setting = {
        speed: 300,
        arrows: true,
        draggable: false,
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow:3,
        centerMode:true,
        centerPadding:"0",
        prevArrow:(<SliderPrevButton onClick={MovePrev}><SliderButtonDiv><img src="/img/profile/move_previous.svg" alt="<"></img></SliderButtonDiv></SliderPrevButton>),
        nextArrow:(<SliderNextButton onClick={MoveNext}><SliderButtonDiv><img src="/img/profile/move_next.svg" alt="<"></img></SliderButtonDiv></SliderNextButton>),
        afterChange: (newIndex: number) => {
            setCurrentIndex(newIndex);
        }
    }

    return (
        <ViewerConatiner>
            <Wrapper>
                <StyledSlider {...Setting}>
                    {cards.map((data, index) => (
                        <div key={index}>
                            {
                                currentIndex === index
                                ? <Card data={data} isSelected={true} onDelete={() => props.handleDelete(index)}></Card>
                                : <Card data={data} isSelected={false} onDelete={() => props.handleDelete(index)}></Card>
                            }
                        </div>
                    ))}
                </StyledSlider>
            </Wrapper>
        </ViewerConatiner>
        
    )
}

export default CardViewer;