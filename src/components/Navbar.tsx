import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styling for dropdown
const DropdownMenu = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    cursor: pointer;
`;

const DropdownLink = styled(Link)`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
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
    padding: 1rem 3rem;
    background-color: #84fab0;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
    z-index: 1000;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 1rem;
    }
`;

const Logo = styled.h1`
font-size: 1.5rem;
color: white;
flex-basis: 20%;
text-align: left;
margin: 0;  // Adding this to remove default margins on h1 tags
cursor: pointer;
`;

const NavLinks = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 1rem;
    justify-content: center;

    @media (max-width: 768px) {
        gap: 0.5rem;
        width: 100%;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    transition: color 0.2s;

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
        margin-top: 0.5rem;
        width: 100%;
        justify-content: space-between;
    }
`;

const SearchBar = styled.input`
    padding: 5px;
    border-radius: 4px;
    border: none;
    margin-right: 20px;

    @media (max-width: 768px) {
        margin-right: 10px;
    }
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <StyledLink to="/">  {/* Add this Link */}
                <Logo>MyInventory</Logo>
            </StyledLink>

            <NavLinks>
                <StyledLink to="/users">Users</StyledLink>
                <StyledLink to="/product">Product</StyledLink>
                <StyledLink to="/login">Login</StyledLink>
                <StyledLink to="/signup">Signup</StyledLink>
                <StyledLink to="/profile">Profile</StyledLink>

                <Dropdown>
                    <StyledLink to="#">SARMs</StyledLink>
                    <DropdownMenu>
                        <DropdownLink to="/sarmlist1">SARM Item 1</DropdownLink>
                        <DropdownLink to="/sarmlist2">SARM Item 2</DropdownLink>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown>
                    <StyledLink to="#">Peptides</StyledLink>
                    <DropdownMenu>
                        <DropdownLink to="/peptidelist1">Peptide Item 1</DropdownLink>
                        <DropdownLink to="/peptidelist2">Peptide Item 2</DropdownLink>
                    </DropdownMenu>
                </Dropdown>

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
                <StyledLink to="/login">Logout</StyledLink>
                <StyledLink to="/cart">Cart</StyledLink>
            </Actions>
        </NavbarContainer>
    );
};

export default Navbar;
