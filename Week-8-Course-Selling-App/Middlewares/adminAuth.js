import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { JWT_ADMIN_PASSWORD, JWT_USER_PASSWORD } from "../config.js";
dotenv.config();



const adminMiddleware =(req,res,next)=>{
    const token=req.headers.authorization;
    const response=jwt.verify(token,JWT_ADMIN_PASSWORD);

    if(response){
        req.userId=response.id; 
        next()
    }
    else{
        res.status(403).json({
            msg:"incorect cred"
        });
    }
}

export {
    
    adminMiddleware
}