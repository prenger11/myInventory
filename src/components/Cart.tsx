import React from 'react';
import styled from 'styled-components';
import { ProductDetails } from './Product';

const CartContainer = styled.div`
    padding: 2rem;
    background-color: #f7f7f7;
`;

const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
`;

const CartButton = styled.button`
    background-color: #ff4d4d;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #ff1a1a;
    }
`;

interface CartProps {
    cartItems: Array<ProductDetails>;
    onRemoveFromCart: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart }) => {
    return (
        <CartContainer>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
                    <CartItem key={item.id}>
                        <span>{item.name}</span>
                        <CartButton onClick={() => onRemoveFromCart(item.id)}>
                            Remove
                        </CartButton>
                    </CartItem>
                ))
            )}
        </CartContainer>
    );
}

export default Cart;
