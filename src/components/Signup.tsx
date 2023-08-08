import React, { useState, CSSProperties } from 'react';

type SignupProps = {
    onSignup: (name: string, email: string, username: string, password: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSignup(name, email, username, password);
    };

    // Styles
    const containerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to bottom right, #6C5B7B, #C06C84, #F67280)',
        backgroundAttachment: 'fixed',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h16v16H0V0zm0 2h4v4H0V2zm8 8h4v4H8v-4z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
    };

    const formStyle: CSSProperties = {
        width: '300px',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    };

    const inputStyle: CSSProperties = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle: CSSProperties = {
        width: '100%',
        padding: '10px',
        background: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label htmlFor="name">Full Name: </label>
                    <input 
                        style={inputStyle}
                        type="text" 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input 
                        style={inputStyle}
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input 
                        style={inputStyle}
                        type="text" 
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        style={inputStyle}
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button style={buttonStyle} type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
