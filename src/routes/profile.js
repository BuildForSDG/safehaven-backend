import express from 'express';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';
import PatientsController from '../controllers/PatientsController';
import ConsultantsController from '../controllers/ConsultantsController';
import { verifyToken } from '../utils/processToken';

const profileRouter = express.Router();

profileRouter.patch('/:token', imageUpload.none, validator.updateProfile, validateRequest, (req, res) => {
  const { token } = req.params;
  const payload = verifyToken(token);
  return (payload.role === 'consultant') ? ConsultantsController.updateProfile(req, res)
    : PatientsController.updateProfile(req, res);
});

profileRouter.get('/:token', imageUpload.none, validator.getUsers, validateRequest, (req, res) => {
  const { token } = req.params;
  const payload = verifyToken(token);
  return (payload.role === 'consultant') ? ConsultantsController.getProfile(req, res)
    : PatientsController.getProfile(req, res);
});

export default profileRouter;