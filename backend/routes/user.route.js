import express from 'express';
import { signupUser, loginUser, getUserProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authMiddleware, getUserProfile);

export default userRouter;
