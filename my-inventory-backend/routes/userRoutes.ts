import express, { Request, Response, Router } from 'express';
import mysql, { RowDataPacket } from 'mysql2/promise';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const router: Router = express.Router();

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '!QZPM1qzpm',
  database: process.env.DB_NAME || 'myInventory',
});

// Fetch all users route
router.get('/', async (req: Request, res: Response) => {
  try {
    const [users] = await db.query<RowDataPacket[]>('SELECT * FROM Users');
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch individual user by ID
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const [user] = await db.query<RowDataPacket[]>(`SELECT * FROM Users WHERE id = ?`, [userId]);

    if (!user || user.length === 0) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({ success: true, user: user[0] });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user route
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    // Validate the request body
    if (!updatedUserData) {
      return res.status(400).json({ success: false, message: 'Invalid request data' });
    }

    // Check if the user exists
    const [existingUser] = await db.query<RowDataPacket[]>(`SELECT * FROM Users WHERE id = ?`, [userId]);

    if (!existingUser || existingUser.length === 0) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // Convert the date format before updating
    if (updatedUserData.created_at) {
      // Assuming updatedUserData.created_at is in ISO format
      const isoDate = new Date(updatedUserData.created_at);
      const formattedDate = isoDate.toISOString().slice(0, 19).replace('T', ' '); // Format to 'YYYY-MM-DD HH:MM:SS'
      updatedUserData.created_at = formattedDate;
    }

    // Update the user data in the database
    await db.query('UPDATE Users SET ? WHERE id = ?', [updatedUserData, userId]);

    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Registration route
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, username, password, address, phoneNumber, role } = req.body;

    // Validate the request body
    if (!name || !email || !username || !password || !address || !phoneNumber || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if the user already exists
    const [users] = await db.query<RowDataPacket[]>('SELECT * FROM Users WHERE email = ?', [email]);

    if (users.length > 0) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.query('INSERT INTO Users (name, email, username, password, address, phoneNumber, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [name, email, username, hashedPassword, address, phoneNumber, role]);

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user route
// Delete user route
router.delete('/:userId', async (req: Request, res: Response) => {
  try {
      const userId = req.params.userId;

      // Check if the user exists
      const [existingUser] = await db.query<RowDataPacket[]>(`SELECT * FROM Users WHERE id = ?`, [userId]);

      if (!existingUser || existingUser.length === 0) {
          res.status(404).json({ success: false, message: 'User not found' });
          return;
      }

      // Delete the user from the database
      await db.query('DELETE FROM Users WHERE id = ?', [userId]);

      res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ success: false, message: error.message });
  }
});



export default router;
