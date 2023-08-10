import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

const App: React.FC = () => {

    const handleLogin = (username: string, password: string) => {
        console.log("Trying to log in with", username, password);
    };

    const handleSignup = (name: string, email: string, username: string, password: string) => {
        console.log("Trying to sign up with", name, email, username, password);
    };

    const handleProfile = (name: string, email: string, username: string, password: string) => {
        console.log("Trying to update Profile with", name, email, username, password);
    };
    

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                    <Route path="/profile" element={<Profile onSave={handleProfile} />} />
                    {/* Other routes can go here */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

