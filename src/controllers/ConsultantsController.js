import model from '../models';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import { verifyToken } from '../utils/processToken';

const { User, Consultant } = model;

const ConsultantController = {
  async getProfile(req, res) {
    try {
      const { uuid } = await verifyToken(req.params.token);

      const consultant = await User.findOne({
        include: { model: Consultant, as: 'consultant' },
        attributes: { exclude: ['password', 'updatedAt'] },
        where: { uuid }
      });

      if (!consultant) return sendErrorResponse(res, 404, 'User Not Found!!');
      return sendSuccessResponse(res, 200, consultant);
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
  async getAllConsultants(req, res) {
    try {
      const consultant = await User.findAll({
        include: { model: Consultant, as: 'consultant' },
        attributes: { exclude: ['password', 'updatedAt'] },
        where: { role: 'consultant' }
      });

      if (!consultant) return sendErrorResponse(res, 404, 'User Not Found!!');

      return sendSuccessResponse(res, 200, consultant);
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  }
};

export default ConsultantController;
