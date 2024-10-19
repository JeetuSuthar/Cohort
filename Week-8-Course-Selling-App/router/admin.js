import { Router } from "express"
import { AdminModel } from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import { JWT_ADMIN_PASSWORD } from "../config.js";
import { adminMiddleware } from "../Middlewares/adminAuth.js";
dotenv.config();
const AdminRouter = Router()



AdminRouter.post('/signup',  async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const admin = await AdminModel.findOne({ email })
        if (admin) {
            console.log("User already Exists")
        }

        const hashedPass = await bcrypt.hash(password, 5)
        AdminModel.create({
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

AdminRouter.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        const admin = await AdminModel.findOne({ email })
        if (!admin) {
            console.log("User doesnt Exists")
        }

        const CheckPass = await bcrypt.compare(password, admin.password)
        if (CheckPass) {
            const token = jwt.sign({
                id: admin._id.toString()
            },JWT_ADMIN_PASSWORD)

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
AdminRouter.post('/course',adminMiddleware, (req, res) => {
    res.json({
        msg: "working"
    })
})
AdminRouter.put('/course', (req, res) => {
    res.json({
        msg: "working"
    })
})

AdminRouter.get('/course/bulk', (req, res) => {
    res.json({
        msg: "working"
    })
})
export {
    AdminRouter
}