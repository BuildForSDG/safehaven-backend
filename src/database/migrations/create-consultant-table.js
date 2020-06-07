module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Consultants', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    user_uuid: {
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
    credentialsVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
