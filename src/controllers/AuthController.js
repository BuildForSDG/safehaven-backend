/* eslint-disable no-unused-vars */
import token from 'uuid';
import model from '../models';
import {
  validate, inValidName, inValidEmail, inValidPassword, magicTrimmer
} from '../utils/validator';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import { hashPassword, comparePassword } from '../utils/passwordHash';
import { SendMail, sendForgotPasswordMail } from '../services/emailsender';
import { createToken } from '../utils/processToken';

const { User } = model;

// returns a token for logged in user or during sign up
const userToken = (user) => {
  const {
    email, name, role, uuid
  } = user;
  return {
    token: createToken({
      uuid,
      name,
      email,
      role
    })
  };
};

const AuthController = {
  async signin(req, res, next) {
    try {
      // extracting user data
      const { email, password, username } = req.body;

      // checking if the user exist
      const user = email ? await User.findOne({ where: { email } })
        : await User.findOne({ where: { username } });

      if (!user) return sendErrorResponse(res, 404, 'User Not Found!!');

      // compare password
      const checkPassword = comparePassword(password, user.dataValues.password);
      if (!checkPassword) return sendErrorResponse(res, 400, 'Incorrect Password');

      // check user verification
      if (!user.dataValues.verified) return sendErrorResponse(res, 401, 'Verify Your Account ');
      const createdToken = userToken(user.dataValues);

      return sendSuccessResponse(res, 200, createdToken);
    } catch (e) {
      return next(e);
    }
  }
};

export default AuthController;
