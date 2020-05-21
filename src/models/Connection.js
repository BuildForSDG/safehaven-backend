module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define(
    'Connection',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      patient_uuid: DataTypes.UUID,
      consultant_uuid: DataTypes.UUID
    },
    {}
  );
  Connection.associate = (models) => {
    Connection.hasMany(models.Chat, {
      foreignKey: 'connection_uuid',
      as: 'chats',
      onDelete: 'CASCADE'
    });
  };
  return Connection;
};
