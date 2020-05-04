import express from 'express';
import AuthController from './../controllers/AuthController';
import Auth from '../middlewares/Auth';
import GetRefererId from './../middlewares/getRefererId';

const userRouter = express.Router();

const prfx = 'auth';

userRouter.post(`/${prfx}/signup`, GetRefererId, AuthController.signup);
userRouter.post(`/${prfx}/signin`, AuthController.signin);
userRouter.get(`/${prfx}/me`, Auth, AuthController.me);
userRouter.get(`/${prfx}/verification/:token/:email/:id`, AuthController.verifyUser);
userRouter.post(`/${prfx}/forgetpassword`, AuthController.forgetPassword);
userRouter.get(`/${prfx}/verifypassword/:token/:email/:id`, AuthController.verifyPasswordLink);
userRouter.post(`/${prfx}/resetpassword`, AuthController.resetPassword);
userRouter.patch(`/${prfx}/updateprofile`, Auth, AuthController.updateUser);
userRouter.post(`/${prfx}/refresh-email-token`, AuthController.getNewEmailToken);
userRouter.get(`/${prfx}/sample`, AuthController.sample);
userRouter.post('/contact-us', AuthController.sendContactUsEmail);
// userRouter.get(`/${prfx}/user/validations`, AuthController.signUpValidation);

export default userRouter;
