"use client";

import styled from "styled-components";
import ButtonList from "./buttonList";
import Logo from "./logo";
import SettingButton from "./setting";

const variables = {
    navContainer: {
        width: "20%",
        height: "100vh",
        backgroundColor: "#274c4b",
    },
};

const NavContainer = styled.div`
    width: ${variables.navContainer.width};
    height: ${variables.navContainer.height};
    background-color: ${variables.navContainer.backgroundColor};
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const NavItem = styled.li`
    list-style: none;
    margin: 10px 0;
`;

const Nav = () => {
  return (
    <NavContainer>
      <Logo url="./img/text_logo_white.svg"></Logo>
      <ButtonList></ButtonList>
    </NavContainer>
  );
};

export default Nav;
