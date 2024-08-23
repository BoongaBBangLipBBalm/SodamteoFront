import styled from "styled-components";
import NavButton from "./button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GetButtonData } from "./button";

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    & > * {
        margin-bottom: 0.625rem;
    }
`;

interface IButtonListProps {
    listid: number;
}

interface IPageData {
    name: string;
    URLName: string;
    buttons_id: number[];
}

const page_data: IPageData[] = [
    {name: "null", URLName: "/null", buttons_id: [3]},
    {name: "profile", URLName: "/profile", buttons_id: [4,9]},
    {name: "data-statistics", URLName: "/data-statistics", buttons_id: [0,1,5,6,2,3]},
    {name: "control-hw", URLName: "/control-hw", buttons_id: [0,1,5,6,2,3]},
    {name: "change-profile", URLName: "/edit-profile", buttons_id: [0,1,5,6,2,3]},
    {name: "forecast", URLName: "/forecast", buttons_id: [0,1,5,6,2,3]},
    {name: "disease-control", URLName: "/disease-control", buttons_id: [0,1,5,6,2,3]},
    {name: "setting", URLName: "/setting", buttons_id: [0,1,5,6,2,3]},
    {name: "login", URLName: "/Login", buttons_id: [7,8]},
    {name: "register", URLName: "/sign-up", buttons_id: [7,8]},
    {name: "test2", URLName: "/test2", buttons_id: [2,3]},
];

const GetPageData = (page_name: string): IPageData => {
    for(var i = 1 ; i < page_data.length ; i++) {
        if(page_name == page_data[i].name) {
            return page_data[i];
        }
    }
    return page_data[0];
}

const NULL_PAGE_DATA = GetPageData("null");

const ButtonList = () => {
    let pageData: IPageData = NULL_PAGE_DATA;
    let currentSelectedButtonId: number = -1;

    const pathname = usePathname(); 

    const GetPage = () => {
        var tempPageData: IPageData = GetPageData("null");
        for(var i = 0 ; i < page_data.length ; i++) {
            if(pathname.startsWith(page_data[i].URLName)) {
                tempPageData = page_data[i];
                break;
            }
        }
        pageData = tempPageData;
    }
    const GetCurrentActivatedButton = () => {
        var tempId = -1;
        for(var i = 0 ; i < pageData.buttons_id.length ; i++) {
            if(pathname.endsWith(GetButtonData(pageData.buttons_id[i]).toURL)) {
                tempId = pageData.buttons_id[i];
                break;
            }
        }
        currentSelectedButtonId = tempId;
    }

    const ChangePageButtons = () => {
         
        GetPage();
        GetCurrentActivatedButton();
        
    }
    
    
    
    ChangePageButtons();
    
    return (
        <Buttons>
            {pageData.buttons_id.map((id, index) => (
                <div key={index}>
                    <NavButton key={index} id={id} selected={id == currentSelectedButtonId} isLast={id == 3 || id == 9}></NavButton>
                </div>
            ))}
        </Buttons>
    )
    
}

export default ButtonList;