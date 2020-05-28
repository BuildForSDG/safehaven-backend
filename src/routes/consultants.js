import express from 'express';
import ConsultantsController from '../controllers/ConsultantsController';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';

const consultantsRouter = express.Router();

consultantsRouter.get('/:token', validator.getUsers, validateRequest, ConsultantsController.getAllConsultants);

export default consultantsRouter;
