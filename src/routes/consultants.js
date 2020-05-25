import express from 'express';
import ConsultantsController from '../controllers/ConsultantsController';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';

const consultantsRouter = express.Router();

consultantsRouter.get('/get-all/:token', validator.getUsers, validateRequest, ConsultantsController.getAllConsultants);
consultantsRouter.get('/profile/:token', validator.getUsers, validateRequest, ConsultantsController.getProfile);
consultantsRouter.patch('/profile/:token', imageUpload.none, validator.updateConsultantProfile, validateRequest, ConsultantsController.updateProfile);

export default consultantsRouter;
