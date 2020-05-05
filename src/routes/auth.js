/* eslint-disable no-unused-vars */
import express from 'express';
import AuthController from '../controllers/AuthController';
import Auth from '../middlewares/Auth';

const userRouter = express.Router();

export default userRouter;
