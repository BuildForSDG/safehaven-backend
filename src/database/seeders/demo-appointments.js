export default {
  async up(queryInterface, Sequelize) {
    const UsersData = [
      {
        consultant_uuid: '46204aae-fb3b-4d73-b9dd-725d70078191',
        patient_uuid: '009e1cbe-c2cb-4b74-9601-336efbafef47',
        dateTime: Sequelize.literal('NOW()'),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        consultant_uuid: 'f75795cf-845a-4f94-823c-261717d661be',
        patient_uuid: '009e1cbe-c2cb-4b74-9601-336efbafef47',
        dateTime: Sequelize.literal('NOW()'),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Appointments', UsersData, {});
  },
  down: async (queryInterface) => queryInterface.bulkDelete('Appointments', null, {})
};
