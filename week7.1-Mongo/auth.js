import jwt from "jsonwebtoken"
const JWT_SECRET="saflj"

const auth =(req,res,next)=>{
    const token=req.headers.authorization;
    const response=jwt.verify(token,JWT_SECRET);

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
    auth,
    JWT_SECRET
}