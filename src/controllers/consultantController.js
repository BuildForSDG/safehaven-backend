import model from '../models';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import { verifyToken } from '../utils/processToken';
import imageUploader from '../services/imageuploader';

const { User, Consultant, AvailableTime } = model;

const ConsultantController = {

  async getProfile(req, res) {
    try {
      const { uuid } = await verifyToken(req.params.token);

      const consultant = await User.findOne({
        include: [{ model: Consultant, as: 'consultant' }],
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
    const consultant = {};
    const { uuid } = await verifyToken(req.params.token);
    try {
      if (req.files.validIdCard !== undefined) {
        consultant.validIdCard = await imageUploader('validCertificate', req.files.validCertificate);
      }
      if (req.files.validCertificate !== undefined) {
        consultant.certificate = await imageUploader('validIdCard', req.files.validIdCard);
        await Consultant.update(consultant, { where: { uuid } });
      }

      const {
        firstName, surName, email, phone,
        dateOfBirth, nationality, stateOfOrigin, gender, address
      } = req.body;
      const user = {
        firstName, surName, email, phone, dateOfBirth, nationality, stateOfOrigin, gender, address
      };
      if (req.files.avatar !== undefined) {
        user.avatar = await imageUploader('avatar', req.files.avatar);
      }
      await User.update(user, { where: { uuid } });

      return sendSuccessResponse(res, 200, 'Account Succesfully updated');
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },
  async getAllConsultants(req, res) {
    try {
      const consultant = await User.findAll({
        include: [{ model: Consultant, as: 'consultant' }],
        attributes: { exclude: ['password', 'updatedAt'] },
        where: { role: 'consultant' }
      });

      if (!consultant) return sendErrorResponse(res, 404, 'User Not Found!!');

      return sendSuccessResponse(res, 200, consultant);
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },

  async SubmitAvailableTime(req, res) {
    try {
      const { uuid } = req.userData;
      const { availableTime } = req.body;
      const dataToSave = await availableTime.map((x) => ({
        consultant_uuid: uuid,
        available_time: x
      }));
      await AvailableTime.bulkCreate(dataToSave);
      return sendSuccessResponse(res, 200, 'operation successful');
    } catch (error) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },

  //  get available days and time consultant
  async getConsultantAvailableDays(req, res) {
    try {
      const { consultantUuid } = req.query;
      const availableTimes = await AvailableTime.findAll({
        where: { consultant_uuid: consultantUuid }
      });
      return sendSuccessResponse(res, 200, availableTimes);
    } catch (error) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  }
};

export default ConsultantController;
