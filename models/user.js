import {Schema, model} from "mongoose";

const collectionName = "user"
const collectionSchema = new Schema({

    name:String,
    email:{
        unique:true,
        type:String,
        required:true
    },
    password: String
})

export default model(collectionName,collectionSchema)