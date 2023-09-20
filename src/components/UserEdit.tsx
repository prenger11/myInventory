import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Interface definition for UserProps
interface UserProps {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: 'Customer' | 'Employee';
  created_at: string;
}

// Styled components for your UI
const UserEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserDetailsForm = styled.form`
  width: 300px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.9);
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #84fab0;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #68d7a7;
  }
`;

const BackLink = styled(Link)`
  margin-top: 10px;
  text-decoration: none;
  color: #84fab0;
  transition: color 0.3s ease;

  &:hover {
    color: #68d7a7;
  }
`;

// Additional styled components for the Delete button
const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6b6b;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4242;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

// UserEdit component
const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserProps>({
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: 'Customer',
    created_at: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUserData(response.data.user);
        setLoading(false);
      } catch (err) {
        setError(`Error loading user: ${(err as Error).message}`);
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      if (id) {
        await axios.put(`http://localhost:3000/users/${id}`, userData);
        navigate(`/user/${id}`);
      }
    } catch (err) {
      console.error('Error saving changes:', err);
    }
  };

  const deleteUser = async () => {
    try {
      if (id) {
        const deleteUserURL = `http://localhost:3000/users/${id}`;
        console.log('Deleting user at:', deleteUserURL);
        await axios.delete(deleteUserURL);
        navigate('/users');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <UserEditContainer>
      <h2>Edit User</h2>
      <UserDetailsForm>
        <FormField>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={userData?.name || ''}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={userData?.email || ''}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            value={userData?.phoneNumber || ''}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Address</Label>
          <Input
            type="text"
            name="address"
            value={userData?.address || ''}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Role</Label>
          <Input
            type="text"
            name="role"
            value={userData?.role || ''}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Created On</Label>
          <Input
            type="text"
            name="created_at"
            value={userData?.created_at || ''}
            readOnly
          />
        </FormField>
        <ButtonContainer>
          <Button onClick={saveChanges}>Save Changes</Button>
          <DeleteButton onClick={deleteUser}>Delete User</DeleteButton>
        </ButtonContainer>
        <BackLink to={`/user/${id}`}>Back to Profile</BackLink>
      </UserDetailsForm>
    </UserEditContainer>
  );
};

export default UserEdit;
