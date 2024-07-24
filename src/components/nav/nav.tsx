"use client";

import styled from "styled-components";
import Link from "next/link";

const variables = {
    navContainer: {
        width: "20%",
        height: "100vh",
        backgroundColor: "#0E4642",
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
            <Link href="/DataStatics">
                <NavItem>Data Statistics</NavItem>
            </Link>
            <NavItem>Control Hardware</NavItem>
            <NavItem>Edit Values</NavItem>
            <NavItem>Back to Profile</NavItem>
            <NavItem>Setting</NavItem>
        </NavContainer>
    );
};

export default Nav;
