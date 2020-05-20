import { sendErrorResponse } from '../utils/sendResponse';

const checkConsultant = (req, res, next) => {
  const { role } = req.userData;
  return role === 'consultant' ? next() : sendErrorResponse(res, 422, 'ACCESS DENIED');
};

export default checkConsultant;
