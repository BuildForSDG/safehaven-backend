import express from 'express';
import validator from '../middlewares/input-validator';
import validateRequest from '../utils/validateRequest';
import imageUpload from '../middlewares/imageUpload';
import PatientsController from '../controllers/PatientsController';
import ConsultantController from '../controllers/consultantController';
import { verifyToken } from '../utils/processToken';

const { PreventDuplicateContactEdit } = validator;
const profileRouter = express.Router();

profileRouter.patch('/profile/:token', imageUpload.none, validator.updateProfile, validateRequest, PreventDuplicateContactEdit,
  (req, res) => {
    const { token } = req.params;
    const payload = verifyToken(token);

    return (payload.role === 'consultant') ? ConsultantController.updateProfile(req, res)
      : PatientsController.updateProfile(req, res);
  });

profileRouter.get('/profile/:token', imageUpload.none, validator.getUsers, validateRequest, (req, res) => {
  const { token } = req.params;
  const payload = verifyToken(token);
  return (payload.role === 'consultant') ? ConsultantController.getProfile(req, res)
    : PatientsController.getProfile(req, res);
});

export default profileRouter;
