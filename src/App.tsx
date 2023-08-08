// import ListGroup from "./components/ListGroup";

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';


// function App() {
//   return <div> <ListGroup /> </div>
// }

// export default App;





const App: React.FC = () => {

    const handleLogin = (username: string, password: string) => {
        console.log("Trying to log in with", username, password);
    };

    const handleSignup = (name: string, email: string, username: string, password: string) => {
        console.log("Trying to sign up with", name, email, username, password);
    };
    

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                    {/* Other routes can go here */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

