/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      firstName: DataTypes.STRING,
      surname: DataTypes.STRING,
      middleName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your Email Address'
        },
        unique: {
          args: true,
          msg: 'Email Already Exist!!!'
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Please Enter A Valid Email Address'
          }
        }
      },
      phone: DataTypes.REAL,
      gender: DataTypes.STRING,
      dateOfBirth: DataTypes.STRING,
      nationality: DataTypes.STRING,
      avatar: DataTypes.STRING,
      stateOfOrigin: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      role: {
        type: DataTypes.ENUM('user', 'admin', 'consultant'),
        defaultValue: 'user'
      }
    },
    {}
  );
  User.associate = function (models) {
  };
  return User;
};
