import model from '../models';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import { hashPassword } from '../utils/passwordHash';

const { User } = model;

const PatientController = {
  async getOnePatient(req, res) {
    try {
      const { userId } = req.params;
      const patient = await User.findOne({
        attributes: { exclude: ['password', 'updatedAt'] },
        where: { uuid: userId }
      });

      if (!patient) return sendErrorResponse(res, 404, 'User Not Found!!');
      return sendSuccessResponse(res, 200, patient);
    } catch (e) {
      console.log(e);
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
      console.log(e);
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  }
};

export default PatientController;
