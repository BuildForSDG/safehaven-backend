import express from 'express';
import AppointmentsController from '../controllers/AppointmentsController';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';

const appointmentsRouter = express.Router();

appointmentsRouter.post('/appointments/:token', imageUpload.none, validator.getUsers, validateRequest, AppointmentsController.book);
appointmentsRouter.get('/appointments/:token', imageUpload.none, validator.getUsers, validateRequest, AppointmentsController.getAll);

export default appointmentsRouter;
