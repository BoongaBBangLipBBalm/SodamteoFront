import styled from "styled-components";
import Card from "./components/card";
import ProfileMoveButton from "./components/ProfileMoveButton";
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./cardViewer.module.css";
import { ICardProps } from "./components/card";

const ViewerConatiner = styled.div`

    width: 100%;
    padding: 0 3.68rem;
    
`;

export interface ICardDataProps {
    cardDatas: ICardProps[]
}

const Wrapper = styled.div`
    .slick-prev {
        
    }
    .slick-next {

    }
    .slick-prev:before,
    .slick-next:before {
        content: "";
        width: 0;
        height: 0;
    }
`;

const CardViewer = (props: ICardDataProps) => {

    const [currentIndex, setIndex] = useState(0);

    const MovePrev = () => {
        setIndex((currentIndex-1)%props.cardDatas.length);
        console.log("test1");
    }

    const MoveNext = () => {
        setIndex((currentIndex+1)%props.cardDatas.length);
        console.log("test2");
    }

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
        prevArrow:<button><div className={styles.divEffect}><img onClick={MovePrev} src="img/profile/move_previous.svg" alt="" className={styles.imgSize}/></div></button>,
        nextArrow:<button><div className={styles.divEffect}><img onClick={MoveNext} src="img/profile/move_next.svg" alt="" className={styles.imgSize}/></div></button>
    }

    return (
        <ViewerConatiner>
            <Wrapper>
                <Slider {...Setting}>
                    {props.cardDatas.map((data, index) => (
                        <div key={index}>
                            {
                                currentIndex === index
                                ? <Card data={data} isSelected={true} ></Card>
                                : <Card data={data} isSelected={false} ></Card>
                            }
                        </div>
                    ))}
                </Slider>
            </Wrapper>
        </ViewerConatiner>
        
    )
}

export default CardViewer;