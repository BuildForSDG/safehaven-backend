
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    surname: {
      allowNull: false,
      type: Sequelize.STRING
    },
    middleName: {
      allowNull: true,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    phone: {
      allowNull: true,
      type: Sequelize.REAL
    },
    gender: {
      allowNull: false,
      type: Sequelize.STRING
    },
    dateOfBirth: {
      allowNull: true,
      type: Sequelize.STRING
    },
    nationality: {
      allowNull: true,
      type: Sequelize.STRING
    },
    avatar: {
      allowNull: true,
      type: Sequelize.STRING
    },
    stateOfOrigin: {
      allowNull: true,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: Sequelize.ENUM,
      values: [
        'user',
        'admin',
        'consultant'
      ],
      defaultValue: 'user'
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};