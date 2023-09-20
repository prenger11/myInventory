import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

const UserDetailsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 2rem;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const UserDetailsCard = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 1000px;
`;

const UserDetailsInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const EditButton = styled(Link)`
    padding: 5px 20px;
    background-color: #84fab0;
    color: white;
    border: none;
    border-radius: 8px;
    margin-top: 5px; /* Adjust the margin-top value as needed */
    margin-bottom: 10px; /* Add margin-bottom to create space below */
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
        background-color: #68d7a7;
    }
`;

const DeleteButton = styled.button`
    padding: 5px 20px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 8px;
    margin-top: 5px; /* Adjust the margin-top value as needed */
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #ff4242;
    }
`;

interface UserProps {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: "Customer" | "Employee";
    created_at: string;
}

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                setUser(response.data.user);
                setLoading(false);
            } catch (err) {
                setError(`Error loading user: ${(err as Error).message}`);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleDeleteUser = () => {
        if (user) {
            const userId = user.id;

            axios.delete(`http://localhost:3000/users/${userId}`)
                .then(() => {
                    // Redirect to the Users page after successful deletion
                    window.location.href = '/users';
                })
                .catch(err => {
                    console.error('Error deleting user:', err);
                });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!user) {
        return <div>User not found</div>;
    }

    // Format the created_at date
    const createdAtDate = new Date(user.created_at);
    const formattedCreatedAt = `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;

    return (
        <UserDetailsContainer>
            <UserDetailsCard>
                <UserDetailsInfo>
                    <strong>{user.name}</strong>
                    <span>Email: {user.email}</span>
                    <span>Phone: {user.phoneNumber}</span>
                    <span>Address: {user.address}</span>
                    <span>Role: {user.role}</span>
                    <span>Created On: {formattedCreatedAt}</span>
                </UserDetailsInfo>
                <EditButton to={`/user/${id}/edit`}>Edit</EditButton>
                <DeleteButton onClick={handleDeleteUser}>Delete</DeleteButton>
            </UserDetailsCard>
        </UserDetailsContainer>
    );
};

export default UserDetails;
