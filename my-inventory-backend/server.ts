import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config'; // Ensure dotenv is configured if you're using it
import { createDatabaseConnection } from './config/database';
import userRoutes from './routes/userRoutes';

const app: Application = express();
const port: string | number = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Always connect to the database, regardless of server state
createDatabaseConnection().catch((error) => {
    console.error('Error creating the database connection:', error);
});

// Routes
app.use('/users', userRoutes); // Directly use userRoutes

// Sample root route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API is running' });
});

// Centralized error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
        console.error('Unhandled error:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
    } else {
        console.error('Unhandled error:', err.message);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
