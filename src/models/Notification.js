module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      user_uuid: DataTypes.UUID,
      message: DataTypes.TEXT
    },
    {}
  );
  Notification.associate = (models) => models;
  return Notification;
};
