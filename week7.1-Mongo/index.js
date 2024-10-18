import express from "express"
import {UserModel , TodoModel} from "./db.js"
import jwt from "jsonwebtoken";
import { auth, JWT_SECRET } from "./auth.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/todo-app")

const app = express();
app.use(express.json());

app.post('/signup',async (req,res)=>{
    const {name , email, password} = req.body;
    await UserModel.create({
        name : name,
        email:email,
        password:password
    })

    res.json({
        msg:"You are successfully signed up"
    })
});

app.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    const response= await UserModel.findOne({
        email:email,
        password:password
    })
    if(response){
        const token = jwt.sign({
            id:response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })

    }else{
        res.status(403).json({
            msg:"Incorrect Credential"
        })
    }
});

app.post('/todo',async(req,res)=>{
    const {userId, title , done}=req.body;
    await TodoModel.create({
        userId,
        title,
        done
    })
    res.json({
        msg:"Added todo"
    })
})

app.get('/todos',async(req,res)=>{
    const {userId}=req.body
    const todos=await TodoModel.find({
        userId
    })
    res.json({
        todos
    })
});



app.listen(3000 ,()=>{
    console.log("port listening on 3000")
})