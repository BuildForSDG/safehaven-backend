/**
 * Request parameters and body validator
 * Also to prevent mysql injection
 * by sanitizing parsed data (param, body)
 */

import {
  param,
  body
} from 'express-validator';

import authValidator from '../database/input-validator/auth';
import { verifyToken } from '../utils/processToken';

const validator = {};

validator.patientSignup = [
  body('firstName').not().isEmpty().isLength({ min: 2 }),
  body('surName').not().isEmpty().isLength({ min: 2 }),
  body('middleName'),
  body('password').not().isEmpty().isLength({ min: 8 }),
  body('gender').isIn('male', 'female', 'not specified'),
  body('role', 'invalid user role').isIn('patient', 'admin', 'consultant'),
  body('conditions').not().isEmpty(),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric()
    .custom((phone) => authValidator.numberIsUnique(phone)
      .then((numberIsUnique) => {
        if (numberIsUnique) {
          return Promise.reject(Error('Phone already in use'));
        }
      })),
  body('email').isEmail()
    .custom((email) => authValidator.emailIsUnique(email)
      .then((emailIsUnique) => {
        if (emailIsUnique) {
          return Promise.reject(Error('E-mail already in use'));
        }
      }))
];

validator.consultantSignup = [
  body('firstName').not().isEmpty().isLength({ min: 2 }),
  body('surName').not().isEmpty().isLength({ min: 2 }),
  body('password').not().isEmpty().isLength({ min: 8 }),
  body('gender').isIn('male', 'female', 'not specified'),
  body('role', 'invalid user role').isIn('patient', 'admin', 'consultant'),
  body('specialization').not().isEmpty(),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric()
    .custom((phone) => authValidator.numberIsUnique(phone)
      .then((numberIsUnique) => {
        if (numberIsUnique) {
          return Promise.reject(Error('Phone already in use'));
        }
      })),
  body('email').normalizeEmail().isEmail()
    .custom((email) => authValidator.emailIsUnique(email)
      .then((emailIsUnique) => {
        if (emailIsUnique) {
          return Promise.reject(Error('E-mail already in use'));
        }
      }))
];

validator.login = [
  body('email', 'please enter a valid email').normalizeEmail().isEmail(),
  body('password').trim().escape()
];

validator.getOneUser = [
  param('userId'),
  param('token')
    .custom((token) => verifyToken(token)
      .then((payload) => {
        if (!(payload.email)) {
          return Promise.reject(Error('Invalid session token'));
        }
      }))
];

validator.getAllUsers = [
  param('token')
    .custom((token) => verifyToken(token)
      .then((payload) => {
        if (!(payload.email)) {
          return Promise.reject(Error('Invalid session token'));
        }
      }))
];

export default validator;
