/* eslint-disable max-len */
import Sequelize, {
  Op, fn, col, and
} from 'sequelize';

const helperMethods = {


  // find a user by uuid
  async getAUserByUuid(User, uuid, exclude) {
    const user = await User.findOne({
      where: { uuid },
      attributes: {
        exclude
      }
    });
    return user;
  },

  // find user by username
  async getAUserByUsernameAndUuid(User, username) {
    const user = await User.findOne({
      where: { username },
      attributes: [
        'uuid'
      ]
    });

    return user;
  },

  // get all users
  async signUpValidations(User) {
    const users = await User.findAll({
      attributes: [
        'uuid',
        'username',
        'email',
        'referee'
      ],
      order: [
        [
          'username',
          'ASC'
        ]
      ],
      raw: true
    });
    return users;
  },


  async searchForUser(table, input) {
    const users = await table.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${input}%` } },
          { username: { [Op.iLike]: `%${input}%` } },
          { email: { [Op.iLike]: `%${input}%` } }
        ]
      },
      order: [
        [
          'createdAt',
          'DESC'
        ]
      ],
      attributes: {
        exclude: [
          'createdAt',
          'password',
          'password',
          'updatedAt'
        ]
      }
    });
    return users;
  },
  // list all data in a table
  async listAllDataInTable(table) {
    const datas = await table.findAll({
      attributes: {
        exclude: [
          'createdAt',
          'password',
          'updatedAt'
        ]
      },
      order: [
        [
          'createdAt',
          'DESC'
        ]
      ]
    });
    return datas;
  }

};
export default helperMethods;
