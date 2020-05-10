import { validationResult } from 'express-validator';
import { sendErrorResponse } from './sendResponse';


const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  return errors.isEmpty() ? next() : sendErrorResponse(res, 422, errors.array()[0]);
};

export default validateRequest;
