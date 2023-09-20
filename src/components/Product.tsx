import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Input = styled.input`
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
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #6ae8a5;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  text-align: center;
  margin-top: 10px;
`;

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_at: string;
  image: string;
  // Add more fields as needed
}

interface ProductProps {
  onAddProduct: (product: ProductDetails) => void;
}

const Product: React.FC<ProductProps> = ({ onAddProduct }) => {
    const [product, setProduct] = useState<ProductDetails>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        stock_quantity: 0,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Format the date
        image: '',
    });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:3000/all-products', product);

      if (response.status === 201) {
        setSuccessMessage('Product created successfully');
        // Notify the parent component about the new product
        onAddProduct(product);
        // Clear the form
        setProduct({
          id: 0,
          name: '',
          description: '',
          price: 0,
          stock_quantity: 0,
          created_at: '', // Use a valid date string here
          image: '',
        });
      } else {
        setErrorMessage(`Error creating product: ${response.data.message}`);
      }
    } catch (error) {
      setErrorMessage(`Error creating product: ${(error as Error).message}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  return (
    <ProductsContainer>
      <FormContainer>
        <Title>Add New Product</Title>
        <Form onSubmit={handleSubmit}>
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
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Product Description:</Label>
            <TextArea
              rows={5}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Quantity:</Label>
            <Input
              type="number"
              name="stock_quantity"
              value={product.stock_quantity}
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </FormContainer>
    </ProductsContainer>
  );
};

export default Product;
