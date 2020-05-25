import express from 'express';
import PatientsController from '../controllers/PatientsController';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';

const patientsRouter = express.Router();

patientsRouter.patch('/profile/:token', imageUpload.none, validator.updatePatientProfile, validateRequest, PatientsController.updateProfile);
patientsRouter.get('/get-all/:token', imageUpload.none, validator.getUsers, validateRequest, PatientsController.getAllPatients);
patientsRouter.get('/profile/:token', imageUpload.none, validator.getUsers, validateRequest, PatientsController.getProfile);

export default patientsRouter;
