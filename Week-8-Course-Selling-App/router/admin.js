import { Router } from "express"
import { AdminModel, CourseModel } from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
//import { JWT_ADMIN_PASSWORD } from "../config.js";
import { adminMiddleware } from "../Middlewares/adminAuth.js";
dotenv.config();
const AdminRouter = Router()

const JWT_ADMIN_PASSWORD="nigga1233"

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
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await AdminModel.findOne({ email });
        
        // Check if the admin exists
        if (!admin) {
            return res.status(404).json({
                msg: "Admin doesn't exist"
            });
        }

        // Compare the password
        const CheckPass = await bcrypt.compare(password, admin.password);
        if (CheckPass) {
            const token = jwt.sign(
                { id: admin._id.toString() },
                process.env.JWT_ADMIN_PASSWORD // Use your secret key from environment variables
            );

            return res.json({
                token,
                msg: "Login Successfully"
            });
        } else {
            return res.status(403).json({
                msg: "Incorrect Credentials"
            });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }

})
AdminRouter.post('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    try {
        const course = await CourseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        });

        res.json({
            msg: "Created the course",
            courseId: course._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creating course", error: error.message });
    }
});

AdminRouter.put('/course',adminMiddleware, async(req, res) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await CourseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title,
        description,
        imageUrl,
        price
    })
    res.json({
        message: "Course updated",
        courseId: course._id
    })
})
 
AdminRouter.get('/course/bulk',adminMiddleware, async(req, res) => {
    const adminId=req.userId;
    const courses = await CourseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})

export {
    AdminRouter
}