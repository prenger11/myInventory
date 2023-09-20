import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 2rem;
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`;

const ProductList = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 1000px;
`;

const ProductCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 20px;
  &:hover {
    text-decoration: none;
  }
`;

const ProductCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductPrice = styled.span`
  font-weight: bold;
`;

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
}

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: ProductProps[] }>('http://localhost:3000/all-products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError(`Error loading products: ${(err as Error).message}`);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ProductsContainer>
      <ProductList>
        {products.map((product) => (
          <ProductCardLink to={`/product/${product.id}`} key={product.id}>
            <ProductCard>
              <ProductInfo>
                <strong>{product.name}</strong>
                <span>Description: {product.description}</span>
                <ProductPrice>Price: ${Number(product.price).toFixed(2)}</ProductPrice>
                <span>Quantity: {product.stock_quantity}</span>
              </ProductInfo>
            </ProductCard>
          </ProductCardLink>
        ))}
        <ProductCardLink to="/product">
          <ProductCard>
            <strong>Add Product</strong>
          </ProductCard>
        </ProductCardLink>
      </ProductList>
    </ProductsContainer>
  );
};

export default AllProducts;
