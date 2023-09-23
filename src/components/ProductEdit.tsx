import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

// Interface definition for ProductProps
interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_at: string;
}

// Styled components for your UI
const ProductEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductDetailsForm = styled.form`
  width: 300px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.9);
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #84fab0;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px; /* Add margin to create spacing */

  &:hover {
    background-color: #68d7a7;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  margin-top: 20px;
`;

const BackLink = styled(Link)`
  margin-top: 0px; /* Adjust margin-top value for better alignment */
  text-decoration: none;
  padding: 10px 20px; /* Apply button-like padding */
  background-color: #84fab0; /* Match button background color */
  color: white; /* Match button text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #68d7a7; /* Match button hover color */
  }
`;

// ProductEdit component
const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [productData, setProductData] = useState<ProductProps>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    created_at: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/all-products/${id}`);
        setProductData(response.data.product);
        setLoading(false);
      } catch (err) {
        setError(`Error loading product: ${(err as Error).message}`);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      setValidationError(null);

      if (!productData.name || !productData.description) {
        setValidationError("Name and Description are required fields.");
        return;
      }

      if (productData.price <= 0 || productData.stock_quantity < 0) {
        setValidationError("Price must be greater than 0, and Stock Quantity must be non-negative.");
        return;
      }

      setSaving(true);

      if (id) {
        await axios.put(`http://localhost:3000/all-products/${id}`, productData);
        window.location.href = `/all-products`;
      }
    } catch (err) {
      console.error('Error saving changes:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ProductEditContainer>
      <h2>Edit Product</h2>
      <ProductDetailsForm>
        {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
        <FormField>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Price</Label>
          <Input
            type="number"
            step="0.01"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Stock Quantity</Label>
          <Input
            type="number"
            name="stock_quantity"
            value={productData.stock_quantity}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <Label>Created On</Label>
          <Input
            type="text"
            name="created_at"
            value={productData.created_at}
            readOnly
          />
        </FormField>
        <ButtonContainer>
          <Link to={`/all-products/${id}`}>
            <Button onClick={saveChanges} disabled={saving}>Save Changes</Button>
          </Link>
          <BackLink to={`/product/${id}`}>Back to Product</BackLink>
        </ButtonContainer>
      </ProductDetailsForm>
    </ProductEditContainer>
  );
};

export default ProductEdit;
