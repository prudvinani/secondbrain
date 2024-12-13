import mongoose, { Schema } from "mongoose";
const ContentSchema=new Schema({
    title:String,
    link:String,
    type:String,
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    tags:[{type:mongoose.Types.ObjectId,ref:"Tags"}]
})

export const ContentModel=mongoose.model("Content",ContentSchema)



const LinkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true}
})
export const LinkModel=mongoose.model("Tags",LinkSchema)
