
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AvailableTimes', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    consultant_uuid: {
      allowNull: false,
      type: Sequelize.UUID
    },
    available_time: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('AvailableTimes')
};
