
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Consultants', {
    uuid: {
      type: Sequelize.UUID
    },
    userUuid: {
      type: Sequelize.UUID
    },
    specialization: {
      type: Sequelize.STRING
    },
    validIdCard: {
      type: Sequelize.STRING
    },
    certificate: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Consultants')
};
