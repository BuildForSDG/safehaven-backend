import model from '../../models';

const { User } = model;

const numberIsTaken = async (phone) => {
  const user = await User.findOne({ where: { phone } });
  return !!user;
};

const emailIsTaken = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

const notOwnNumber = async (phone, email) => {
  const user = await User.findOne({ where: { email, phone } });
  return !user;
};

export default { emailIsTaken, numberIsTaken, notOwnNumber };
