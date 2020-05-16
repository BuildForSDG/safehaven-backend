module.exports = (sequelize, DataTypes) => {
  const Consultant = sequelize.define(
    'Consultant',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      specialization: DataTypes.STRING,
      certificate: DataTypes.STRING,
      validIdCard: DataTypes.STRING
    },
    {}
  );
  Consultant.associate = (models) => models;
  return Consultant;
};
