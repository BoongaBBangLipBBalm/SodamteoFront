import { useRef } from "react";
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
    {imageURL:"/img/profile/grains/rice.svg", isSelected:false, profileName:"", type:""}
];

export default function SwiperTest() {

    SwiperCore.use([Navigation, Scrollbar, Autoplay]);

    console.log(GetPageWidth());

    return (
      <div className="swiper-container">
        
        <Swiper
          loop={true}
          spaceBetween={30}
          slidesPerView={3}
          navigation={true}
          width={GetPageWidth()}
        >
          {cardData.map((props, index) => (
            <SwiperSlide key={index}>
              <div>
                <Card imageURL={props.imageURL} isSelected={props.isSelected} profileName={String(index)} type={props.type}></Card>
              </div>         
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }