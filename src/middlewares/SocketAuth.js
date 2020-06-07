import { verifyToken } from '../utils/processToken';
import model from '../models';

const { User } = model;

const socketAuth = async (token, socket, io) => {
  try {
    if (!token) io.to(socket.id).emit('login_error', { message: 'Access denied, please login to have access' });
    const { email } = verifyToken(token);
    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ['password']
      }
    });
    if (!user) io.to(socket.id).emit('login_error', { message: 'User not found please sign up' });
    io.to(socket.id).emit('login_success', { message: 'connection successful' });
    return user.dataValues;
  } catch (e) {
    console.log(e);
    io.to(socket.id).emit('login_error', { message: 'Please login' });
  }
};

export default socketAuth;
