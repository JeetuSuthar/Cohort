import express from "express"
import {UserModel , TodoModel} from "./db.js"
import jwt from "jsonwebtoken";
import { auth, JWT_SECRET } from "./auth.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
mongoose.connect("mongodb://localhost:27017/todo-app")

const app = express();
app.use(express.json());

app.post('/signup' ,async (req,res)=>{
    const {name , email, password} = req.body;
    const user = await UserModel.findOne({email})
    if(user ){
        return res.status(409).json({ msg: "User Already Exists", success: false });
    }
    const newUserModel= await UserModel.create({
        name : name,
        email:email,
        password:password
    })

    newUserModel.password=await bcrypt.hash(password, 10);
    await newUserModel.save()
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

app.post('/todo', async (req, res) => {
    const { userId, title, done  ,dueDate} = req.body;
    
    
    const newTodo = await TodoModel.create({
        userId: userId,
        title: title,
        done: done,
        dueDate:dueDate
    });
    console.log("New Todo:", newTodo);
    res.status(201).json(newTodo); 
    
});


app.put('/todos/:id', async(req,res)=>{
    const {id}=req.params;
    const {done}=req.body;

    const UpdateTodo=await TodoModel.findByIdAndUpdate(
        { _id: id },
        {done:done},
        {new:true}
    );
    if (!UpdateTodo) {
        return res.status(404).json({ msg: "Todo not found" });
    }

    res.json(UpdateTodo);
})



app.listen(3000 ,()=>{
    console.log("port listening on 3000")
})