
module.exports = (sequelize, DataTypes) => {
  const Consultant = sequelize.define('Consultant', {
    uuid: DataTypes.UUID,
    specialization: DataTypes.STRING,
    validIdCard: DataTypes.STRING,
    certificate: DataTypes.STRING
  }, {});
  Consultant.associate = (models) => models;
  return Consultant;
};
