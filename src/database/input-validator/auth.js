import model from '../../models';

const { User } = model;

const numberIsTaken = async (phone) => {
  console.log('numberIsTaken ::: ', phone);
  const user = await User.findOne({ where: { phone } });
  console.log('IsTaken ::::: ', !!user);
  return !!user;
};

const emailIsTaken = async (email) => {
  console.log('email ::::: ', email);
  const user = await User.findOne({ where: { email } });
  console.log('IsTaken ::::: ', !!user);
  return !!user;
};

const notOwnNumber = async (phone, email) => {
  const user = await User.findOne({ where: { email, phone } });
  console.log('notOwnNumber :::::: ');
  return !user;
};

export default { emailIsTaken, numberIsTaken, notOwnNumber };
