import {Router} from "express"
const CourseRouter = Router()

CourseRouter.post('/purchase', (req, res) => {
    res.json({
        msg: "Course purchase endpoint working"
    });
});

CourseRouter.get('/preview', (req, res) => {
    res.json({
        msg: "Course preview endpoint working"
    });
});

export{
    CourseRouter
}