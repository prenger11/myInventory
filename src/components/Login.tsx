import React, { useState, CSSProperties } from 'react';


type LoginProps = {
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onLogin(username, password);
    };

    // ... rest of the code ...

const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif'
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

// ... rest of the code ...


    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
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
                <button style={buttonStyle} type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
