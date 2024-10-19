import {Router} from "express"
import { userMiddleware } from "../Middlewares/userAuth.js";
import { CourseModel, PurchaseModel } from "../db.js";
const CourseRouter = Router()

CourseRouter.post('/purchase',userMiddleware, async(req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    
    // should check that the user has actually paid the price
    await PurchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
});

CourseRouter.get('/preview', async(req, res) => {
    const courses = await CourseModel.find({});

    res.json({
        courses
    })
});

export{
    CourseRouter
}