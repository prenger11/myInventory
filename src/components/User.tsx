import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UserContainer = styled.div`
    padding: 15px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    border-radius: 4px;
`;

const DataPoint = styled.div`
    margin-bottom: 8px;
`;

export interface UserProps {
    username: string;
    email: string;
    role: "Customer" | "Employee";
    created_at: string;
    address: string;
    phone: string;
}

const User: React.FC = () => {
    const [userData, setUserData] = useState<UserProps | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const endpoint = 'http://localhost:3000/user';

        axios.get(endpoint)
            .then(response => {
                if (response.data) {
                    setUserData(response.data);
                } else {
                    setError("No data received from server.");
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setError("Failed to fetch user data.");
            });
    }, []);

    if (error) return <div>{error}</div>;
    if (!userData) return <div>Loading...</div>;

    return (
        <UserContainer>
            <DataPoint><strong>Username:</strong> {userData.username}</DataPoint>
            <DataPoint><strong>Email:</strong> {userData.email}</DataPoint>
            <DataPoint><strong>Role:</strong> {userData.role}</DataPoint>
            <DataPoint><strong>Address:</strong> {userData.address}</DataPoint>
            <DataPoint><strong>Phone:</strong> {userData.phone}</DataPoint>
            <DataPoint><strong>Created At:</strong> {userData.created_at}</DataPoint>
        </UserContainer>
    );
};

export default User;
