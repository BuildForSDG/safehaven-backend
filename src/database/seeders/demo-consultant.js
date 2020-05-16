export default {
  async up(queryInterface, Sequelize) {
    const UsersData = [
      {
        uuid: '009e1cbe-c2cb-4b74-9601-336efbafef47',
        specialization: 'psychologist',
        certificate: 'demo_url',
        validIdCard: 'demo_url',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Consultant', UsersData, {});
  },
  async down(queryInterface) {
    queryInterface.bulkDelete('Consultant', null, {});
  }
};
