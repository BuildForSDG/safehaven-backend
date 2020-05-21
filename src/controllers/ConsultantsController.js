import model from '../models';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';

const { User } = model;

const ConsultantController = {
  async getOneConsultant(req, res) {
    try {
      const { userId } = req.params;
      const consultant = await User.findOne({
        attributes: { exclude: ['password', 'updatedAt'] },
        where: { uuid: userId }
      });

      if (!consultant) return sendErrorResponse(res, 404, 'User Not Found!!');
      return sendSuccessResponse(res, 200, consultant);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },
  async getAllConsultants(req, res) {
    try {
      const consultant = await User.findAll({
        attributes: { exclude: ['password', 'updatedAt'] },
        where: { role: 'consultant' }
      });
      if (!consultant) return sendErrorResponse(res, 404, 'User Not Found!!');

      return sendSuccessResponse(res, 200, consultant);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  }
};

export default ConsultantController;
