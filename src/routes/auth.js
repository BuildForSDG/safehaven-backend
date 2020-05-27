import express from 'express';
import AuthController from '../controllers/AuthController';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';

const userRouter = express.Router();

userRouter.post('/auth/login', imageUpload.none, validator.login, validateRequest, AuthController.signin);
userRouter.post('/auth/signup-patient', imageUpload.none, validator.patientSignup, validateRequest, AuthController.signupPatient);
userRouter.post('/auth/signup-consultant', imageUpload.consultantSignup, validator.consultantSignup, validateRequest, AuthController.signupConsultant);
userRouter.get('/auth/verification/:token/:email', imageUpload.none, AuthController.verifyUser);

export default userRouter;
