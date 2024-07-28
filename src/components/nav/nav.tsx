"use client";

import styled from "styled-components";
import ButtonList from "./buttonList";
import Logo from "./logo";
import SettingButton from "./setting";



const variables = {
    navContainer: {
        width: "274px",
        height: "100vh",
        background_color: "#0E4642"
    },
};

const NavContainer = styled.div`
    
    width: ${variables.navContainer.width};
    height: ${variables.navContainer.height};
    background-color: ${variables.navContainer.background_color};
    display: flex;
    align-items: center;
    flex-direction: column;

`;

const Nav = () => {
  return (
    <NavContainer>
      <Logo url="./img/nav/logo.svg"></Logo>
      <ButtonList></ButtonList>
    </NavContainer>
  );
};

export default Nav;