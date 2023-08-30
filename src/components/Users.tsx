import React from 'react';
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

const UserCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserType = styled.span.attrs<{ type: "Customer" | "Employee" }>(props => ({
    type: props.type,
}))`
    background-color: ${props => props.type === "Customer" ? "#84fab0" : "#8fd3f4"};
    padding: 5px 10px;
    border-radius: 20px;
    text-align: center;
    width: max-content;
`;

const AddUserButton = styled(Link)` // Step 2: Style the button
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
    name: string;
    email: string;
    phoneNumber: string;
    mailingAddress: string;
    userType: "Customer" | "Employee";
}

interface UsersComponentProps {
    users: UserProps[];
}

const Users: React.FC<UsersComponentProps> = ({ users }) => {
    return (
        <UsersContainer>
            <UserList>
                {users.map((user, index) => (
                    <UserCard key={index}>
                        <UserInfo>
                            <strong>{user.name}</strong>
                            <span>Email: {user.email}</span>
                            <span>Phone: {user.phoneNumber}</span>
                            <span>Address: {user.mailingAddress}</span>
                        </UserInfo>
                        <UserType type={user.userType}>{user.userType}</UserType>
                    </UserCard>
                ))}
            <AddUserButton to="/signup">Add User</AddUserButton>
            </UserList>
        </UsersContainer>
    );
};

export default Users;
