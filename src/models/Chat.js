module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      user_uuid: DataTypes.UUID,
      connection_uuid: DataTypes.UUID,
      parent_uuid: DataTypes.UUID,
      message: DataTypes.STRING,
      senderName: DataTypes.STRING,
      file: DataTypes.STRING
    },
    {}
  );
  Chat.associate = (models) => {
    Chat.belongsTo(models.User, {
      foreignKey: 'user_uuid'
    });
    Chat.belongsTo(models.Connection, {
      foreignKey: 'connection_uuid'
    });
  };
  return Chat;
};
