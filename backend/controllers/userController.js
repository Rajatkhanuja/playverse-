// backend/controllers/userController.js
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User Doesn't exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ _id: id }, "accessToken", { expiresIn: "60m" });
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "Already registered" });

        if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid email" });
        if (password.length < 6) return res.json({ success: false, message: "Please enter a strong password" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = jwt.sign({ "_id": user._id }, 'accessToken', { expiresIn: "60m" });

        res.json({ status: 200, success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

// Fetch User Profile
const getUserProfile = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await userModel.findById(userId).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export { loginUser, registerUser, getUserProfile };
