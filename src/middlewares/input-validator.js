import {
//  param,
  body
} from 'express-validator';

import authValidator from '../database/input-validator/auth';

const validator = {};

validator.userSignup = [
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

export default validator;
