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
  body('gender').isIn('male', 'female', 'not specified'),
  body('role', 'invalid user role').isIn('patient', 'admin', 'consultant'),
  body('specialization').not().isEmpty(),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric()
    .custom((phone) => authValidator.numberIsTaken(phone)
      .then((numberIsTaken) => {
        if (numberIsTaken) {
          return Promise.reject(Error('Phone already in use'));
        }
      })),
  body('email').normalizeEmail().isEmail()
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
        return Promise.reject(Error('Invalid session token'));
      }
      return true;
    })
];

validator.updatePatientProfile = [
  param('token')
    .custom((token) => {
      const payload = verifyToken(token);
      if (!(payload.email)) {
        return Promise.reject(Error('Invalid session token'));
      }
      return true;
    }),
  body('firstName').not().isEmpty().isLength({ min: 2 }),
  body('surName').not().isEmpty().isLength({ min: 2 }),
  body('middleName'),
  body('gender').isIn('male', 'female', 'not specified'),
  body('role', 'invalid user role').isIn('patient', 'admin', 'consultant'),
  body('conditions').not().isEmpty(),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric()
    .custom((phone) => authValidator.numberIsTaken(phone)
      .then((numberIsTaken) => {
        if (numberIsTaken) {
          const payload = verifyToken(param('token'));
          authValidator.notOwnNumber(phone, payload.email)
            .then((notOwnNumber) => {
              if (notOwnNumber) {
                return Promise.reject(Error('Phone already in use'));
              }
            }).catch((e) => {
              console.log(e);
            });
        }
      })),
  body('email').isEmail()
    .custom((email) => authValidator.emailIsTaken(email)
      .then((emailIsTaken) => {
        const payload = verifyToken(param('token'));
        const notOwnEmail = (email !== payload.email);
        console.log('notOwnEmail :::: ', notOwnEmail);
        console.log('emailIsTaken :::: ', emailIsTaken);
        if (notOwnEmail && emailIsTaken) {
          return Promise.reject(Error('E-mail already in use'));
        }
      }))
];


validator.updateConsultantProfile = [
  param('token')
    .custom((token) => {
      const payload = verifyToken(token);
      if (!(payload.email)) {
        return Promise.reject(Error('Invalid session token'));
      }
      return true;
    }),
  body('firstName').not().isEmpty().isLength({ min: 2 }),
  body('surName').not().isEmpty().isLength({ min: 2 }),
  body('middleName'),
  body('gender').isIn('male', 'female', 'not specified'),
  body('specialization').not().isEmpty(),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric()
    .custom((phone) => authValidator.numberIsTaken(phone)
      .then((numberIsTaken) => {
        if (numberIsTaken) {
          const payload = verifyToken(param('token'));
          authValidator.notOwnNumber(phone, payload.email)
            .then((notOwnNumber) => {
              if (notOwnNumber) {
                return Promise.reject(Error('Phone already in use'));
              }
            }).catch(() => {
              Promise.reject(Error('Unknown Error'));
            });
        }
      })),
  body('email').isEmail()
    .custom((email) => authValidator.emailIsTaken(email)
      .then((emailIsTaken) => {
        const payload = verifyToken(param('token'));
        const notOwnEmail = (email !== payload.email);
        if (notOwnEmail && emailIsTaken) {
          return Promise.reject(Error('E-mail already in use'));
        }
      }))
];


validator.updateProfile = [
  param('token')
    .custom((token) => {
      const payload = verifyToken(token);
      if (!(payload.email)) {
        return Promise.reject(Error('Invalid session token'));
      }
      return true;
    }),
  body('firstName').not().isEmpty().isLength({ min: 2 }),
  body('surName').not().isEmpty().isLength({ min: 2 }),
  body('middleName'),
  body('gender').isIn('male', 'female', 'not specified'),
  body('specialization'),
  body('conditions'),
  body('phone').not().isEmpty().isLength({ min: 8 })
    .isNumeric()
    .custom((phone) => authValidator.numberIsTaken(phone)
      .then((numberIsTaken) => {
        if (numberIsTaken) {
          const payload = verifyToken(param('token'));
          authValidator.notOwnNumber(phone, payload.email)
            .then((notOwnNumber) => {
              if (notOwnNumber) {
                return Promise.reject(Error('Phone already in use'));
              }
            }).catch(() => Promise.reject(Error('Unknown Error')));
        }
      })),
  body('email').isEmail()
    .custom((email) => authValidator.emailIsTaken(email)
      .then((emailIsTaken) => {
        const payload = verifyToken(param('token'));
        const notOwnEmail = (email !== payload.email);
        if (notOwnEmail && emailIsTaken) {
          return Promise.reject(Error('E-mail already in use'));
        }
      }))
];

export default validator;
