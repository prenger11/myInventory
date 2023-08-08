import React, { CSSProperties, useState } from 'react';

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <button 
                        type="submit" 
                        style={buttonStyle}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#68d7a7'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#84fab0'}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

// Styles
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

export default Login;
