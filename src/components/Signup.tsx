import React, { CSSProperties, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
    onSignup?: (name: string, email: string, username: string, password: string, address: string, phoneNumber: string, role: string) => void;
}

type FormData = {
    name: string;
    email: string;
    username: string;
    password: string;
    address: string;
    phoneNumber: string;
    role: "Customer" | "Employee";
};

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phoneNumber: '',
        role: 'Customer'
    });

    const [feedback, setFeedback] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const endpoint = 'http://localhost:3000/users/register';
            const response = await axios.post(endpoint, formData);

            if (response.status === 201) {
                setFeedback('User registered successfully');
                onSignup && onSignup(formData.name, formData.email, formData.username, formData.password, formData.address, formData.phoneNumber, formData.role);
                navigate('/users');
            } else {
                setFeedback('Error registering user');
            }
        } catch (error) {
            setFeedback('Error registering user');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSignup();
    };

    return (
        <div style={containerStyle}>
            {feedback && <div>{feedback}</div>}
            <form onSubmit={handleSubmit} style={formStyle}>
                {(['name', 'email', 'username', 'password', 'address', 'phoneNumber'] as Array<keyof FormData>).map(field => (
                    <div key={field}>
                        <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                ))}
                <div>
                    <label htmlFor="role">Role</label>
                    <select 
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="Customer">Customer</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
                <div>
                    <button 
                        type="submit" 
                        style={buttonStyle}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#68d7a7'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#84fab0'}
                    >
                        Signup
                    </button>
                </div>
            </form>
        </div>
    );
};

const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    animation: 'Gradient 15s ease infinite',
    position: 'relative',
    overflow: 'hidden'
};

const formStyle: CSSProperties = {
    width: '300px',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
};

const inputStyle: CSSProperties = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px'
};

const buttonStyle: CSSProperties = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#84fab0',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

export default Signup;
