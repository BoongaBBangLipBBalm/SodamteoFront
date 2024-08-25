import styled from "styled-components";
import Card from "./card";
import React, { useEffect, useRef, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ICardProps } from "./card";

const ViewerConatiner = styled.div`
    width: 100%;
    padding: 0 3.68rem;
`;

export interface ICardDataProps {
    cardDatas: ICardProps[];
    startDataIdx: number;
    setCardList: (cardList: { [index: string]: ICardProps[] }) => void;
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
        padding: 1rem 0;
    }
`;

const SliderPrevButton = styled.button<{ disabled: boolean }>`
    background-color: transparent;
    border: none;
    position: absolute;
    left: 0px;
    z-index: 3;
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SliderNextButton = styled.button<{ disabled: boolean }>`
    background-color: transparent;
    border: none;
    position: absolute;
    right: 0px;
    z-index: 3;
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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
    const sliderRef = useRef<Slider | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cards, setCards] = useState(props.cardDatas);
    const [isSliding, setIsSliding] = useState(false);  // Track if a slide transition is happening

    const goToSlide = (index: number) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };

    const handleSlideChange = (indexChange: number) => {
        if (!isSliding) {
            setIsSliding(true);
            setCurrentIndex((prevIndex) => {
                const newIndex = (prevIndex + indexChange + cards.length) % cards.length;
                goToSlide(newIndex);
                return newIndex;
            });
        }
    };

    const MovePrev = () => {
        handleSlideChange(-1);
    };

    const MoveNext = () => {
        handleSlideChange(1);
    };

    const PrevArrow = (props: any) => (
        <SliderPrevButton {...props} disabled={isSliding}>
            <SliderButtonDiv>
                <img src="/img/profile/move_previous.svg" alt="<" />
            </SliderButtonDiv>
        </SliderPrevButton>
    );

    const NextArrow = (props: any) => (
        <SliderNextButton {...props} disabled={isSliding}>
            <SliderButtonDiv>
                <img src="/img/profile/move_next.svg" alt=">" />
            </SliderButtonDiv>
        </SliderNextButton>
    );

    useEffect(() => {
        let cardResult: ICardProps[] = [];
        if(props.cardDatas.length != 0) {
            while(cardResult.length < 4) {
                cardResult = [...cardResult, ...props.cardDatas];
            }
        }
        setCards(cardResult);
    }, [props.cardDatas]);

    useEffect(() => {
        setCurrentIndex(props.startDataIdx);
        goToSlide(props.startDataIdx);
    }, [cards]);

    const Setting = {
        speed: 300,
        arrows: true,
        draggable: false,
        dots: false,
        slidesToScroll: 1,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: "0",
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        afterChange: (newIndex: number) => {
            setIsSliding(false);  // End transition
            setCurrentIndex(newIndex);
        }
    };

    return (
        <ViewerConatiner>
            <Wrapper>
                <StyledSlider {...Setting} ref={sliderRef}>
                    {cards.map((data, index) => (
                        <div key={index}>
                            {currentIndex === index
                                ? <Card data={data} isSelected={true} />
                                : <Card data={data} isSelected={false} />}
                        </div>
                    ))}
                </StyledSlider>
            </Wrapper>
        </ViewerConatiner>
    );
};

export default CardViewer;
