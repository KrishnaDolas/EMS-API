import express from 'express';
import { login } from '../Controllers/authController.js';
import AuthMiddleware from '../Middleware/AuthMiddleware.js';

const router = express.Router();

// Login route
router.post('/login', login);

// Verify route with middleware
router.post('/verify', AuthMiddleware, (req, res) => {          
    // On successful middleware, send user info
    return res.status(200).json({ success: true, user: req.user });
});
    
export default router;