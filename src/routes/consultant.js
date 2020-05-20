import express from 'express';
import ConsultantController from '../controllers/consultantController';
import Auth from '../middlewares/Auth';
import checkConsultant from '../middlewares/role';
import imageUpload from '../middlewares/imageUpload';

const consultantRouter = express.Router();

consultantRouter.post('/select-available-time', imageUpload.none, Auth, checkConsultant, ConsultantController.SubmitAvailableTime);
consultantRouter.get('/available-time', Auth, ConsultantController.getConsultantAvailableDays);
export default consultantRouter;
