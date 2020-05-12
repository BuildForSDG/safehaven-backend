import model from '../models';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import { hashPassword, comparePassword } from '../utils/passwordHash';
import { createToken } from '../utils/processToken';

const { User } = model;

// returns a token for logged in user or during sign up
const userToken = (user) => {
  const {
    email, firstName, middleName, surName, role, uuid
  } = user;
  return {
    token: createToken({
      uuid,
      firstName,
      middleName,
      surName,
      email,
      role
    })
  };
};

const AuthController = {
  async signin(req, res) {
    try {
      const { email, password, username } = req.body;
      const user = email ? await User.findOne({ where: { email } })
        : await User.findOne({ where: { username } });

      if (!user) return sendErrorResponse(res, 404, 'User Not Found!!');

      const checkPassword = comparePassword(password, user.dataValues.password);
      if (!checkPassword) return sendErrorResponse(res, 400, 'Email or Password does not match');

      if (!user.dataValues.verified) return sendErrorResponse(res, 401, 'Verify Your Account ');
      const createdToken = userToken(user.dataValues);

      return sendSuccessResponse(res, 200, createdToken);
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },
  async signup(req, res) {
    try {
      const {
        firstName, surName, middleName, email, gender, phone, conditions, role
      } = req.body;
      let { password } = req.body;
      password = hashPassword(password);

      try {
        const user = {
          firstName, surName, middleName, email, gender, password, phone, conditions, role
        };
        await User.create(user);
        return sendSuccessResponse(res, 200, 'User account succesfully created');
      } catch (e) {
        console.log(e);
        return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
      }
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  }
};

export default AuthController;
