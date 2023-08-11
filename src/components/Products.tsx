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

// interface ProductsProps {
//     onAddProduct: (image: string, productName: string, productDescription: string, quantity: number, price: number) => void;
// }

const Products: React.FC<ProductsProps> = ({ onAddProduct }) => {
    const [image, setImage] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [quantity, setQuantity] = useState<number | string>('');
    const [price, setPrice] = useState<number | string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (image && productName && productDescription && quantity && price) {
            onAddProduct({
                image,
                productName,
                productDescription,
                quantity: Number(quantity),
                price: Number(price)
            });
            // Clear the form
            setImage('');
            setProductName('');
            setProductDescription('');
            setQuantity('');
            setPrice('');
        } else {
            alert("Please fill out all fields before submitting.");
        }
    };

    return (
        <ProductsContainer>
            <Form onSubmit={handleSubmit}>
                <h2>Add New Product</h2>
                <FormGroup>
                    <Label>Image URL:</Label>
                    <Input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Product Name:</Label>
                    <Input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Product Description:</Label>
                    <TextArea
                        rows={5}
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Quantity:</Label>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Price:</Label>
                    <Input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </FormGroup>
                <SubmitButton type="submit">Add Product</SubmitButton>
            </Form>
        </ProductsContainer>
    );
};

export default Products;
