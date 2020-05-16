import express from 'express';
import AuthController from '../controllers/AuthController';
// import Auth from '../middlewares/Auth';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';

const userRouter = express.Router();

userRouter.post('/login', validator.login, validateRequest, AuthController.signin);
userRouter.post('/signup-patient', validator.patientSignup, validateRequest, AuthController.signupPatient);
userRouter.post('/signup-consultant', imageUpload.consultantSignup, validator.consultantSignup, validateRequest, AuthController.signupConsultant);
userRouter.get('/verification/:token/:email', AuthController.verifyUser);

export default userRouter;
