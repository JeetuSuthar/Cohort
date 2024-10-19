import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//import { JWT_ADMIN_PASSWORD } from "../config.js";
const JWT_ADMIN_PASSWORD="nigga1233"
dotenv.config();

console.log("JWT_ADMIN_PASSWORD:", JWT_ADMIN_PASSWORD);
const adminMiddleware = (req, res, next) => {
    
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"

    
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }

    try {
        
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

        
        req.userId = decoded.id;

        
        next();
    } catch (error) {
       
        return res.status(403).json({
            msg: "Invalid token",
            error: error.message
        });
    }
};

export { adminMiddleware };
