import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { createDatabaseConnection } from './config/database';
import createRoutes from './routes/userRoutes'; // Import the modified userRoutes function

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Create the database connection
createDatabaseConnection()
  .then((db) => {
    // Use the user routes with the database connection
    app.use('/users', createRoutes(db)); // Use createRoutes function

    // Define a sample route that uses the database connection
    app.get('/', async (req: Request, res: Response) => {
      try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.json(rows);
      } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Error querying the database' });
      }
    });
  })
  .catch((error) => {
    console.error('Error creating the database connection:', error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
