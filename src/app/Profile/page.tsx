"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
import CardViewer from "./components/cardViewer";
import ProfileMoveButton from "./components/ProfileMoveButton";
import AddProfileButton from "./components/addProfile";
import SwiperTest from "./components/cardSwiper";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin: 0 1.688rem;
`;

const ProfileSelection: React.FC = () => {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/Profile');
    };

    return (
        <Container>
            <SwiperTest></SwiperTest>
            <AddProfileButton></AddProfileButton>
        </Container>
    )
    
}

export default ProfileSelection;