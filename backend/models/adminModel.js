import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    cartDtata:{type:Object,default:{}}
},{minimize:false})

const adminModel = mongoose.model.admin || mongoose.model("admin",adminSchema);
export default adminModel;