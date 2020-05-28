import { validationResult } from 'express-validator';
import { sendErrorResponse } from './sendResponse';

const validateRequest = (req, res, next) => {
  // eslint-disable-next-line eqeqeq
  if ((req.method == 'put' || req.method == 'post' || req.method == 'patch') && req.body === {}) {
    sendErrorResponse(res, 400, 'Empty request');
  }
  const errors = validationResult(req);
  console.log(errors.array());
  return errors.isEmpty()
    ? next() : sendErrorResponse(res, 422, errors.array()[0]);
};

export default validateRequest;
