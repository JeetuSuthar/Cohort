import mongoose, { Schema }  from "mongoose"
const ObjectId=Schema.ObjectId;

const User = new Schema({
    name:String,
    email:{type:String , unique:true},
    password:String
})

const Todo = new Schema({
    userId:ObjectId,
    title:String,
    done:Boolean
})

const UserModel= new mongoose.model("users",User);
const TodoModel = new mongoose.model("todos", Todo);

export {
    UserModel,
    TodoModel
}
