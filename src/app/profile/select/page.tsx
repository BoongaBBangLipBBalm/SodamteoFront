// page.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardViewer from "./components/cardViewer";
import AddProfileButton from "./components/addProfile";
import { ICardDataProps } from "./components/cardViewer";
import { GetLayoutWidthRatio } from "@/components/nav/nav";
import Popup from "./components/Popup";
import { ICardProps } from "./components/card";
import { getRequest, deleteRequest } from "@/utils/api";

const Container = styled.div`
    width: ${(1 - GetLayoutWidthRatio()) * 100 + "%"};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GetCropImgURL = (cropName: string): string => {
    return "/img/profile/grains/" + cropName + ".svg";
}

const PushCardDataByAPI = (data: any): {[index: string]: ICardProps[]} => {
    let cardList: {[index: string]: ICardProps[]} = {'cardDatas':[]};
    if(data.length === 0) return cardList;
    for(let i = 0 ; i < data.length ; i++) {
        let newCardData: ICardProps = {
            cropName:data[i].cropName, 
            farmID:data[i].farmID, 
            farmName: data[i].farmName, 
            imageURL: GetCropImgURL(data[i].cropName),
            temperature: data[i].temperature,
            humidity: data[i].humidity,
            ph: data[i].ph,
            rainfall: data[i].rainfall
        };
        cardList.cardDatas.push(newCardData);
    }
    return cardList;
}

const ProfileSelection: React.FC = () => {
    const [cardList, setCardList] = useState<{[index: string]: ICardProps[]}>({"cardDatas":[
        {
            "farmID": -1,
            "farmName": "No Data",
            "cropName": "No Crop",
            "imageURL": "",
            "temperature": 0.1,
            "humidity": 0.2,
            "ph": 0.3,
            "rainfall": 0.4
        },
        {
            "farmID": -1,
            "farmName": "No Data",
            "cropName": "No Crop",
            "imageURL": "",
            "temperature": 0.1,
            "humidity": 0.2,
            "ph": 0.3,
            "rainfall": 0.4
        },
        {
            "farmID": -1,
            "farmName": "No Data",
            "cropName": "No Crop",
            "imageURL": "",
            "temperature": 0.1,
            "humidity": 0.2,
            "ph": 0.3,
            "rainfall": 0.4
        }
    ]});

    const getdata = async () => {
        try {
            const response = await getRequest("/api/farm/getallfarms");
            let tempData = PushCardDataByAPI(response);
            if(tempData.cardDatas.length !== 0) {
                setCardList(tempData);
            }
        } catch (error) {
            alert('조회 에러');
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState<number | null>(null);


    const handleCancelDelete = () => {
        setShowPopup(false);
        setProfileToDelete(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/select');
    };

    return (
        <Container>
            <CardViewer 
                setCardList={setCardList} 
                cardDatas={cardList.cardDatas} 
                startDataIdx={0} 
            />
            <AddProfileButton />
        </Container>
    );
}

export default ProfileSelection;
