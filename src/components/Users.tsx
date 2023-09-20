import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UsersContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 2rem;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const UserList = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 1000px;
`;

const UserCardLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: block;
    margin-bottom: 20px;
    &:hover {
        text-decoration: none;
    }
`;

const UserCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 4px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserType = styled.span<{ type: 'Customer' | 'Employee' }>`
    background-color: ${({ type }) => (type === 'Customer' ? '#84fab0' : '#8fd3f4')};
    padding: 5px 10px;
    border-radius: 20px;
    text-align: center;
    width: max-content;
`;

const AddUserButton = styled(Link)`
    padding: 10px 20px;
    background-color: white;
    color: #84fab0;
    border: none;
    border-radius: 8px;
    margin-top: 20px;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
        background-color: #8fd3f4;
        color: white;
    }
`;

interface UserProps {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: 'Customer' | 'Employee';
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<{ users: UserProps[] }>('http://localhost:3000/users');
                setUsers(response.data.users);
                setLoading(false);
            } catch (err) {
                setError(`Error loading users: ${(err as Error).message}`);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <UsersContainer>
            <UserList>
                {users.map((user) => (
                    <UserCardLink to={`/user/${user.id}`} key={user.id}>
                        <UserCard>
                            <UserInfo>
                                <strong>{user.name}</strong>
                                <span>Email: {user.email}</span>
                                <span>Phone: {user.phoneNumber}</span>
                                <span>Address: {user.address}</span>
                            </UserInfo>
                            <UserType type={user.role}>{user.role}</UserType>
                        </UserCard>
                    </UserCardLink>
                ))}
                <AddUserButton to="/signup">Add User</AddUserButton>
            </UserList>
        </UsersContainer>
    );
};

export default Users;
