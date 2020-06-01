import express from 'express';
import ConsultantController from '../controllers/consultantController';
import Auth from '../middlewares/Auth';
import checkConsultant from '../middlewares/role';
import imageUpload from '../middlewares/imageUpload';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';

const consultantRouter = express.Router();

consultantRouter.post('/select-available-time', imageUpload.none, Auth, checkConsultant, ConsultantController.SubmitAvailableTime);
consultantRouter.get('/available-time', Auth, ConsultantController.getConsultantAvailableDays);
consultantRouter.get('/consultants/:token', validator.getUsers, validateRequest, ConsultantController.getAllConsultants);

export default consultantRouter;
