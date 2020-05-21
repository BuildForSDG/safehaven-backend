import express from 'express';
import ConsultantsController from '../controllers/ConsultantsController';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';

const consultantsRouter = express.Router();

consultantsRouter.get('/get-all/:token', validator.getAllUsers, validateRequest, ConsultantsController.getAllConsultants);
consultantsRouter.get('/get-one/:token/:userId', validator.getAllUsers, validateRequest, ConsultantsController.getOneConsultant);

export default consultantsRouter;
