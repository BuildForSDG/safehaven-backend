import express from 'express';
import PatientsController from '../controllers/PatientsController';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';

const patientsRouter = express.Router();

patientsRouter.get('/patients/:token', imageUpload.none, validator.getUsers, validateRequest, PatientsController.getAllPatients);

export default patientsRouter;
