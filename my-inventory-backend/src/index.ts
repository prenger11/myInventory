import express from 'express';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
