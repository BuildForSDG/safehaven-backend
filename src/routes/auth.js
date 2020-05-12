import express from 'express';
import AuthController from '../controllers/AuthController';
// import Auth from '../middlewares/Auth';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';

const userRouter = express.Router();

userRouter.post('/login', validator.login, validateRequest, AuthController.signin);
userRouter.post('/signup', validator.userSignup, validateRequest, AuthController.signup);

export default userRouter;
