export default {
  async up(queryInterface, Sequelize) {
    const UsersData = [
      {
        uuid: '46204aae-fb3b-4d73-b9dd-725d70078191',
        user_uuid: '46204aae-fb3b-4d73-b9dd-725d70078191',
        specialization: 'psychologist',
        certificate: 'demo_url',
        validIdCard: 'demo_url',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'f75795cf-845a-4f94-823c-261717d661be',
        user_uuid: 'f75795cf-845a-4f94-823c-261717d661be',
        specialization: 'psychologist',
        certificate: 'demo_url',
        validIdCard: 'demo_url',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Consultants', UsersData, {});
  },
  down: async (queryInterface) => queryInterface.bulkDelete('Consultants', null, {})
};
