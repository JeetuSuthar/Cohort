import jwt from "jsonwebtoken"
import dotenv from "dotenv"
//import { JWT_USER_PASSWORD } from "../config.js";
dotenv.config();
const JWT_USER_PASSWORD="wigga1234"

const userMiddleware =(req,res,next)=>{
    const token=req.headers.authorization;
    const response=jwt.verify(token,JWT_USER_PASSWORD);

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
    
   userMiddleware
}