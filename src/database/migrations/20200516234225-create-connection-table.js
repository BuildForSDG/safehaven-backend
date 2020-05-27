
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Connections', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    patient_uuid: {
      allowNull: false,
      type: Sequelize.UUID
    },
    consultant_uuid: {
      allowNull: false,
      type: Sequelize.UUID
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Connections')
};
