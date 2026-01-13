import express from 'express';
import { createUser, getMe, LoginUser, resendOTP, verifyOTP } from '../controllers/auth.Controllers.js';
import { authMiddleware } from '../middlewares/auth.Middleware.js';


const authRouter = express.Router();

authRouter.get('/me', authMiddleware, getMe)
authRouter.post('/create-user', createUser);
authRouter.post('/verify-otp', verifyOTP);
authRouter.post('/resend-otp', resendOTP);
authRouter.post('/login-user', LoginUser);

export default authRouter;

