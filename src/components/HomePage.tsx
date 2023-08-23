import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: white;
    margin-bottom: 20px;
`;

const Subtitle = styled.h2`
    font-size: 1.5rem;
    color: white;
    margin-bottom: 40px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #ffffff;
    color: #84fab0;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.8);
    }
`;

const HomePage: React.FC = () => {
    return (
        <HomeContainer>
            <Title>Welcome to Our Application</Title>
            <Subtitle>Manage users, products, and much more!</Subtitle>
            <Button>Get Started</Button>
        </HomeContainer>
    );
};

export default HomePage;
