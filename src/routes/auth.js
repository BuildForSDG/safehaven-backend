import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/AuthController';
import validator from '../middlewares/input-validator';
import '../services/socialOAuth';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';
import Auth from '../middlewares/Auth';

const userRouter = express.Router();

userRouter.post('/auth/login', imageUpload.none, validator.login, validateRequest, AuthController.signin);
userRouter.post('/auth/signup-patient', imageUpload.none, validator.patientSignup, validateRequest, AuthController.signupPatient);
userRouter.post('/auth/signup-consultant', imageUpload.consultantSignup, validator.consultantSignup, validateRequest, AuthController.signupConsultant);
userRouter.get('/auth/verification/:token/:email', imageUpload.none, AuthController.verifyUser);
userRouter.get('/oauth/facebook', passport.authenticate('facebook', { session: false }), AuthController.social);
userRouter.put('/admin/validate-consultant-credentials/:consultantUuid', imageUpload.none, Auth, AuthController.verifyConsultantCredentials);

export default userRouter;
