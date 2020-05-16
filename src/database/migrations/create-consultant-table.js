
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Consultant', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    specialization: {
      allowNull: false,
      type: Sequelize.STRING
    },
    certificate: {
      allowNull: false,
      type: Sequelize.STRING
    },
    validIdCard: {
      allowNull: false,
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

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Consultant')
};
