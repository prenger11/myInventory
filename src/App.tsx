import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Users from './components/Users';
// import { UserProps } from './components/User';
import Products, { ProductDetails } from './components/Product';
import HomePage from './components/HomePage'; // Correct case
import AllProducts from './components/AllProducts';
import UserDetails from './components/UserDetails';

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

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                <Route path="/profile" element={<Profile onSave={handleProfile} />} />
                <Route path="/product" element={<Products onAddProduct={handleProduct} />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/users" element={<Users />} /> 
                <Route path="/user/:id" element={<UserDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
