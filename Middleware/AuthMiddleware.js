import jwt from 'jsonwebtoken';
import User from '../Modules/User.js';

const AuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ success: false, error: "Token Not Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, error: "Token Not Valid" });
    }

    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    req.user = user; // Attach user info to request
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export default AuthMiddleware;