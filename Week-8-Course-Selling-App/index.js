import express from "express"
import dotenv from "dotenv"
import { UserRouter } from "./router/user.js";
import { CourseRouter } from "./router/course.js";
import { AdminRouter } from "./router/admin.js";
import mongoose from "mongoose";
import "./db.js"
import { userMiddleware } from "./Middlewares/userAuth.js";
import { adminMiddleware } from "./Middlewares/adminAuth.js";

dotenv.config()
const app =express()
const port =process.env.PORT || 3000;
app.use(express.json())


app.use('/user',userMiddleware,UserRouter)
app.use('/admin',adminMiddleware,AdminRouter)
app.use('/course',CourseRouter)



const main =async()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("MongoDB Connected")
    })
    app.listen(port ,()=>{
        console.log(`Server is running on port : ${port}`)
    })
}
main()