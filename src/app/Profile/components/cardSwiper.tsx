import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import Card from "./card";
import { ICardProps } from "./card";
import { GetPageWidth } from "@/utils/getPageInfo";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

let cardData: ICardProps[] = [
    {imageURL:"/img/profile/grains/rice.svg", isSelected:false, profileName:"", type:""},
    {imageURL:"/img/profile/grains/rice.svg", isSelected:false, profileName:"", type:""},
    {imageURL:"/img/profile/grains/rice.svg", isSelected:false, profileName:"", type:""},
    {imageURL:"/img/profile/grains/rice.svg", isSelected:false, profileName:"", type:""},
    {imageURL:"/img/profile/grains/rice.svg", isSelected:false, profileName:"", type:""},
    {imageURL:"/img/profile/grains/rice.svg", isSelected:false, profileName:"", type:""},
    {imageURL:"/img/profile/grains/rice.svg", isSelected:false, profileName:"", type:""}
];

export default function SwiperTest() {

    SwiperCore.use([Navigation, Scrollbar, Autoplay]);

    console.log(GetPageWidth());

    return (
      <div className="swiper-container">
        
        <Swiper
          loop={true} // 슬라이드 루프
          spaceBetween={0}
          slidesPerView={3}
          navigation={true}
          width={GetPageWidth()}
        >
          {cardData.map((props, index) => (
            <SwiperSlide key={index}>          
                <Card imageURL={props.imageURL} isSelected={props.isSelected} profileName={props.profileName} type={props.type}></Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }