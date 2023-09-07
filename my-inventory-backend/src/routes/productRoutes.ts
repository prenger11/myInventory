import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mysql from 'mysql2/promise';
import { createOrUpdateProductValidation } from './validations/productValidation';

// Basic Product type definition
type Product = {
    id: number;
    name: string;
    price: number;
    // ... other fields can be added as needed
};

// Setup MySQL connection
let db: mysql.Connection;

(async () => {
    db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
})();

const router = Router();

router.post('/', createOrUpdateProductValidation, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, description, price, stock_quantity } = req.body;
    try {
        const [results] = await db.query<mysql.OkPacket>("INSERT INTO products (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)", [name, description, price, stock_quantity]);
        res.status(201).json({ message: "Product added successfully", productId: results.insertId });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add product", error: (error as Error).message });
    }
});

// Get all products
router.get('/', async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM products');
        const products: Product[] = rows as Product[];
        res.json(products);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
});


// Get specific product
router.get('/:productId', async (req: Request, res: Response) => {
    const productId = req.params.productId;
    try {
        const [rows, fields] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
        const results = rows as mysql.RowDataPacket[];
        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        const product: Product = results[0] as Product;
        res.json(product);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }    
});


router.put('/:productId', createOrUpdateProductValidation, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, description, price, stock_quantity } = req.body;
    try {
        await db.query("UPDATE products SET name=?, description=?, price=?, stock_quantity=? WHERE id=?", [name, description, price, stock_quantity, req.params.productId]);
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }    
});

router.delete('/:productId', async (req: Request, res: Response) => {
    try {
        await db.query("DELETE FROM products WHERE id=?", [req.params.productId]);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }    
});

export default router;
