import express from 'express';
import PatientsController from '../controllers/PatientsController';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';

const patientsRouter = express.Router();

patientsRouter.get('/get-all/:token', validator.getAllUsers, validateRequest, PatientsController.getAllPatients);
patientsRouter.get('/get-one/:token/:userId', validator.getAllUsers, validateRequest, PatientsController.getOnePatient);

export default patientsRouter;
