import React from 'react';
import styled from 'styled-components';
import { ProductDetails } from './Product'; // Importing the ProductDetails interface
import { Link } from 'react-router-dom'; // Step 1: Import the Link component

const ProductsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 1000px;
`;

const ProductCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    &:last-child {
        margin-bottom: 0;
    }
`;

const ProductImage = styled.img`
    max-width: 100px;
    max-height: 100px;
    margin-right: 15px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const AddProductButton = styled(Link)` // Step 2: Style the button
    padding: 10px 20px;
    background-color: white;
    color: #84fab0;
    border: none;
    border-radius: 8px;
    margin-top: 20px;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
        background-color: #8fd3f4;
        color: white;
    }
`;

const AllProducts: React.FC = () => {
    // Sample product data for display
    const products: ProductDetails[] = [
        {
            image: './src/assets/preworkout1.jpg.webp',
            productName: 'Product 1',
            productDescription: 'This is a description for Product 1.',
            quantity: 10,
            price: 100.50
        },
        {
            image: './src/assets/preworkout2.webp',
            productName: 'Product 2',
            productDescription: 'This is a description for Product 2.',
            quantity: 5,
            price: 50.25
        },
        {
            image: './src/assets/preworkout3.webp',
            productName: 'Product 3',
            productDescription: 'This is a description for Product 3.',
            quantity: 20,
            price: 200.75
        }
    ];

    return (
        <ProductsContainer>
            <h2>All Products</h2>
            <ProductList>
                {products.map((product, index) => (
                    <ProductCard key={index}>
                        <ProductImage src={product.image} alt={product.productName} />
                        <ProductInfo>
                            <strong>{product.productName}</strong>
                            <p>{product.productDescription}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>Quantity: {product.quantity}</p>
                        </ProductInfo>
                    </ProductCard>
                ))}
            </ProductList>
            <AddProductButton to="/product">Add Product</AddProductButton> {/* Step 3: Add the button */}
        </ProductsContainer>
    );
};

export default AllProducts;
