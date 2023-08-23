import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Users from './components/Users';
import { UserProps } from './components/User';
import Products, { ProductDetails } from './components/Product';
import HomePage from './components/homepage';



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

    const handleProduct = (product: ProductDetails) => {
        console.log("Trying to add a product with", product.image, product.productName, product.productDescription, product.quantity, product.price);
    };

    // Sample user data - you might fetch this from an API instead
    const users = [
        {
            name: "John Doe",
            email: "john@example.com",
            phoneNumber: "123-456-7890",
            mailingAddress: "123 Elm St, Springfield, IL",
            userType: "Customer"  // <-- this should be either "Customer" or "Employee"
        },
        {
            name: "Jane Doe",
            email: "jane@example.com",
            phoneNumber: "123-456-5555",
            mailingAddress: "432 Elm St, Springfield, IL",
            userType: "Admin"  // <-- this should be either "Customer" or "Employee"
        },
        {
            name: "Jake Doe",
            email: "jake@example.com",
            phoneNumber: "555-456-5555",
            mailingAddress: "555 Elm St, Springfield, IL",
            userType: "Customer"  // <-- this should be either "Customer" or "Employee"
        },
        // ...other users
    ];
    
    

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                <Route path="/profile" element={<Profile onSave={handleProfile} />} />
                <Route path="/product" element={<Products onAddProduct={handleProduct} />} />
                <Route path="/users" element={<Users users={users as UserProps[]} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
