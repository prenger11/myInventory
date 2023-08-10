import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 50px;
    background-color: #84fab0;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const Logo = styled.h1`
    font-size: 1.5rem;
    color: white;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    transition: color 0.2s;

    &:hover {
        color: #8fd3f4;
    }
`;

const SearchBar = styled.input`
    padding: 5px;
    border-radius: 4px;
    border: none;
    margin-right: 20px;
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <Logo>MyInventory</Logo>

            <NavLinks>
                <StyledLink to="/users">Users</StyledLink>
                <StyledLink to="/products">Products</StyledLink>
                <StyledLink to="/login">Login</StyledLink>
                <StyledLink to="/signup">Signup</StyledLink>
                <StyledLink to="/profile">Profile</StyledLink>
            </NavLinks>

            <div>
                <SearchBar type="text" placeholder="Search..." />
                <StyledLink to="/logout">Logout</StyledLink>
                <StyledLink to="/cart">Cart</StyledLink>
            </div>
        </NavbarContainer>
    );
};

export default Navbar;
