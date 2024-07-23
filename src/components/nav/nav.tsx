"use client";

import styled from "styled-components";

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

`;

const Nav = () => {
  return (
    <NavContainer></NavContainer>
  );
};

export default Nav;