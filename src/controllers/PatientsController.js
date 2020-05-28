import model from '../models';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import { verifyToken } from '../utils/processToken';

const { User } = model;

const PatientController = {
  async getProfile(req, res) {
    try {
      const { uuid } = await verifyToken(req.params.token);
      const patient = await User.findOne({
        attributes: { exclude: ['password', 'updatedAt'] },
        where: { uuid }
      });
      if (!patient) return sendErrorResponse(res, 404, 'User Not Found!!');
      return sendSuccessResponse(res, 200, patient);
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },
  async updateProfile(req, res) {
    try {
      const {
        firstName, surName, email, phone,
        dateOfBirth, nationality, avatar, stateOfOrigin, address
      } = req.body;
      const user = {
        firstName, surName, email, phone, dateOfBirth, nationality, avatar, stateOfOrigin, address
      };
      const { uuid } = await verifyToken(req.params.token);
      await User.update(user, { where: { uuid } });
      return sendSuccessResponse(res, 200, 'Account Succesfully updated');
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },
  async getAllPatients(req, res) {
    try {
      const patient = await User.findAll({
        attributes: { exclude: ['password', 'updatedAt'] },
        where: { role: 'patient' }
      });
      if (!patient) return sendErrorResponse(res, 404, 'User Not Found!!');
      return sendSuccessResponse(res, 200, patient);
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  }
};

export default PatientController;
