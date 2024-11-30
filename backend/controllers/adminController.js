import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import validator from "validator"

// login admin

const loginAdmin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await adminModel.findOne({email});

        if(!user){
            return res.json({success: false, message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success: false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

const createToken  = (id)=>{
    return jwt.sign({_id: id},"acesstoken", {expiresIn: "60m"});
}


//register admin

const registerAdmin = async (req, res) => {
    const {name,password,email} = req.body;
    try{
        const exists = await adminModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"Already registered"})
        }

         if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Invalid email"})
         }

         if (password.length<6) {
            return res.json({success:false,message:"please enter a strong password"})
         }

        const salt = await bcrypt.genSalt(10) 
        const hashedPassword = await bcrypt.hash(password,salt);

        const newAdmin = new adminModel({
            name:name,
            email:email,
            password: hashedPassword
        })

        const user = await newAdmin.save()
        var token = jwt.sign({"_id": user._id},'accessToken',{expiresIn: "60m"});
        
       res.json({status: 200, success: true, token})
        
    } catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

export {loginAdmin, registerAdmin}

