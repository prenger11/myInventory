import express, { Request, Response, Router } from 'express';
// import multer, { Multer } from 'multer'; // Commented out image upload-related import
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import 'dotenv/config';

const router: Router = express.Router();

// Configure multer for file uploads (Image upload code is commented out)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '!QZPM1qzpm',
  database: process.env.DB_NAME || 'myInventory',
});

// Fetch all products route
router.get('/', async (req: Request, res: Response) => {
  try {
    const [products] = await db.query<RowDataPacket[]>('SELECT * FROM Products');
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch individual product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    console.log('Request received for product ID:', req.params.id);
    const productId = req.params.id;
    const [product] = await db.query<RowDataPacket[]>('SELECT * FROM Products WHERE id = ?', [productId]);

    if (!product || product.length === 0) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.json({ success: true, product: product[0] });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a product with image upload (Image upload code is commented out)
// router.post('/', upload.single('image'), async (req: Request & { file: Express.Multer.File }, res: Response) => {
router.post('/', async (req: Request, res: Response) => {
  try {
    const newProduct: any = req.body; // This should contain the data for the new product

    // Get the uploaded file information (Image upload code is commented out)
    // const imageFile: Express.Multer.File = req.file;

    // Check if an image was uploaded (Image upload code is commented out)
    // if (!imageFile) {
    //   res.status(400).json({ success: false, message: 'Image upload is required' });
    //   return;
    // }

    // Implement your logic to insert the new product into the database, including the image file path (Image upload code is commented out)
    // newProduct.image = imageFile.path; // Store the image file path in the product data

    const [result] = await db.query<ResultSetHeader>('INSERT INTO Products SET ?', newProduct);

    // Check if the insertId exists on the result
    if (result.insertId !== undefined) {
      // Send a response indicating successful creation and provide the ID of the newly created product
      res.status(201).json({ success: true, message: 'Product created successfully', productId: result.insertId });
    } else {
      res.status(500).json({ success: false, message: 'Failed to create product' });
    }
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a product by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body; // This should contain the updated product data

    // Implement your logic to update the product in the database
    await db.query('UPDATE Products SET ? WHERE id = ?', [updatedProduct, productId]);

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    // Implement your logic to delete the product from the database
    await db.query('DELETE FROM Products WHERE id = ?', [productId]);

    // Send a response indicating successful delete
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Other product-related routes (update, delete, create) can be added here

export default router;
