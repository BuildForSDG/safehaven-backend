module.exports = (sequelize, DataTypes) => {
  const AvailableTime = sequelize.define(
    'AvailableTime',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      consultantUuid: DataTypes.UUID,
      availableTime: DataTypes.STRING
    },
    {}
  );
  AvailableTime.associate = (models) => models;
  return AvailableTime;
};
