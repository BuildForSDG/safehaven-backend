
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Appointments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    patient_uuid: {
      type: Sequelize.UUID
    },
    consultant_uuid: {
      type: Sequelize.UUID
    },
    dateTime: {
      type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Appointments')
};
