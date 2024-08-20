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

const Container = styled.div`
    width: ${(1 - GetLayoutWidthRatio()) * 100 + "%"};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const testData: {[index: string]: ICardProps[]} = {
    'cardDatas': [
        {imageURL:"/img/profile/grains/rice.svg", profileName:"AAA", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"BBB", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"CCC", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"DDD", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"EEE", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"FFF", type:"Orange"}
    ]
};

const ProfileSelection: React.FC = () => {

    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState<number | null>(null);

    const handleDelete = (index: number) => {
        setProfileToDelete(index);
        setShowPopup(true);
    };

    const handleConfirmDelete = () => {
        if (profileToDelete !== null) {
            testData.cardDatas.splice(profileToDelete, 1);
            setShowPopup(false);
            setProfileToDelete(null);
        }
    };

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
            <CardViewer cardDatas={testData.cardDatas} handleDelete={handleDelete}></CardViewer>
            <AddProfileButton></AddProfileButton>
            {showPopup && 
                <Popup 
                    message="정말 이 프로필을 삭제하시겠습니까?" 
                    onConfirm={handleConfirmDelete} 
                    onCancel={handleCancelDelete} 
                />
            }
        </Container>
    );
}

export default ProfileSelection;
