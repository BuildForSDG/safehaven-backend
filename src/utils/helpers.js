/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import Sequelize, {
  Op, fn, col, and
} from 'sequelize';
import models from '../models';

const { Connection, User, Chat } = models;

const helperMethods = {


  // find a user by uuid
  async getAUserByUuid(UserTable, uuid, exclude) {
    const user = await UserTable.findOne({
      where: { uuid },
      attributes: {
        exclude
      }
    });
    return user;
  },

  // find user by username
  async getAUserByUsernameAndUuid(UserTable, username) {
    const user = await UserTable.findOne({
      where: { username },
      attributes: [
        'uuid'
      ]
    });

    return user;
  },

  // get all users
  async signUpValidations(UserTable) {
    const users = await UserTable.findAll({
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
  },

  async createConnection(patientUuid, consultantUuid) {
    const connectionUuid = await Connection.findOrCreate({
      patient_uuid: patientUuid,
      consultant_uuid: consultantUuid,
      where: {
        patient_uuid: patientUuid,
        consultant_uuid: consultantUuid
      }
    });
    const chats = await Chat.findAll({
      where: { connection_uuid: connectionUuid[0].dataValues.uuid }
    });
    return { uuid: connectionUuid[0].dataValues.uuid, chats };
  },

  async saveChats(data) {
    const chat = await Chat.create(data);
    return chat;
  }

};
export default helperMethods;
