// backend/routes/userRoute.js
import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authMiddleware, getUserProfile);

export default userRouter;
