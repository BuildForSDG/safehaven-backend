import model from '../models';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import { hashPassword, comparePassword } from '../utils/passwordHash';
import { createToken, verifyToken } from '../utils/processToken';
import { SendMail } from '../services/emailsender';
import imageUploader from '../services/imageuploader';

const { User, Consultant } = model;

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

  async signupPatient(req, res) {
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
        const emailToken = createToken({ email });
        await SendMail(email, emailToken);
        return sendSuccessResponse(res, 200, 'User account successfully created');
      } catch (e) {
        return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
      }
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },

  async signupConsultant(req, res) {
    if (!(req.files.validIdCard && req.files.validCertificate)) {
      return sendErrorResponse(res, 422, 'Please select certificate and id card to upload');
    }

    try {
      const {
        firstName, surName, email, gender, phone, specialization
      } = req.body;
      const password = hashPassword(req.body.password);
      try {
        const user = {
          firstName, surName, email, gender, password, phone
        };
        user.avatar = await imageUploader('validIdCard', req.files.avatar);
        const emailToken = createToken({ email });
        const consultant = { role: 'consultant' };
        consultant.specialization = specialization;
        consultant.certificate = await imageUploader('validIdCard', req.files.validIdCard);
        consultant.validIdCard = await imageUploader('validCertificate', req.files.validCertificate);

        await Consultant.create(consultant);
        await User.create(user);
        await SendMail(email, emailToken);
        return sendSuccessResponse(res, 200, 'User account succesfully created');
      } catch (e) {
        return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
      }
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },

  async verifyUser(req, res) {
    try {
      // extracting the token and id from the query
      const { token, email } = req.params;
      // verify if the token exist
      const payload = await verifyToken(token);
      if (!payload.email) return sendErrorResponse(res, 401, 'Token not valid');

      // check if user exist
      const user = await User.findOne({ where: { email } });
      if (!user) return sendErrorResponse(res, 401, 'User is not available');
      if (user.dataValues.verified === true) return sendErrorResponse(res, 409, 'User is Already Verified!!!');

      // if it passes all the validation
      await user.update(
        {
          verified: true
        },
        {
          where: {
            email
          }
        }
      );
      return res.redirect(301, `${process.env.HOME_PAGE}`);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  }
};

export default AuthController;
