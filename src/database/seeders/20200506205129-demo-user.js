/* eslint-disable import/no-extraneous-dependencies */
import { hashPassword } from '../../utils/passwordHash';

export default {
  async up(queryInterface, Sequelize) {
    const UsersData = [
      {
        uuid: '009e1cbe-c2cb-4b74-9601-336efbafef47',
        surName: 'Ayooluwa',
        firstName: 'Olosunde',
        middleName: 'lovisgod',
        email: 'olifedayo94@gmail.com',
        phone: '08165656988',
        password: hashPassword('Password111'),
        verified: true,
        role: 'patient',
        gender: 'male',
        dateOfBirth: '05/06/1994',
        nationality: 'Nigerian',
        address: 'No 34B Ewet, Housing Estate',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'f75795cf-845a-4f94-823c-261717d661be',
        surName: 'Luke',
        firstName: 'Shaw',
        middleName: 'Jaba',
        email: 'jabathehuth@gmail.com',
        phone: '08165156488',
        password: hashPassword('Password111'),
        verified: true,
        role: 'consultant',
        gender: 'male',
        dateOfBirth: '05/06/1994',
        nationality: 'Nigerian',
        address: 'No 34B Ewet, Housing Estate',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '46204aae-fb3b-4d73-b9dd-725d70078191',
        surName: 'Luke',
        firstName: 'Shaw',
        middleName: 'Huth',
        email: 'Shawhuth@gmail.com',
        phone: '08165150888',
        password: hashPassword('Password111'),
        verified: true,
        role: 'consultant',
        gender: 'male',
        dateOfBirth: '05/06/1994',
        nationality: 'Nigerian',
        address: 'No 34B Ewet, Housing Estate',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'a98047fc-a0d8-4fd9-aebc-d860a8fc1871',
        surName: 'James',
        firstName: 'Olsen',
        middleName: 'lovisgod',
        email: 'olifedayoa94@gmail.com',
        phone: 889899000,
        password: hashPassword('Password111'),
        gender: 'male',
        dateOfBirth: '05/06/1994',
        nationality: 'Nigerian',
        avatar: null,
        stateOfOrigin: null,
        address: 'No 34B Ewet, Housing Estate',
        verified: true,
        role: 'patient',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '4a53f33a-e1c0-4617-bbab-5702e2ea862a',
        surName: 'James',
        firstName: 'Tatois',
        middleName: 'lovisgod',
        email: 'olifedayoaa94@gmail.com',
        phone: 8165650000,
        password: hashPassword('Password111'),
        gender: 'male',
        dateOfBirth: '05/06/1994',
        nationality: 'Nigerian',
        avatar: null,
        stateOfOrigin: null,
        address: 'No 34B Ewet, Housing Estate',
        verified: true,
        role: 'patient',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Users', UsersData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
