/* eslint-disable import/no-extraneous-dependencies */
import uuid from 'uuid/v4';
import faker from 'faker';
import { hashPassword } from '../../utils/passwordHash';

export default {
  async up(queryInterface, Sequelize) {
    const UsersData = [
      {
        uuid: '009e1cbe-c2cb-4b74-9601-336efbafef47',
        firstName: 'Ayooluwa',
        surname: 'Olosunde',
        middleName: 'lovisgod',
        email: 'olifedayo94@gmail.com',
        phone: '08165656988',
        password: hashPassword('Password111'),
        verified: true,
        role: 'user',
        gender: 'male',
        dateOfBirth: '05/06/1994',
        nationality: 'Nigerian',
        address: 'No 34B Ewet, Housing Estate',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    for (let i = 0; i < 5; i += 1) {
      const userData = {
        uuid: uuid(),
        firstName: faker.name.firstName,
        surname: faker.name.lastName,
        middleName: faker.name.firstName,
        email: faker.internet.email,
        phone: faker.phone.phoneNumber,
        password: hashPassword('Password111'),
        verified: true,
        role: 'user',
        gender: 'male',
        nationality: faker.address.country,
        address: faker.address.county,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      };
      UsersData.push(userData);
    }
    return queryInterface.bulkInsert('Users', UsersData, {});
  },
  // eslint-disable-next-line arrow-parens
  async down(queryInterface) {
    queryInterface.bulkDelete('Users', null, {});
  }
};
