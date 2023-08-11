// User.tsx
import React from 'react';
import styled from 'styled-components';

const UserContainer = styled.div`
    // styles for individual user
`;

export interface UserProps {
    name: string;
    email: string;
    phoneNumber: string;
    mailingAddress: string;
    userType: 'Customer' | 'Employee';
}

const User: React.FC<UserProps> = ({ name, email, phoneNumber, mailingAddress, userType }) => {
    return (
        <UserContainer>
            <strong>{name}</strong>
            <br />
            Email: {email}
            <br />
            Phone Number: {phoneNumber}
            <br />
            Mailing Address: {mailingAddress}
            <br />
            Type: {userType}
        </UserContainer>
    );
};

export default User;
