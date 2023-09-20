import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createDatabaseConnection } from './config/database';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
// import multer from 'multer'; // Commented out multer import
import path from 'path';

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000');

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
async function connectDatabase() {
  try {
    await createDatabaseConnection();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error creating the database connection:', error);
    process.exit(1); // Exit the application on a database connection error
  }
}

connectDatabase();

// Define storage settings for multer (Image upload code is commented out)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the upload directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Define the filename
//   },
// });

// const upload = multer({ storage: storage }); // Use the defined storage settings

// Serve static files (uploaded images) from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', userRoutes);
app.use('/all-products', productRoutes);

// Sample root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  const status = process.env.NODE_ENV === 'development' ? 500 : 500; // Adjust the status code based on the environment
  res.status(status).json({ error: err.message });
});

// Route for uploading files (Image upload code is commented out)
// app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
//   // File is uploaded and stored; you can now save the file path or URL to your database
//   const imageUrl = '/uploads/' + req.file?.filename; // Use optional chaining to handle a possible undefined req.file
//   res.json({ imageUrl });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
