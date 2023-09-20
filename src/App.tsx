import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Users from './components/Users';
// import Products, { ProductDetails } from './components/Product';
import Product, { ProductDetails } from './components/Product';
import HomePage from './components/HomePage';
import AllProducts from './components/AllProducts';
import UserDetails from './components/UserDetails';
import UserEdit from './components/UserEdit';
import ProductProfile from './components/ProductProfile';
import ProductEdit from './components/ProductEdit';

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
    console.log("Trying to add a product with", product.image, product.name, product.description, product.stock_quantity, product.price);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/profile" element={<Profile onSave={handleProfile} />} />
        <Route path="/product" element={<Product onAddProduct={handleProduct} />} />
        <Route path="/product/:id" element={<ProductProfile />} />
        <Route path="/product/edit/:id" element={<ProductEdit />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/user/:id/edit" element={<UserEdit />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
