
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Chats', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    user_uuid: {
      allowNull: false,
      type: Sequelize.UUID
    },
    connection_uuid: {
      allowNull: false,
      type: Sequelize.UUID
    },
    parent_uuid: {
      allowNull: true,
      type: Sequelize.UUID
    },
    message: {
      allowNull: true,
      type: Sequelize.STRING
    },
    senderName: {
      allowNull: true,
      type: Sequelize.STRING
    },
    file: {
      allowNull: true,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Chats')
};
