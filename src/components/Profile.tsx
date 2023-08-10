import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const Form = styled.form`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 500px;
    max-width: 100%;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.2s;
    &:focus {
        border-color: #84fab0;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.2s;
    &:focus {
        border-color: #84fab0;
    }
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #84fab0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #6ae8a5;
    }
`;

interface ProfileProps {
    onSave: (email: string, username: string, password: string, streetAddress: string, phoneNumber: string, paymentMethod: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onSave }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(email, username, password, streetAddress, phoneNumber, paymentMethod);
    };

    return (
        <ProfileContainer>
            <Form onSubmit={handleSubmit}>
                <h2>Update Profile</h2>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Street Address:</Label>
                    <Input
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Phone Number:</Label>
                    <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Payment Method:</Label>
                    <Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="creditCard">Credit Card</option>
                        <option value="debitCard">Debit Card</option>
                        <option value="paypal">PayPal</option>
                    </Select>
                </FormGroup>
                <SubmitButton type="submit">Update Profile</SubmitButton>
            </Form>
        </ProfileContainer>
    );
};

export default Profile;
