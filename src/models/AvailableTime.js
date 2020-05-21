module.exports = (sequelize, DataTypes) => {
  const AvailableTime = sequelize.define(
    'AvailableTime',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      consultant_uuid: DataTypes.UUID,
      available_time: DataTypes.STRING
    },
    {}
  );
  AvailableTime.associate = (models) => models;
  return AvailableTime;
};
