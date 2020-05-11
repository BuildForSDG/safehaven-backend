import model from '../../models';

const { User } = model;

const numberIsUnique = async (phone) => {
  const user = await User.findOne({ where: { phone } });
  return !!user;
};

const emailIsUnique = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

export default { emailIsUnique, numberIsUnique };
