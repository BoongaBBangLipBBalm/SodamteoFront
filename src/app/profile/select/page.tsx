"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styled from "styled-components";
import CardViewer from "./cardViewer";
import AddProfileButton from "./components/addProfile";
import { ICardDataProps } from "./cardViewer";
import { ICardProps } from "./components/card";
import { GetLayoutWidthRatio } from "@/components/nav/nav";

const Container = styled.div`
    width: ${(1 - GetLayoutWidthRatio()) * 100 + "%"};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const testData: ICardDataProps = {
    cardDatas: [
        {imageURL:"/img/profile/grains/rice.svg", profileName:"AAA", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"BBB", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"CCC", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"DDD", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"EEE", type:"Orange"},
        {imageURL:"/img/profile/grains/rice.svg", profileName:"FFF", type:"Orange"}
    ]
}

const ProfileSelection: React.FC = () => {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/select');
    };

    return (
        <Container>
            <CardViewer cardDatas={testData.cardDatas}></CardViewer>
            <AddProfileButton></AddProfileButton>
        </Container>
    )
    
}

export default ProfileSelection;