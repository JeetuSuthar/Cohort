import mongoose from "mongoose";

import { Schema } from "mongoose";
const ObjectId= mongoose.Types.ObjectId


const UserSchema= new Schema({
    firstName:String,
    lastName:String,
    email:{type:String , unique:true},
    password:String
})

const AdminSchema= new Schema({
    firstName:String,
    lastName:String,
    email:{type:String , unique:true},
    password:String
})
const CourseSchema= new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
   
})
const PurchaseSchema= new Schema({
    userId: ObjectId,
    courseId: ObjectId
    
})

const UserModel= await new mongoose.model("user",UserSchema)
const AdminModel= await new mongoose.model("admin",AdminSchema)
const CourseModel=await new mongoose.model("course",CourseSchema)
const PurchaseModel=await new mongoose.model("purchase",PurchaseSchema)

export{
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}