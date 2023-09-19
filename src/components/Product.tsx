import React, { useState } from 'react';
import styled from 'styled-components';

const ProductsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const Form = styled.form`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 600px;
    max-width: 100%;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.2s;
    &:focus {
        border-color: #84fab0;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.2s;
    resize: vertical;
    &:focus {
        border-color: #84fab0;
    }
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #84fab0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #6ae8a5;
    }
`;

export interface ProductDetails {
    image: string;
    productName: string;
    productDescription: string;
    quantity: number;
    price: number;
}

interface ProductsProps {
    onAddProduct: (product: ProductDetails) => void;
}

const Product: React.FC<ProductsProps> = ({ onAddProduct }) => {
    const [product, setProduct] = useState<ProductDetails>({
        image: '',
        productName: '',
        productDescription: '',
        quantity: 0,
        price: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (product.image && product.productName && product.productDescription && product.quantity && product.price) {
            try {
                const response = await fetch('http://localhost:YOUR_BACKEND_PORT/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                const data = await response.json();

                if (response.ok) {
                    onAddProduct(product);
                    alert(data.message);
                    // Clear the form
                    setProduct({
                        image: '',
                        productName: '',
                        productDescription: '',
                        quantity: 0,
                        price: 0
                    });
                } else {
                    alert("Error adding product: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to add product.");
            }
        } else {
            alert("Please fill out all fields before submitting.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <ProductsContainer>
            <Form onSubmit={handleSubmit}>
                <h2>Add New Product</h2>
                <FormGroup>
                    <Label>Image URL:</Label>
                    <Input
                        type="url"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Product Name:</Label>
                    <Input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Product Description:</Label>
                    <TextArea
                        rows={5}
                        name="productDescription"
                        value={product.productDescription}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Quantity:</Label>
                    <Input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Price:</Label>
                    <Input
                        type="number"
                        step="0.01"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </FormGroup>
                <SubmitButton type="submit">Add Product</SubmitButton>
            </Form>
        </ProductsContainer>
    );
};

export default Product;
