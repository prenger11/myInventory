import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProductsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    min-height: 100vh;
`;

const ProductList = styled.ul`
    width: 100%;
    max-width: 600px;
    list-style-type: none;
    padding: 0;
`;

const ProductItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
`;

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Assuming you have an endpoint /api/products to fetch products
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <ProductsContainer>
            <h2>All Products</h2>
            <ProductList>
                {products.map((product) => (
                    <ProductItem key={product.id}>
                        <span>{product.name}</span>
                        <span>Quantity: {product.quantity}</span>
                        <span>Cost: ${product.cost}</span>
                    </ProductItem>
                ))}
            </ProductList>
        </ProductsContainer>
    );
};

export default Products;
