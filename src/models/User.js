module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      surName: DataTypes.STRING,
      firstName: DataTypes.STRING,
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
      phone: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Phone Already Exist!!!'
        }
      },
      gender: DataTypes.STRING,
      dateOfBirth: DataTypes.STRING,
      nationality: DataTypes.STRING,
      avatar: DataTypes.STRING,
      stateOfOrigin: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      role: {
        type: DataTypes.ENUM('patient', 'admin', 'consultant'),
        defaultValue: 'patient'
      }
    },
    {}
  );
  User.associate = (models) => {
    User.hasOne(models.Consultant, {
      foreignKey: 'uuid',
      as: 'consultant',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
