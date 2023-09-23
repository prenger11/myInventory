import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

const ProductProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 2rem;
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const ProductProfileCard = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 1000px;
`;

const ProductProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditButton = styled(Link)`
  padding: 5px 20px;
  background-color: #84fab0;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #68d7a7;
  }
`;

const ProductDetails = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  padding: 5px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff4242;
  }
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

interface ProductProfileProps {
  onAddToCart: (product: ProductDetails) => void;
}

const ProductProfile: React.FC<ProductProfileProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/all-products/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        setError(`Error loading product: ${(err as Error).message}`);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDeleteProduct = () => {
    if (product) {
      const productId = product.id;

      axios.delete(`http://localhost:3000/all-products/${productId}`)
        .then(() => {
          // Redirect to the Products page after successful deletion
          window.location.href = '/products';
        })
        .catch(err => {
          console.error('Error deleting product:', err);
        });
    }
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, image, description, price, stock_quantity, created_at } = product;

  // Format the created_at date
  const createdAtDate = new Date(created_at);
  const formattedCreatedAt = `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;

  return (
    <ProductProfileContainer>
      <ProductProfileCard>
        <ProductProfileInfo>
          <strong>{name}</strong>
          {/* Display the image */}
          <img src={image} alt={name} />
          <ProductDetails>Description: {description}</ProductDetails>
          <ProductDetails>Price: ${Number(price).toFixed(2)}</ProductDetails>
          <ProductDetails>Quantity: {stock_quantity}</ProductDetails>
          <ProductDetails>Created On: {formattedCreatedAt}</ProductDetails>
        </ProductProfileInfo>
        <EditButton to={`/product/edit/${id}`}>Edit</EditButton>
        <DeleteButton onClick={handleDeleteProduct}>Delete</DeleteButton>
        <button onClick={handleAddToCart}>Add to Cart</button> {/* Add to Cart button */}
      </ProductProfileCard>
    </ProductProfileContainer>
  );
};

export default ProductProfile;