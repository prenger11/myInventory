import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Users from './components/Users';
import Product, { ProductDetails } from './components/Product';
import HomePage from './components/HomePage';
import AllProducts from './components/AllProducts';
import UserDetails from './components/UserDetails';
import UserEdit from './components/UserEdit';
import ProductProfile from './components/ProductProfile';
import ProductEdit from './components/ProductEdit';
import Cart from './components/Cart';
import { ProductProps } from './components/AllProducts';


const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [userDetails, setUserDetails] = useState<{ name?: string } | null>(null);
    const [cart, setCart] = useState<Array<ProductDetails>>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleLoginSuccess = async (newToken: string) => {
      setToken(newToken);
      localStorage.setItem('token', newToken);
      try {
        const response = await fetch('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${newToken}`
          }
        });
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    const handleLogout = () => {
      setToken(null);
      setUserDetails(null);
      localStorage.removeItem('token');
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

    const addToCart = (product: ProductProps) => {
        // We will create a new product with the additional properties
        const newProduct: ProductDetails = {
            ...product,
            created_at: new Date().toISOString(),
            image: ''  // Default image, you might want to adjust this
        };
        setCart(prevCart => [...prevCart, newProduct]);
    };
    
    const removeFromCart = (productId: number) => {
        setCart(prevCart => {
            const cartCopy = [...prevCart];
            const indexToRemove = cartCopy.findIndex(product => product.id === productId);
    
            if (indexToRemove !== -1) {
                cartCopy.splice(indexToRemove, 1);
            }
    
            return cartCopy;
        });
    };    

    return (
        <BrowserRouter>
        <Navbar user={token} userDetails={userDetails} onLogout={handleLogout} cartCount={cart.length} />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/profile" element={<Profile onSave={handleProfile} />} />
            <Route path="/product" element={<Product onAddProduct={handleProduct} />} />
            <Route path="/product/:id" element={<ProductProfile onAddToCart={addToCart} />} /> {/* Pass the addToCart function */}
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route path="/all-products" element={<AllProducts onAddToCart={addToCart} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/user/:id/edit" element={<UserEdit />} />
            <Route path="/cart" element={<Cart cartItems={cart} onRemoveFromCart={removeFromCart} />} />
        </Routes>
    </BrowserRouter>
    );
}

export default App;
