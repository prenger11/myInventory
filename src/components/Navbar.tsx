import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styling for dropdown
const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.3s;
`;

const DropdownLink = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f1f1f1;
    color: #84fab0;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${DropdownMenu} {
    display: block;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background: linear-gradient(to right, #66ffa6, #84fab0);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

const Logo = styled.h1`
  font-size: 2rem;
  color: white;
  flex-basis: 20%;
  text-align: left;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #8fd3f4;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 1rem;
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  transition: color 0.2s;
  margin-right: 15px;  // Added this line

  &:hover {
    color: #8fd3f4;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 20%;
  justify-content: flex-end;

  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    justify-content: space-between;
  }
`;

const SearchBar = styled.input`
  padding: 8px 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 20px;
  transition: border 0.2s;
  &:focus {
    border-color: #84fab0;
    box-shadow: 0 0 5px rgba(132, 250, 176, 0.5);
  }

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  color: white;
  margin-right: 10px;
  font-weight: bold;
`;

const LogoutLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
  margin-right: 15px;  // Added this line

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #8fd3f4;
  }
`;


interface NavbarProps {
    user: string | null;
    userDetails: {
        name?: string;
        username?: string;
    } | null;
    onLogout: () => void;
    cartCount: number;  // Add this line
    // ... other props
}
  
  const Navbar: React.FC<NavbarProps> = ({ user, userDetails, onLogout }) => {
    return (
      <NavbarContainer>
        <StyledLink to="/">
          <Logo>MyInventory</Logo>
        </StyledLink>
  
        <NavLinks>
          <StyledLink to="/users">Users</StyledLink>
          <StyledLink to="/all-products">Products</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/signup">Signup</StyledLink>
          <StyledLink to="/profile">Profile</StyledLink>
  
          {/* Dropdown menus here */}
          {/* <Dropdown>
            <StyledLink to="#">SARMs</StyledLink>
            <DropdownMenu>
              <DropdownLink to="/sarmlist1">SARM Item 1</DropdownLink>
              <DropdownLink to="/sarmlist2">SARM Item 2</DropdownLink>
            </DropdownMenu>
          </Dropdown> */}
  
          <Dropdown>
            <StyledLink to="#">Pre-Workout</StyledLink>
            <DropdownMenu>
              <DropdownLink to="/preworkout1">Pre-Workout Item 1</DropdownLink>
              <DropdownLink to="/preworkout2">Pre-Workout Item 2</DropdownLink>
            </DropdownMenu>
          </Dropdown>
  
          <Dropdown>
              <StyledLink to="#">Recovery</StyledLink>
              <DropdownMenu>
                  <DropdownLink to="/recovery1">Recovery Item 1</DropdownLink>
                  <DropdownLink to="/recovery2">Recovery Item 2</DropdownLink>
              </DropdownMenu>
           </Dropdown>
        </NavLinks>
  
        <Actions>
          <SearchBar type="text" placeholder="Search..." />
  
          {user ? (
            <UserInfo>
              <UserName>Welcome, {userDetails?.name || 'Guest'}</UserName>
              <LogoutLink to="#" onClick={onLogout}>
                Logout
              </LogoutLink>
            </UserInfo>
          ) : (
            <StyledLink to="/login">Login</StyledLink>
          )}
  
        <StyledLink to="/cart">Cart</StyledLink>
        </Actions>
      </NavbarContainer>
    );
  };
  
  export default Navbar;