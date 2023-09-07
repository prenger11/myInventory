import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

// Sample array to store user data (replace this with a database)
const users: any[] = [];

// Create a new user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;

  // Validate the request body
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Create a new user object
  const newUser = { name, email };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

export default router;
