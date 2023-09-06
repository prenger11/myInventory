import { Router, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerValidation } from './validations/userValidation';
import User from '../models/users';  // Adjust the path based on your project structure

interface ExtendedRequest extends Request {
    userId?: number;
}

const router = Router();

// Middleware for authentication
const isAuthenticated = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }
    
    const token = authHeader.split(' ')[1];  // Assuming "Bearer TOKEN" format
    if (!token) {
        return res.status(401).send('Token missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decoded === 'object' && 'id' in decoded) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(401).send('Invalid token');
        }
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
};

// Middleware for role-based access (You can implement this later when needed)
const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Fetch user from the database using req.userId and check if they have an admin role.
    // For now, we'll assume all authenticated users are admins.
    next();
};

// User registration
router.post('/register', registerValidation, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // TODO: Insert user into the database with hashed password.
    // await User.create({ username, email, password: hashedPassword }); // Replace with Sequelize logic

    res.status(201).json({ message: "User registered successfully" });
});

// User login
router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    // TODO: Fetch user from the database.
    // const user = await User.findOne({ where: { username } }); // Replace with Sequelize logic
    // if (!user) {
    //    return res.status(401).json({ error: "Invalid username or password" });
    // }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id }, "YOUR_SECRET_KEY", {
        expiresIn: 86400 // 24 hours
    });

    res.json({ message: "Logged in successfully", token });
});

// Get user details (must be authenticated)
router.get('/details', isAuthenticated, async (req: ExtendedRequest, res: Response) => {
    const userId = req.userId;

    // TODO: Fetch user details from the database.
    // const userDetails = await User.findOne({ where: { id: userId } }); // Replace with Sequelize logic

    // For now, let's assume a sample userDetails object
    const userDetails = {
        id: userId,
        username: 'sampleUsername',
        email: 'sample@email.com',
        role: 'customer'
    };

    res.json(userDetails);
});

export default router;
