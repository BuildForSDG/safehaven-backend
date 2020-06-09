/**
 * Request parameters and body validator
 * Also to prevent SQL injection
 * by sanitizing parsed data (param, body)
 */

import {
  param,
  body
} from 'express-validator';

import authValidator from '../database/input-validator/auth';
import { verifyToken } from '../utils/processToken';
import { sendErrorResponse } from '../utils/sendResponse';

const validator = {};

const expressValidatorResponseMock = (value, msg, parameter, location) => ({
  value,
  msg,
  param: parameter,
  location
});

validator.patientSignup = [
  body('firstName').not().isEmpty().isLength({ min: 2 }),
  body('surName').not().isEmpty().isLength({ min: 2 }),
  body('middleName'),
  body('password').not().isEmpty().isLength({ min: 8 }),
  body('role', 'invalid user role').isIn(['patient', 'admin', 'consultant']),
  body('conditions'),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric()
    .custom((phone) => authValidator.numberIsTaken(phone)
      .then((numberIsTaken) => {
        if (numberIsTaken) {
          return Promise.reject(Error('Phone already in use'));
        }
      })),
  body('email').isEmail()
    .custom((email) => authValidator.emailIsTaken(email)
      .then((emailIsTaken) => {
        if (emailIsTaken) {
          return Promise.reject(Error('E-mail already in use'));
        }
      }))
];

validator.consultantSignup = [
  body('firstName').not().isEmpty().isLength({ min: 2 }),
  body('surName').not().isEmpty().isLength({ min: 2 }),
  body('password').not().isEmpty().isLength({ min: 8 }),
  body('role', 'invalid user role'),
  body('specialization'),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric()
    .custom((phone) => authValidator.numberIsTaken(phone)
      .then((numberIsTaken) => {
        if (numberIsTaken) {
          return Promise.reject(Error('Phone already in use'));
        }
      })),
  body('email').isEmail()
    .custom((email) => authValidator.emailIsTaken(email)
      .then((emailIsTaken) => {
        if (emailIsTaken) {
          return Promise.reject(Error('E-mail already in use'));
        }
      }))
];

validator.login = [
  body('email', 'please enter a valid email').normalizeEmail().isEmail(),
  body('password').trim().escape()
];

validator.getUsers = [
  param('token')
    .custom((token) => {
      const payload = verifyToken(token);
      if (!(payload.email)) {
        return Error('Invalid session token');
      }
      return true;
    })
];

validator.updateProfile = [
  param('token')
    .custom((token) => {
      const payload = verifyToken(token);
      if (!(payload.email)) {
        return Error('Invalid session token');
      }
      return true;
    }),
  body('firstName').not().isEmpty().isLength({ min: 2 }),
  body('surName').not().isEmpty().isLength({ min: 2 }),
  body('middleName'),
  body('gender').isIn(['male', 'female', 'not specified']),
  body('specialization'),
  body('conditions'),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric(),
  body('email').isEmail()
];

validator.PreventDuplicateContactEdit = async (req, res, next) => {
  const { phone, email } = req.body;
  const { token } = req.params;
  const payload = verifyToken(token);
  try {
    const emailIsTaken = await authValidator.emailIsTaken(email);
    const numberIsTaken = await authValidator.numberIsTaken(phone);
    const notOwnNumber = await authValidator.notOwnNumber(phone, payload.email);
    const notOwnEmail = (email !== payload.email);
    if (emailIsTaken && notOwnEmail) {
      const error = expressValidatorResponseMock(email, 'E-mail is already in use', 'email', 'body');
      return sendErrorResponse(res, 422, error);
    }
    if (numberIsTaken && notOwnNumber) {
      const error = expressValidatorResponseMock(phone, 'Phone is already in use', 'phone', 'body');
      return sendErrorResponse(res, 422, error);
    }
    next();
  } catch (error) {
    return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
  }
};

export default validator;
