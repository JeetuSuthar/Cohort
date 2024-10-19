import {Router } from "express"

import { CourseModel, PurchaseModel, UserModel } from "../db.js"
const UserRouter = Router()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
//import { JWT_USER_PASSWORD } from "../config.js"
import { userMiddleware } from "../Middlewares/userAuth.js"
dotenv.config();
const JWT_USER_PASSWORD="wigga1234"

UserRouter.post('/signup', async(req,res)=>{
    try {
        const { firstName, lastName, email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            console.log("User already Exists")
        }

        const hashedPass = await bcrypt.hash(password, 5)
        UserModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPass
        })

        res.status(201).json({
            msg: "Signup Successfully"
        })

    } catch (err) {
        res.status(403).json({
            msg: "Invalid Creds"
        })
    }
})

UserRouter.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) {
            console.log("User doesnt Exists")
        }

        const CheckPass = await bcrypt.compare(password, user.password)
        if (CheckPass) {
            const token = jwt.sign({
                id: user._id.toString()
            },JWT_USER_PASSWORD)

            res.json({
                token,
                msg: "Login Successfully"
            })
        } else {
            res.status(403).json({
                msg: "Incorrect Credential"
            })
        }
    } catch (err) {
        res.status(403).json({
            msg: "Invalid Creds"
        })
    }
})

UserRouter.get('/purchases',userMiddleware,async(req,res)=>{
    const userId = req.userId;

    const purchases = await PurchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await CourseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})
export {
    UserRouter
}