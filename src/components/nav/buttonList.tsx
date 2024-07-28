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
    URL_names: string[];
    buttons_id: number[];
}

const page_data: IPageData[] = [
    {name: "null", URL_names: [], buttons_id: [3]},
    {name: "profile", URL_names: [], buttons_id: [4,3]},
    {name: "data", URL_names: [], buttons_id: [0,1,2,3]},
    {name: "test2", URL_names: [], buttons_id: [2,3]},
];

const DEFAULT_PAGE = "profile";

const GetPageData = (page_name: string): IPageData => {
    for(var i = 1 ; i < page_data.length ; i++) {
        if(page_name == page_data[i].name) {
            return page_data[i];
        }
    }
    return page_data[0];
}

const ButtonList = () => {

    let [pageName, setPageName] = useState(DEFAULT_PAGE);
    let currentPageData: IPageData = GetPageData(pageName);
    let init_value: number = -1;

    const pathname = usePathname(); 
    for(var i = 0 ; i < currentPageData.buttons_id.length ; i++) {
        if(pathname.endsWith(GetButtonData(currentPageData.buttons_id[i]).toURL)) {
            init_value = currentPageData.buttons_id[i];
        }
    }
    const [clickedButtonId, clickButton] = useState(init_value);

    return (
        <Buttons>
            {currentPageData.buttons_id.map((id, index) => (
                <div key={index} onClick={() => {clickButton(id)}}>
                    <NavButton key={index} id={id} selected={id == clickedButtonId}></NavButton>
                </div>
            ))}
        </Buttons>
    )
    
}

export default ButtonList;